"use client";

import React from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Plus, 
  ArrowRight,
  History,
  Wallet,
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
  ArrowUp,
  CreditCard,
  Target,
  PlusCircle,
  Shapes
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function DashboardPage() {
  const [userName, setUserName] = React.useState("User");

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || "Dost");
      }
    };
    getUser();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Title Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-text-main tracking-tight flex items-center gap-2">
            Overview <span className="text-text-muted font-medium text-sm">— Good morning, {userName}!</span>
        </h1>
        <p className="text-sm font-medium text-text-muted">Analyze your shared expenses and groups at a glance.</p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        
        {/* BENTO CARD 1: Large Balance Card (6 col) */}
        <div className="lg:col-span-8 bento-card rounded-3xl p-6 lg:p-10 flex flex-col justify-between min-h-[300px] lg:min-h-[340px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-light/20 to-transparent pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
               <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-brand-primary/10 rounded-lg">
                      <Wallet className="w-5 h-5 text-brand-primary" />
                    </div>
                    <span className="text-[10px] lg:text-xs font-bold text-text-muted uppercase tracking-wider">Net Balance</span>
                  </div>
                  <h2 className="text-4xl lg:text-[56px] font-black text-text-main leading-tight tracking-tighter">
                    ₹2,250<span className="text-brand-primary">.00</span>
                  </h2>
               </div>
               <div className="hidden sm:flex -space-x-3">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-surface-card bg-surface-main flex items-center justify-center text-xs font-bold shadow-sm">
                      {i === 5 ? "+12" : String.fromCharCode(64+i)}
                    </div>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mt-8">
               <div className="bg-surface-main/50 p-4 rounded-2xl border border-border-main/50">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1 leading-none">Receivable</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-text-main">₹3,400</span>
                    <span className="text-[10px] font-bold text-financial-success bg-financial-success/10 px-2 py-0.5 rounded-full">+5.2%</span>
                  </div>
               </div>
               <div className="bg-surface-main/50 p-4 rounded-2xl border border-border-main/50">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1 leading-none">Payable</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-text-main">₹1,150</span>
                    <span className="text-[10px] font-bold text-financial-danger bg-financial-danger/10 px-2 py-0.5 rounded-full">-2.1%</span>
                  </div>
               </div>
            </div>
        </div>

        {/* BENTO CARD 2: Quick Actions (4 col) */}
        <div className="lg:col-span-4 space-y-6">
            <button className="w-full bento-card rounded-3xl p-6 flex items-center justify-between group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary opacity-[0.03] rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-primary text-white rounded-2xl shadow-floating group-hover:rotate-12 transition-transform">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black text-text-main">New Expense</p>
                    <p className="text-xs font-medium text-text-muted">Split with your dosts</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-text-placeholder group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
            </button>

            <button className="w-full bento-card rounded-3xl p-6 flex items-center justify-between group overflow-hidden relative">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-surface-card border border-border-main text-brand-primary rounded-2xl shadow-sm group-hover:-rotate-12 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black text-text-main">Create Group</p>
                    <p className="text-xs font-medium text-text-muted">Flat, Trip, or Office</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-text-placeholder group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
            </button>

            <div className="bento-card rounded-3xl p-6 flex items-center justify-between bg-slate-900 dark:bg-slate-800 border-none group cursor-pointer">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 text-brand-accent rounded-2xl">
                    <Zap className="w-6 h-6 fill-brand-accent text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">Settle Instantly</p>
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Connect UPI</p>
                  </div>
               </div>
               <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-brand-accent transition-colors" />
            </div>
        </div>

        {/* BENTO CARD 3: Activity List (7 col) */}
        <div className="lg:col-span-12 xl:col-span-7 bento-card rounded-3xl p-8 space-y-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-brand-primary" />
                <h3 className="text-lg font-black text-text-main">Activity Log</h3>
              </div>
              <button className="text-xs font-bold text-brand-primary hover:underline">View All</button>
           </div>

           <div className="space-y-1">
              {[
                  { title: "Flat Groceries", group: "Sector 62 Flat", date: "2m ago", amount: 450, person: "You", type: "add" },
                  { title: "Dinner @ CP", group: "Lunch Gang", date: "1h ago", amount: 120, person: "Rahul", type: "pay" },
                  { title: "Fuel Refill", group: "Manali Trip", date: "Yesterday", amount: 2000, person: "Deep", type: "add" },
                  { title: "Movie Tix", group: "Party", date: "Mar 31", amount: 600, person: "You", type: "pay" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-surface-main rounded-2xl transition-colors group cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-[10px] ${
                    activity.type === "add" ? "bg-brand-light/30 text-brand-primary" : "bg-emerald-500/10 text-emerald-500"
                  }`}>
                    {activity.type === "add" ? "IN" : "OUT"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-main truncate group-hover:text-brand-primary transition-colors">{activity.title}</p>
                    <p className="text-[10px] font-bold text-text-muted mt-0.5">{activity.group} • {activity.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-text-main">₹{activity.amount}</p>
                    <p className={`text-[10px] font-bold ${activity.person === "You" ? "text-brand-primary" : "text-text-muted"}`}>
                      {activity.person === "You" ? "By You" : `By ${activity.person}`}
                    </p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* BENTO CARD 4: Groups List (5 col) */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
           <div className="bento-card rounded-3xl p-8 flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-brand-primary" />
                  <h3 className="text-lg font-black text-text-main">Your Circles</h3>
                </div>
                <button className="p-2 bg-surface-main rounded-lg hover:bg-brand-light/20 transition-colors">
                  <Plus className="w-4 h-4 text-brand-primary" />
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Sector 62 Flat", emoji: "🏠", balance: 1200, type: "plus" },
                  { name: "Manali Trip", emoji: "✈️", balance: -850, type: "minus" },
                  { name: "Office Lunch", emoji: "🍔", balance: 320, type: "plus" },
                ].map((group, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-main rounded-xl flex items-center justify-center text-xl group-hover:bg-brand-light/30 transition-colors">
                        {group.emoji}
                      </div>
                      <p className="text-sm font-bold text-text-main group-hover:text-brand-primary transition-colors">{group.name}</p>
                    </div>
                    <div className="text-right">
                       <p className={`text-sm font-black ${
                         group.type === "plus" ? "text-financial-success" : "text-financial-danger"
                       }`}>
                         {group.type === "plus" ? "+" : "-"}₹{Math.abs(group.balance)}
                       </p>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-brand-gradient rounded-3xl p-8 text-white relative overflow-hidden group cursor-pointer shadow-floating">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:rotate-12 transition-transform duration-700">
                <Shapes className="w-16 h-16" />
              </div>
              <div className="relative z-10">
                <h4 className="text-xl font-black">Stats Summary</h4>
                <p className="text-xs font-bold opacity-70 mt-1 max-w-[150px]">You spent ₹4,500 more than last month.</p>
                <button className="mt-4 flex items-center gap-2 text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30 transition-all">
                  View Report <ArrowRight className="w-3 h-3" />
                </button>
              </div>
           </div>
        </div>

      </div>

    </div>
  );
}
