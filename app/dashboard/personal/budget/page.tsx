"use client";

import React, { useState, useEffect } from "react";
import { Wallet, Target, Sparkles, TrendingUp } from "lucide-react";

export default function BudgetPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="space-y-4">
          <div className="h-10 w-64 skeleton rounded-xl" />
          <div className="h-5 w-96 skeleton rounded-lg" />
        </div>
        <div className="h-[500px] w-full skeleton rounded-[2.5rem]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-text-main tracking-tight">Budget Planner</h1>
        <p className="text-text-muted font-medium">Set limits and track your spending habits across categories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Budget Card */}
        <div className="lg:col-span-2 bg-text-main rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-10 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
              <Wallet className="w-40 h-40" />
           </div>
           <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-2">
                 <Target className="w-5 h-5 text-brand-accent" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent">Active Budget</span>
              </div>
              <div className="space-y-2">
                 <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest ml-1">Monthly Goal</p>
                 <h2 className="text-6xl font-black tracking-tight">₹35,000</h2>
              </div>
              <div className="space-y-4 max-w-md">
                 <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span className="text-white/40">Used: ₹12,450</span>
                    <span className="text-white/40">Remaining: ₹22,550</span>
                 </div>
                 <div className="h-4 bg-white/10 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-brand-gradient w-[35%] rounded-full shadow-[0_0_20px_rgba(255,107,0,0.5)]" />
                 </div>
                 <p className="text-xs text-white/60 font-medium">You are currently making great progress! {35}% of your monthly budget is utilized.</p>
              </div>
           </div>
        </div>

        {/* AI Insight Card */}
        <div className="bg-brand-light/30 rounded-[2.5rem] border border-brand-primary/10 p-10 space-y-8">
            <div className="flex items-center gap-3">
               <div className="p-3 bg-white rounded-2xl shadow-sm text-brand-primary">
                  <Sparkles className="w-6 h-6" />
               </div>
               <h4 className="font-black text-text-main">Smart Insight</h4>
            </div>
            <p className="text-text-muted font-medium text-sm leading-relaxed">
              Based on your history, you spend the most on <span className="text-text-main font-bold">Food & Drinks</span> during weekends. Setting a weekend cap of ₹1,500 could save you ₹4,000 monthly.
            </p>
            <button className="w-full h-14 bg-white text-brand-primary font-black rounded-2xl shadow-sm border border-brand-primary/5 hover:shadow-md active:scale-95 transition-all">
               Apply Recommendation
            </button>
        </div>

      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm space-y-8">
         <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-text-main tracking-tight">Category Limits</h3>
            <button className="text-brand-primary font-black text-xs uppercase tracking-widest hover:underline">Edit All</button>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Dining", icon: "🍔", limit: 8000, spent: 4500, color: "bg-orange-500" },
              { label: "Travel", icon: "🚗", limit: 5000, spent: 1200, color: "bg-blue-500" },
              { label: "Shopping", icon: "🛍️", limit: 10000, spent: 8900, color: "bg-purple-500" },
              { label: "Bills", icon: "⚡", limit: 12000, spent: 11500, color: "bg-red-500" },
            ].map((cat) => (
              <div key={cat.label} className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 space-y-4 hover:shadow-md transition-all group">
                 <div className="flex items-center justify-between">
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-[10px] font-black text-text-placeholder uppercase tracking-widest">{cat.label}</span>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                       <span className="text-lg font-black text-text-main">₹{cat.spent}</span>
                       <span className="text-[10px] font-bold text-text-muted">of ₹{cat.limit}</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                       <div 
                         className={`h-full ${cat.color} rounded-full transition-all duration-1000`} 
                         style={{ width: `${Math.min((cat.spent/cat.limit)*100, 100)}%` }}
                       />
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
