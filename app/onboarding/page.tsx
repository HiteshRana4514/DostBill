"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  User,
  Mail,
  ChevronRight,
  ChevronLeft,
  Check,
  Loader2,
  Camera,
  CreditCard
} from "lucide-react";
import Modal from "@/components/shared/Modal";

const AVATARS = ["👤", "🦊", "🦁", "🐼", "🐨", "🦄", "🐯", "🐷", "🤖", "👻", "👾", "🤡"];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [upiId, setUpiId] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [authLoading, setAuthLoading] = useState(true);
  const [showConsent, setShowConsent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/signup");
      } else {
        setAuthLoading(false);
      }
    };
    checkSession();
  }, [router]);

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Update user metadata and email
      const { error } = await supabase.auth.updateUser({
        email: email,
        data: {
          full_name: fullName,
          avatar_url: selectedAvatar,
          upi_id: upiId,
          onboarded: true
        }
      });

      if (error) throw error;

      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-surface-main">
        <div className="w-full max-w-lg bg-white rounded-[2.5rem] p-8 lg:p-12 space-y-8">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-1.5 w-12 skeleton rounded-full" />)}
          </div>
          <div className="space-y-4">
            <div className="h-10 w-3/4 skeleton rounded-xl" />
            <div className="h-6 w-1/2 skeleton rounded-lg" />
          </div>
          <div className="h-14 w-full skeleton rounded-2xl" />
          <div className="h-14 w-full skeleton rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-main mesh-bg">
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] border border-gray-100 shadow-card p-8 lg:p-12 relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-500 ${s === step ? "w-12 bg-brand-primary" : "w-6 bg-gray-100"
                }`}
            />
          ))}
        </div>

        {/* Step 1: Name */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-3xl font-black text-text-main tracking-tight">What's your name?</h2>
              <p className="text-text-muted font-medium mt-2">This is how your dosts will see you.</p>
            </div>

            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-placeholder group-focus-within:text-brand-primary transition-colors" />
              <input
                autoFocus
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fullName && setStep(2)}
                className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand-primary/20 focus:bg-white transition-all font-bold text-text-main"
              />
            </div>

            <button
              disabled={!fullName}
              onClick={() => setStep(2)}
              className="w-full h-14 bg-brand-gradient text-white font-black rounded-2xl shadow-floating flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale transition-all active:scale-95"
            >
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2: Email */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-3xl font-black text-text-main tracking-tight">And your email?</h2>
              <p className="text-text-muted font-medium mt-2">For receipts and important updates.</p>
            </div>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-placeholder group-focus-within:text-brand-primary transition-colors" />
              <input
                autoFocus
                type="email"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && email.includes("@") && setStep(3)}
                className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand-primary/20 focus:bg-white transition-all font-bold text-text-main"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="h-14 px-6 bg-gray-50 text-text-muted font-bold rounded-2xl hover:bg-gray-100 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                disabled={!email.includes("@")}
                onClick={() => setShowConsent(true)}
                className="flex-1 h-14 bg-brand-gradient text-white font-black rounded-2xl shadow-floating flex items-center justify-center gap-2 disabled:opacity-50 transition-all active:scale-95"
              >
                Continue <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: UPI ID */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-3xl font-black text-text-main tracking-tight">Your UPI ID? <span className="text-xl text-text-muted font-bold">(Optional)</span></h2>
              <p className="text-text-muted font-medium mt-2">Add your UPI ID for seamless and faster settlements.</p>
            </div>

            <div className="relative group">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-placeholder group-focus-within:text-brand-primary transition-colors" />
              <input
                autoFocus
                type="text"
                placeholder="example@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setStep(4)}
                className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand-primary/20 focus:bg-white transition-all font-bold text-text-main"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="h-14 px-6 bg-gray-50 text-text-muted font-bold rounded-2xl hover:bg-gray-100 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 h-14 bg-brand-gradient text-white font-black rounded-2xl shadow-floating flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                {upiId.trim() ? "Continue" : "Skip for now"} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Avatar */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 text-center">
            <div>
              <h2 className="text-3xl font-black text-text-main tracking-tight">Pick an avatar</h2>
              <p className="text-text-muted font-medium mt-2">Let your personality shine.</p>
            </div>

            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-32 h-32 bg-brand-light rounded-[2.5rem] flex items-center justify-center text-6xl shadow-inner border animate-in zoom-in duration-500">
                  {selectedAvatar}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-100 text-brand-primary">
                  <Camera className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  onClick={() => setSelectedAvatar(av)}
                  className={`w-full aspect-square flex items-center justify-center text-2xl rounded-2xl transition-all ${selectedAvatar === av
                      ? "bg-brand-primary text-white shadow-floating scale-110 rotate-3"
                      : "bg-gray-50 hover:bg-gray-100 grayscale hover:grayscale-0"
                    }`}
                >
                  {av}
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(3)}
                className="h-14 px-6 bg-gray-50 text-text-muted font-bold rounded-2xl hover:bg-gray-100 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                disabled={loading}
                onClick={handleComplete}
                className="flex-1 h-14 bg-text-main text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? <span className="animate-pulse">Saving Profile...</span> : "Complete Profile"}
                {!loading && <Check className="w-5 h-5 text-brand-accent" />}
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Email Consent Popup */}
      <Modal isOpen={showConsent} onClose={() => setShowConsent(false)}>
        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 bg-brand-light rounded-3xl flex items-center justify-center mx-auto text-4xl">
            📬
          </div>
          <div>
            <h3 className="text-2xl font-black text-text-main font-jakarta">Stay updated!</h3>
            <p className="text-text-muted font-medium mt-2 leading-relaxed">
              Confirm your email to receive split summaries and important billing updates.
            </p>
          </div>
          <div className="space-y-3">
            <button 
              onClick={() => { setShowConsent(false); setStep(3); }}
              className="w-full h-14 bg-brand-gradient text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              Yes, notify me!
            </button>
            <button 
              onClick={() => { setShowConsent(false); setStep(3); }}
              className="w-full h-10 text-text-muted font-bold hover:text-text-main transition-colors text-sm"
            >
              Maybe later
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
