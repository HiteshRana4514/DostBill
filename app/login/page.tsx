"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import ForceLight from "@/components/shared/ForceLight";

export default function LoginPage() {
    // 'password' = default login, 'otp_request' = user forgot password, 'otp_verify' = waiting for 6 digits
    const [loginMode, setLoginMode] = useState<"password" | "otp_request" | "otp_verify">("password");
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!phoneNumber) {
            setError('Please enter your phone number');
            return;
        }

        if (phoneNumber.length !== 10) {
            setError('Phone number must be 10 digits');
            return;
        }

        if (loginMode === "password" && !password) {
            setError('Please enter your password');
            return;
        }

        setLoading(true);

        try {
            if (loginMode === "password") {
                const { data, error: sbError } = await supabase.auth.signInWithPassword({
                    phone: `+91${phoneNumber}`,
                    password,
                });

                if (sbError) throw sbError;
                if (data.user) {
                    router.push('/dashboard');
                }
            } else if (loginMode === "otp_request") {
                const { error: sbError } = await supabase.auth.signInWithOtp({
                    phone: `+91${phoneNumber}`,
                    options: {
                        shouldCreateUser: false,
                    }
                });

                if (sbError) {
                    if (sbError.message.includes("Signups not allowed for otp")) {
                        throw new Error("No account found for this phone number. Please sign up.");
                    }
                    throw sbError;
                }
                setLoginMode("otp_verify");
            } else if (loginMode === "otp_verify") {
                const { data, error: sbError } = await supabase.auth.verifyOtp({
                    phone: `+91${phoneNumber}`,
                    token: otp,
                    type: 'sms',
                });

                if (sbError) throw sbError;
                if (data.user) {
                    router.push('/dashboard');
                }
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication');
            console.error('Auth error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex w-full font-jakarta bg-surface-main text-text-main">
            <ForceLight />

            {/* LEFT PANEL - Hidden on Mobile, Visible on Desktop */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-b from-[#FF8C42] to-[#FF6B1A] p-12 text-white flex-col items-center justify-center relative overflow-hidden">
                {/* Decorative Background Circles */}
                <div className="absolute top-[-15%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-20%] left-[-15%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute top-[30%] left-[-5%] w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>

                <div className="relative z-10 flex flex-col items-center max-w-lg w-full">
                    {/* Logo - Clickable to home */}
                    <Link href="/" className="flex flex-col items-center mb-12 text-center">
                        <h1 className="text-5xl font-bold tracking-tight mb-3">dostbill</h1>
                        <p className="text-base opacity-90">Split bills. Keep friendships.</p>
                    </Link>

                    {/* Phone Mockup with App Dashboard */}
                    <div className="relative mb-8">
                        <div className="w-[280px] h-[480px] bg-white/10 backdrop-blur-sm rounded-[2.5rem] p-4 border border-white/20">
                            {/* Phone Header */}
                            <div className="flex items-center justify-center gap-2 mb-4 opacity-60">
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                            </div>

                            {/* Net Balance Card */}
                            <div className="bg-gradient-to-br from-orange-300/80 to-orange-400/80 rounded-2xl p-4 mb-3">
                                <div className="text-xs opacity-80 mb-1">NET BALANCE</div>
                                <div className="text-3xl font-bold mb-1">+₹2,250</div>
                                <div className="text-xs opacity-80">Across 3 groups</div>
                            </div>

                            {/* Group Cards */}
                            <div className="space-y-2">
                                <div className="bg-orange-200/60 rounded-xl p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-white/40 rounded-lg flex items-center justify-center text-sm">🏠</div>
                                        <div>
                                            <div className="text-xs font-semibold">Sector 62 Flat</div>
                                            <div className="text-[10px] opacity-70">4 members</div>
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold text-green-700">+₹1,200</div>
                                </div>

                                <div className="bg-orange-200/60 rounded-xl p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-white/40 rounded-lg flex items-center justify-center text-sm">✈️</div>
                                        <div>
                                            <div className="text-xs font-semibold">Manali Trip</div>
                                            <div className="text-[10px] opacity-70">6 members</div>
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold text-red-700">-₹850</div>
                                </div>

                                <div className="bg-orange-200/60 rounded-xl p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-white/40 rounded-lg flex items-center justify-center text-sm">🍔</div>
                                        <div>
                                            <div className="text-xs font-semibold">Office Lunch Gang</div>
                                            <div className="text-[10px] opacity-70">5 members</div>
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold text-green-700">+₹320</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature Checklist */}
                    <div className="space-y-3 w-full text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</div>
                            <p className="text-sm opacity-90">Split equally or custom — your choice</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</div>
                            <p className="text-sm opacity-90">Settle via UPI in one tap</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</div>
                            <p className="text-sm opacity-90">Share summary on WhatsApp</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</div>
                            <p className="text-sm opacity-90">Works for flats, trips & events</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL - The Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative overflow-y-auto">

                <Link href="/" className="absolute top-8 left-8 lg:hidden block">
                     <img src="/logo.png" alt="DostBill" className="h-10 w-auto object-contain" />
                </Link>

                <div className="w-full max-w-md bg-surface-card p-8 rounded-2xl shadow-card border border-gray-100">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-text-main mb-2">Welcome back 👋</h2>
                        <p className="text-text-muted">Enter your details to access your account.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-red-600 font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Phone Number Field */}
                        <div>
                            <label className="block text-sm font-semibold text-text-main mb-1.5">Phone Number</label>
                            <div className="flex text-text-main">
                                <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-text-muted font-medium">
                                    +91
                                </span>
                                <input
                                    type="tel"
                                    placeholder="98765 43210"
                                    className="flex-1 block w-full px-4 py-3 rounded-none rounded-r-md border border-gray-200 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                                    required
                                    disabled={loginMode === "otp_verify"}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Field (Only shown in password mode) */}
                        {loginMode === "password" && (
                            <div className="animate-in fade-in duration-300">
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="block text-sm font-semibold text-text-main">Password</label>
                                </div>
                                <div className="relative text-text-main">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="block w-full px-4 py-3 rounded-md border border-gray-200 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-text-placeholder hover:text-text-main transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* OTP Field (Only shown after requesting OTP) */}
                        {loginMode === "otp_verify" && (
                            <div className="pt-2 animate-in fade-in slide-in-from-top-4 duration-300">
                                <label className="block text-sm font-semibold text-text-main mb-1.5">Enter 6-digit OTP</label>
                                <input
                                    type="text"
                                    placeholder="123456"
                                    maxLength={6}
                                    className="block w-full px-4 py-3 text-center tracking-widest text-lg font-bold rounded-md border border-gray-200 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors text-text-main"
                                    required
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <p className="text-xs text-text-muted mt-2 text-center">We sent a secure code to your phone.</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-gradient text-white font-semibold py-3.5 px-4 rounded-xl shadow-floating hover:opacity-90 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="animate-pulse">Please wait...</span>
                            ) : (
                                loginMode === "password" ? "Log in" : loginMode === "otp_request" ? "Send OTP" : "Verify & Log in"
                            )}
                        </button>

                    </form>

                    {/* Mode Toggle Link (Forgot Password / Login via OTP) */}
                    <div className="mt-5 text-center">
                        {loginMode === "password" ? (
                            <button
                                onClick={() => setLoginMode("otp_request")}
                                className="text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
                            >
                                Forgot password? Login via OTP
                            </button>
                        ) : (
                            <button
                                onClick={() => setLoginMode("password")}
                                className="text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
                            >
                                ← Back to Password Login
                            </button>
                        )}
                    </div>

                    <div className="mt-8 flex items-center justify-center">
                        <div className="border-t border-gray-200 flex-1"></div>
                        <span className="px-3 text-sm text-text-muted">or</span>
                        <div className="border-t border-gray-200 flex-1"></div>
                    </div>

                    {/* Signup Link */}
                    <p className="mt-8 text-center text-sm text-text-muted">
                        New to DostBill?{" "}
                        <Link href="/signup" className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
                            Create an account
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}