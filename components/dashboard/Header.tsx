"use client";

import React from "react";
import Link from "next/link";
import { Bell, Search, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface HeaderProps {
  onProfileClick: () => void;
}

export default function DashboardHeader({ onProfileClick }: HeaderProps) {
  const [avatar, setAvatar] = React.useState("👤");

  React.useEffect(() => {
    const getAvatar = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setAvatar(user.user_metadata?.avatar_url || "👤");
      }
    };
    getAvatar();
  }, []);
  return (
    <header className="h-20 flex items-center px-8 lg:px-10 sticky top-0 bg-surface-card/80 backdrop-blur-md border-b border-border-main z-30">
      <div className="flex-1 lg:hidden">
        {/* Logo showing only on mobile mobile header */}
        <Link href="/dashboard" className="flex items-center">
          <img src="/logo.png" alt="DostBill Logo" className="h-10 w-auto object-contain" />
        </Link>
      </div>

      <div className="flex-1 hidden lg:flex items-center">
        <div className="relative group max-w-sm w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-placeholder group-focus-within:text-brand-primary transition-colors" />
          <input
            type="text"
            placeholder="Search transactions or groups..."
            className="w-full h-10 pl-10 pr-4 bg-surface-main border-none rounded-xl text-sm focus:ring-1 focus:ring-brand-primary/20 focus:bg-surface-card outline-none transition-all placeholder:text-text-placeholder"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-text-muted hover:text-text-main hover:bg-surface-main rounded-xl transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full border-2 border-surface-card"></span>
        </button>
        <div className="h-6 w-[1px] bg-border-main mx-1"></div>
        <button
          onClick={onProfileClick}
          className="w-10 cursor-pointer h-10 rounded-xl bg-brand-light/30 flex items-center justify-center text-xl shadow-sm border border-brand-primary/10 hover:scale-105 active:scale-95 transition-all"
        >
          {avatar}
        </button>
      </div>
    </header>
  );
}
