"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Loader2, 
  AlertCircle,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";
import ForceLight from "@/components/shared/ForceLight";

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) throw signInError;

            // Role-based check
            const role = data.user?.user_metadata?.role;
            if (role !== 'admin') {
                // If not admin, sign them out immediately
                await supabase.auth.signOut();
                throw new Error('Access Denied: You do not have administrative privileges.');
            }

            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.message || 'Invalid admin credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-surface-main mesh-bg relative overflow-hidden">
            <ForceLight />
            
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                
                {/* Admin Badge */}
                <div className="flex justify-center mb-8">
                   <div className="bg-white p-4 rounded-[2rem] shadow-floating border border-gray-100 flex items-center justify-center group">
                      <div className="w-16 h-16 bg-brand-gradient rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-500">
                         <ShieldCheck className="w-9 h-9" />
                      </div>
                   </div>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-10 lg:p-12">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black text-text-main tracking-tight uppercase">Admin Access</h1>
                        <div className="flex items-center justify-center gap-2 mt-2">
                           <div className="h-[1px] w-4 bg-brand-primary"></div>
                           <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Authorized Personnel Only</p>
                           <div className="h-[1px] w-4 bg-brand-primary"></div>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-3 animate-in shake duration-500">
                            <ShieldAlert className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-red-600 font-bold">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleAdminLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-text-main uppercase tracking-widest ml-1">Admin Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-placeholder group-focus-within:text-brand-primary transition-colors" />
                                <input
                                    type="email"
                                    placeholder="admin@dostbill.com"
                                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand-primary/20 focus:bg-white transition-all font-bold text-text-main"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-text-main uppercase tracking-widest ml-1">Secret Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-placeholder group-focus-within:text-brand-primary transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-brand-primary/20 focus:bg-white transition-all font-bold text-text-main"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-16 bg-text-main text-white font-black rounded-2xl shadow-floating hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-3 group disabled:opacity-70"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                  Login to Terminal
                                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-gray-50 text-center">
                       <Link href="/login" className="text-xs font-bold text-text-muted hover:text-brand-primary transition-colors flex items-center justify-center gap-2">
                          Switch to User Login
                       </Link>
                    </div>
                </div>

                <p className="mt-8 text-center text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] opacity-40">
                   Property of DostBill Technologies 
                </p>

            </div>
        </div>
    );
}
