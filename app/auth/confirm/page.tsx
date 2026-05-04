"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Mail, ArrowRight, Bell, Sparkles } from "lucide-react";

export default function ConfirmEmailPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-main relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-lg bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-8 lg:p-12 relative z-10 text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
        
        {/* Animated Celebration Icon */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-brand-light rounded-3xl rotate-6 animate-pulse"></div>
          <div className="absolute inset-0 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center -rotate-3 transition-transform hover:rotate-0 duration-500">
            <CheckCircle2 className="w-12 h-12 text-brand-primary animate-in zoom-in duration-500 delay-300" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-bounce" />
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-black text-text-main tracking-tight">
            Email Confirmed!
          </h1>
          <p className="text-text-muted font-medium text-lg leading-relaxed max-w-sm mx-auto">
            Your email has been successfully verified. You're all set!
          </p>
        </div>

        {/* Feature Cards / Info */}
        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="bg-gray-50 rounded-2xl p-5 flex items-start gap-4 text-left border border-gray-100/50 group hover:border-brand-primary/20 transition-all">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Bell className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <p className="font-bold text-text-main">Stay Notified</p>
              <p className="text-sm text-text-muted mt-0.5">You will now receive notifications and split summaries directly in your inbox.</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 flex items-start gap-4 text-left border border-gray-100/50 group hover:border-brand-primary/20 transition-all">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="font-bold text-text-main">Latest Updates</p>
              <p className="text-sm text-text-muted mt-0.5">Be the first to hear about new features and exclusive offers from DostBill.</p>
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <Link 
            href="/dashboard"
            className="w-full h-14 bg-brand-gradient text-white font-black rounded-2xl shadow-floating flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 group"
          >
            Go to Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="text-xs text-text-muted font-medium">
            Redirecting you in a few seconds...
          </p>
        </div>

      </div>
    </div>
  );
}
