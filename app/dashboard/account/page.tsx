"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  Camera,
  Lock,
  Loader2,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/Modal";

const AVATARS = ["👤", "🦊", "🦁", "🐼", "🐨", "🦄", "🐯", "🐷", "🤖", "👻", "👾", "🤡"];

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    upiId: "",
    avatar: "👤",
    phone: ""
  });
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [initialEmail, setInitialEmail] = useState("");
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;

      if (user) {
        setProfile({
          fullName: user.user_metadata?.full_name || "",
          email: user.user_metadata?.email || user.email || "",
          upiId: user.user_metadata?.upi_id || "",
          avatar: user.user_metadata?.avatar_url || "👤",
          phone: user.phone || user.user_metadata?.phone || "Not linked"
        });
        setInitialEmail(user.user_metadata?.email || user.email || "");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase.auth.updateUser({
        email: profile.email,
        data: {
          full_name: profile.fullName,
          avatar_url: profile.avatar,
          upi_id: profile.upiId
        }
      });

      if (error) throw error;
      toast.success("Profile updated successfully!");
      if (profile.email !== initialEmail && profile.email.includes("@")) {
        setShowConsent(true);
        setInitialEmail(profile.email);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!currentPassword) {
      toast.error("Please enter your current password");
      return;
    }
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }
    setResetting(true);
    try {
      // Verify current password by attempting to sign in
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error: signInError } = await supabase.auth.signInWithPassword(
        user.email 
          ? { email: user.email, password: currentPassword }
          : { phone: user.phone!, password: currentPassword }
      );

      if (signInError) {
        throw new Error("Invalid current password");
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
      toast.success("Password updated successfully!");
      setNewPassword("");
      setCurrentPassword("");
    } catch (error: any) {
      toast.error(error.message || "Failed to update password");
    } finally {
      setResetting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <div className="h-10 w-64 skeleton rounded-xl" />
          <div className="h-5 w-80 skeleton rounded-lg" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 h-[400px] skeleton rounded-[2.5rem]" />
          <div className="lg:col-span-2 h-[600px] skeleton rounded-[2.5rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-text-main tracking-tight">Account Details</h1>
          <p className="text-text-muted font-medium mt-1">Manage your profile and account settings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm text-center">
            <div className="relative inline-block group mb-6">
              <div className="w-32 h-32 bg-brand-light rounded-[2.5rem] flex items-center justify-center text-6xl shadow-inner border border-brand-primary/10 transition-transform group-hover:scale-105 duration-300">
                {profile.avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-100 text-brand-primary">
                <Camera className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-2xl font-black text-text-main">{profile.fullName}</h3>
            <p className="text-text-muted font-medium text-sm">{profile.email}</p>

            <div className="mt-8 pt-8 border-t border-gray-50">
              <p className="text-xs font-black uppercase tracking-widest text-text-muted mb-4">Choose Avatar</p>
              <div className="grid grid-cols-4 gap-2">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    onClick={() => setProfile({ ...profile, avatar: av })}
                    className={`aspect-square flex items-center justify-center text-xl rounded-xl transition-all ${profile.avatar === av
                      ? "bg-brand-primary text-white scale-110 shadow-md"
                      : "bg-gray-50 hover:bg-gray-100"
                      }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-text-muted text-center">Change Password</p>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-placeholder group-focus-within:text-brand-primary transition-colors" />
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full h-12 pl-10 pr-12 bg-gray-50 border-2 border-transparent rounded-xl outline-none focus:border-brand-primary/20 focus:bg-white transition-all font-bold text-sm text-text-main"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-placeholder hover:text-brand-primary transition-colors"
                tabIndex={-1}
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-placeholder group-focus-within:text-brand-primary transition-colors" />
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-12 pl-10 pr-12 bg-gray-50 border-2 border-transparent rounded-xl outline-none focus:border-brand-primary/20 focus:bg-white transition-all font-bold text-sm text-text-main"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-placeholder hover:text-brand-primary transition-colors"
                tabIndex={-1}
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button
              onClick={handlePasswordReset}
              disabled={resetting}
              className="w-full h-12 bg-text-main text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              {resetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              Update Password
            </button>
            <p className="text-[10px] text-text-muted text-center font-medium">Secured via your linked mobile: {profile.phone}</p>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-gray-100 shadow-sm h-full">
            <form onSubmit={handleUpdateProfile} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-text-main ml-1 uppercase tracking-wider">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-placeholder group-focus-within:text-brand-primary transition-colors" />
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand-primary/20 focus:bg-white transition-all font-bold text-text-main"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-text-main ml-1 uppercase tracking-wider">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-placeholder group-focus-within:text-brand-primary transition-colors" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand-primary/20 focus:bg-white transition-all font-bold text-text-main"
                      placeholder="hello@example.com"
                    />
                  </div>
                </div>

                {/* Phone - Read only */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-sm font-black text-text-main uppercase tracking-wider">Phone Number</label>
                    <span className="text-[10px] font-black bg-gray-100 text-text-muted px-2 py-1 rounded-full uppercase tracking-widest">Locked</span>
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-placeholder" />
                    <input
                      type="text"
                      value={profile.phone}
                      readOnly
                      className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none font-bold text-text-muted cursor-not-allowed opacity-70"
                    />
                  </div>
                </div>

                {/* UPI ID */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-text-main ml-1 uppercase tracking-wider">UPI ID</label>
                  <div className="relative group">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-placeholder group-focus-within:text-brand-primary transition-colors" />
                    <input
                      type="text"
                      value={profile.upiId}
                      onChange={(e) => setProfile({ ...profile, upiId: e.target.value })}
                      className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand-primary/20 focus:bg-white transition-all font-bold text-text-main"
                      placeholder="example@upi"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full md:w-auto px-10 h-14 bg-brand-gradient text-white font-black rounded-2xl shadow-floating flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
                >
                  {saving ? (
                    <span className="animate-pulse">Saving...</span>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex gap-4 mt-8">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-500 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-blue-900 font-bold text-sm">Account Security</p>
                  <p className="text-blue-700/70 text-xs mt-1 font-medium leading-relaxed">
                    You can update your profile details here. Email verification is not required. Keep your UPI ID current for seamless settlements.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
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
              onClick={() => setShowConsent(false)}
              className="w-full h-14 bg-brand-gradient text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              Yes, notify me!
            </button>
            <button 
              onClick={() => setShowConsent(false)}
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
