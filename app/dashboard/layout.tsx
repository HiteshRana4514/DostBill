"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import ProfileSidebar from "@/components/dashboard/ProfileSidebar";
import { Menu, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Disable scroll when any sidebar is open
  useEffect(() => {
    if (isSidebarOpen || isProfileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen, isProfileOpen]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-main p-6 lg:p-10">
        <div className="flex gap-6 h-full">
          <div className="hidden lg:block w-72 h-[calc(100vh-80px)] skeleton rounded-3xl" />
          <div className="flex-1 space-y-8">
            <div className="h-20 w-full skeleton rounded-2xl" />
            <div className="h-64 w-full skeleton rounded-3xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <div key={i} className="h-40 skeleton rounded-3xl" />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-main mesh-bg selection:bg-brand-primary/10">
      {/* Integrated Sidebars */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <ProfileSidebar 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Main Container */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        
        {/* Mobile Header Menu Toggle */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-4 bg-brand-primary text-white rounded-2xl shadow-floating active:scale-95 transition-transform"
            >
              <Menu className="w-6 h-6" />
            </button>
        </div>

        <DashboardHeader onProfileClick={() => setIsProfileOpen(true)} />

        {/* Content Page */}
        <main className="flex-1 p-6 lg:p-10 h-full relative z-10 transition-all duration-500">
          <div className="max-w-[1440px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
