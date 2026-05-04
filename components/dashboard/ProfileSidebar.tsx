"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  Settings, 
  Crown, 
  HelpCircle, 
  LogOut, 
  User, 
  Bell, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
  const [userProfile, setUserProfile] = useState<{name: string, avatar: string, email: string}>({
    name: "User",
    avatar: "👤",
    email: ""
  });
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserProfile({
          name: user.user_metadata?.full_name || "Dost",
          avatar: user.user_metadata?.avatar_url || "👤",
          email: user.user_metadata?.email || user.email || ""
        });
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60] animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      {/* Right Sidebar */}
      <aside className={`
        fixed top-0 right-0 bottom-0 w-80 lg:w-96 bg-surface-card shadow-2xl z-[70] transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="h-20 flex items-center justify-between px-8 border-b border-border-main">
            <h2 className="text-xl font-black text-text-main">Profile</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-surface-main rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-text-muted" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10">
            
            {/* User Info Card */}
            <div className="text-center space-y-4">
               <div className="inline-flex relative">
                  <div className="w-24 h-24 bg-brand-light/30 rounded-[2rem] flex items-center justify-center text-5xl shadow-inner border border-brand-primary/10">
                    {userProfile.avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-financial-success rounded-xl flex items-center justify-center border-4 border-surface-card text-white">
                      <ShieldCheck className="w-4 h-4" />
                  </div>
               </div>
               <div>
                  <h3 className="text-xl font-black text-text-main">{userProfile.name}</h3>
                  <p className="text-sm font-medium text-text-muted">{userProfile.email}</p>
               </div>
            </div>

            {/* Premium Section */}
            <div className="bg-slate-950 dark:bg-brand-primary/10 rounded-3xl p-6 text-white relative overflow-hidden group cursor-pointer border border-white/5 dark:border-brand-primary/20 shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
                <Crown className="w-12 h-12 text-brand-accent fill-brand-accent" />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-accent mb-1">DostBill Plus</p>
                <h4 className="text-lg font-bold">Try Premium Free</h4>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">Unlock advanced insights and unlimited groups.</p>
                <button 
                  onClick={() => { router.push("/dashboard/premium"); onClose(); }}
                  className="mt-4 w-full h-10 bg-brand-gradient text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-brand-primary/20 hover:opacity-90 transition-all active:scale-[0.98]"
                >
                  Upgrade Now
                </button>
              </div>
            </div>

            {/* Menu Sections */}
            <div className="space-y-6">
               <div>
                  <p className="px-2 text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] mb-3">Settings</p>
                  <div className="space-y-1">
                    {[
                      { icon: User, label: "Account Details", color: "text-blue-500", onClick: () => { router.push("/dashboard/account"); onClose(); } },
                      { icon: Bell, label: "Notifications", color: "text-purple-500", onClick: () => { router.push("/dashboard/notifications"); onClose(); } },
                      { icon: Settings, label: "App Preferences", color: "text-gray-500", onClick: () => { router.push("/dashboard/preferences"); onClose(); } },
                    ].map((item) => (
                      <button 
                        key={item.label} 
                        onClick={item.onClick}
                        className="w-full flex items-center justify-between p-3 hover:bg-surface-main rounded-2xl transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 bg-surface-main rounded-lg group-hover:bg-surface-card group-hover:shadow-sm transition-all`}>
                            <item.icon className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <span className="text-sm font-bold text-text-main">{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-text-placeholder group-hover:text-text-muted transition-colors" />
                      </button>
                    ))}
                  </div>
               </div>

               <div>
                  <p className="px-2 text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] mb-3">Support</p>
                  <div className="space-y-1">
                    <button 
                      onClick={() => { router.push("/dashboard/help"); onClose(); }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-surface-main rounded-2xl transition-all group"
                    >
                       <div className="p-2 bg-surface-main rounded-lg group-hover:bg-surface-card group-hover:shadow-sm">
                          <HelpCircle className="w-4 h-4 text-brand-primary" />
                       </div>
                       <span className="text-sm font-bold text-text-main">Help & Feedback</span>
                    </button>
                  </div>
               </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-border-main">
            <button 
              onClick={handleLogout}
              className="w-full h-14 bg-red-500/10 text-red-500 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all border border-red-500/10"
            >
              <LogOut className="w-5 h-5" />
              Sign Out Securely
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}
