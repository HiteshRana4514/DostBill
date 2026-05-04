"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import ForceLight from "@/components/shared/ForceLight";

export default function SignupPage() {
    const [otpSent, setOtpSent] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!otpSent) {
            if (!phoneNumber) {
                setError('Phone number is required');
                return;
            }
            if (phoneNumber.length !== 10) {
                setError('Phone number must be 10 digits');
                return;
            }
            if (!password) {
                setError('Password is required');
                return;
            }
            if (password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            setLoading(true);
            try {
                const { error: sbError } = await supabase.auth.signInWithOtp({
                    phone: `+91${phoneNumber}`,
                });
                if (sbError) throw sbError;
                setOtpSent(true);
            } catch (err: any) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        } else {
            if (!otp || otp.length !== 6) {
                setError('Please enter a valid 6-digit OTP');
                return;
            }

            setLoading(true);
            try {
                const { data, error: verifyError } = await supabase.auth.verifyOtp({
                    phone: `+91${phoneNumber}`,
                    token: otp,
                    type: 'sms',
                });
                if (verifyError) throw verifyError;

                if (data.user) {
                    const { error: updateError } = await supabase.auth.updateUser({
                        password: password,
                    });
                    if (updateError) throw updateError;

                    router.push('/onboarding');
                }
            } catch (err: any) {
                setError(err.message || 'Verification failed');
            } finally {
                setLoading(false);
            }
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

                    {/* Get Started Steps Card */}
                    <div className="w-full bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-8">
                        <h2 className="text-xs font-bold uppercase tracking-wider mb-6 opacity-90 text-white">
                            GET STARTED IN 3 STEPS
                        </h2>

                        <div className="space-y-5 text-white">
                            {/* Step 1 */}
                            <div className="flex gap-4 items-start">
                                <div className="w-9 h-9 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-base shrink-0">
                                    1
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-base mb-1">Create your account</h3>
                                    <p className="text-sm opacity-80 leading-relaxed">Enter basic details & set a password</p>
                                </div>
                            </div>

                            {/* Connector Line */}
                            <div className="ml-[18px] w-0.5 h-6 bg-white/30"></div>

                            {/* Step 2 */}
                            <div className="flex gap-4 items-start">
                                <div className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-base shrink-0">
                                    2
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-base mb-1">Create your first group</h3>
                                    <p className="text-sm opacity-80 leading-relaxed">Flat, trip, event — whatever you need</p>
                                </div>
                            </div>

                            {/* Connector Line */}
                            <div className="ml-[18px] w-0.5 h-6 bg-white/30"></div>

                            {/* Step 3 */}
                            <div className="flex gap-4 items-start">
                                <div className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-base shrink-0">
                                    3
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-base mb-1">Add your dosts</h3>
                                    <p className="text-sm opacity-80 leading-relaxed">Invite via phone number or link</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats at Bottom */}
                    <div className="flex gap-3 w-full justify-center text-white">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 text-center border border-white/20">
                            <div className="text-2xl font-bold mb-0.5 text-white">50K+</div>
                            <div className="text-xs opacity-80">Users</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 text-center border border-white/20">
                            <div className="text-2xl font-bold mb-0.5 text-white">₹2Cr+</div>
                            <div className="text-xs opacity-80">Settled</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 text-center border border-white/20">
                            <div className="text-2xl font-bold mb-0.5 text-white">Free</div>
                            <div className="text-xs opacity-80">Forever</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL - The Signup Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative overflow-y-auto">

                <Link href="/" className="absolute top-8 left-8 lg:hidden block">
                     <img src="/logo.png" alt="DostBill" className="h-10 w-auto object-contain" />
                </Link>

                <div className="w-full max-w-md bg-surface-card p-8 rounded-2xl shadow-card border border-gray-100">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-text-main mb-2">Create Account</h2>
                        <p className="text-text-muted">Get started in just 2 minutes.</p>
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
                            <div className="flex">
                                <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-text-muted font-medium">
                                    +91
                                </span>
                                <input
                                    type="tel"
                                    placeholder="98765 43210"
                                    className="flex-1 block w-full px-4 py-3 rounded-none rounded-r-md border border-gray-200 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors text-text-main"
                                    required
                                    disabled={otpSent} // Lock after OTP is sent
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-text-main mb-1.5">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="block w-full px-4 py-3 rounded-md border border-gray-200 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors w-full text-text-main"
                                        required
                                        disabled={otpSent}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-placeholder hover:text-text-main transition-colors disabled:opacity-50"
                                        disabled={otpSent}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text-main mb-1.5">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="block w-full px-4 py-3 rounded-md border border-gray-200 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors w-full text-text-main"
                                        required
                                        disabled={otpSent}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-placeholder hover:text-text-main transition-colors disabled:opacity-50"
                                        disabled={otpSent}
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* OTP Field (Dynamically Revealed) */}
                        {otpSent && (
                            <div className="pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
                                <label className="block text-sm font-semibold text-text-main mb-1.5">Enter 6-digit OTP</label>
                                <p className="text-xs text-text-muted mb-3">We sent a code to your phone number.</p>
                                <input
                                    type="text"
                                    placeholder="123456"
                                    maxLength={6}
                                    className="block w-full px-4 py-3 text-center tracking-widest text-lg font-bold rounded-md border border-gray-200 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors text-text-main"
                                    required
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-gradient text-white font-semibold py-3.5 px-4 rounded-xl shadow-floating hover:opacity-90 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                otpSent ? "Verify & Sign Up" : "Send OTP"
                            )}
                        </button>

                    </form>

                    {/* Login Link */}
                    <p className="mt-8 text-center text-sm text-text-muted">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
                            Log in here
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}