"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, TrendingUp, Users, ArrowUpRight, Plus, Search } from "lucide-react";

export default function BusinessOverviewPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="h-10 w-64 skeleton rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 skeleton rounded-[2rem]" />)}
        </div>
        <div className="h-96 w-full skeleton rounded-[2.5rem]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-text-main tracking-tight">Business Hub</h1>
          <p className="text-text-muted font-medium">Manage your professional finances and operations.</p>
        </div>
        <div className="flex gap-3">
           <button className="h-14 px-8 bg-surface-card border border-border-main text-text-main font-black rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95">
             Reports
           </button>
           <button className="h-14 px-8 bg-brand-gradient text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all flex items-center gap-2">
             <Plus className="w-5 h-5" />
             New Transaction
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-card rounded-[2rem] p-8 border border-border-main shadow-sm space-y-2 group hover:border-brand-primary/20 transition-all">
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Total Revenue</p>
            <h3 className="text-3xl font-black text-text-main">₹4.2L</h3>
            <p className="text-xs text-financial-success font-bold flex items-center gap-1">+24% vs last month</p>
        </div>
        <div className="bg-surface-card rounded-[2rem] p-8 border border-border-main shadow-sm space-y-2 hover:border-brand-primary/20 transition-all">
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Active Clients</p>
            <h3 className="text-3xl font-black text-text-main">12</h3>
            <p className="text-xs text-text-muted font-bold">3 new this week</p>
        </div>
        <div className="bg-surface-card rounded-[2rem] p-8 border border-border-main shadow-sm space-y-2 hover:border-brand-primary/20 transition-all">
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Outstanding</p>
            <h3 className="text-3xl font-black text-financial-danger">₹85,000</h3>
            <p className="text-xs text-text-muted font-bold">5 invoices delayed</p>
        </div>
        <div className="bg-text-main rounded-[2rem] p-8 border border-border-main shadow-sm space-y-2 text-surface-card">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Net Margin</p>
            <h3 className="text-3xl font-black">68%</h3>
            <p className="text-xs text-brand-accent font-bold">High Performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-surface-card rounded-[2.5rem] border border-border-main shadow-sm overflow-hidden p-10 flex flex-col items-center justify-center space-y-6 text-center min-h-[400px]">
            <div className="w-20 h-20 bg-brand-light/30 rounded-3xl flex items-center justify-center text-4xl">
              📊
            </div>
            <div className="max-w-sm">
               <h3 className="text-2xl font-black text-text-main tracking-tight">Financial Trends</h3>
               <p className="text-text-muted font-medium mt-2">Connect your business bank account to see real-time cash flow analytics.</p>
            </div>
            <button className="h-14 px-10 bg-brand-light/30 text-brand-primary font-black rounded-2xl hover:bg-brand-primary hover:text-white transition-all active:scale-95">
               Link Bank Account
            </button>
         </div>

         <div className="bg-surface-card rounded-[2.5rem] border border-border-main shadow-sm p-10 space-y-8">
            <h4 className="text-xl font-black text-text-main tracking-tight">Recent Activity</h4>
            <div className="space-y-6">
               {[
                 { title: "Invoice #1024 Paid", date: "2h ago", amount: "₹12,000", type: "income" },
                 { title: "Office Rent", date: "Yesterday", amount: "₹45,000", type: "expense" },
                 { title: "New Client Onboarded", date: "2 days ago", amount: "N/A", type: "event" },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="space-y-1">
                       <p className="text-sm font-bold text-text-main group-hover:text-brand-primary transition-colors">{item.title}</p>
                       <p className="text-[10px] text-text-muted font-medium uppercase tracking-widest">{item.date}</p>
                    </div>
                    <div className="text-right">
                       <p className={`text-sm font-black ${item.type === 'income' ? 'text-financial-success' : 'text-text-main'}`}>{item.amount}</p>
                    </div>
                 </div>
               ))}
            </div>
            <button className="w-full h-12 text-brand-primary font-black text-xs uppercase tracking-widest hover:underline">
               Full Statement
            </button>
         </div>
      </div>
    </div>
  );
}
