"use client";

import React, { useState, useEffect } from "react";
import { Landmark, TrendingUp, PiggyBank, Briefcase, Plus, ArrowUpRight } from "lucide-react";

export default function SavingsPage() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="h-[400px] skeleton rounded-[2.5rem]" />
           <div className="h-[400px] skeleton rounded-[2.5rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-text-main tracking-tight">Savings & Goals</h1>
          <p className="text-text-muted font-medium">Build your future, one settlement at a time.</p>
        </div>
        <button className="h-14 px-8 bg-brand-gradient text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Total Savings Card */}
        <div className="lg:col-span-1 bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm space-y-8">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-financial-success shadow-inner">
               <TrendingUp className="w-8 h-8" />
            </div>
            <div className="space-y-1">
               <p className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-0.5">Total Assets Under DostBill</p>
               <h2 className="text-5xl font-black text-text-main tracking-tight">₹1,24,000</h2>
            </div>
            <div className="flex gap-4">
                <div className="flex-1 bg-gray-50 rounded-2xl p-4 space-y-1">
                   <p className="text-[8px] font-black uppercase tracking-widest text-text-muted">Invested</p>
                   <p className="font-black text-text-main">₹85K</p>
                </div>
                <div className="flex-1 bg-gray-50 rounded-2xl p-4 space-y-1">
                   <p className="text-[8px] font-black uppercase tracking-widest text-text-muted">Liquid Cash</p>
                   <p className="font-black text-text-main">₹39K</p>
                </div>
            </div>
        </div>

        {/* Goals Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { id: "1", title: "New MacBook Pro", target: 180000, current: 45000, icon: "💻", color: "from-blue-500 to-indigo-600" },
              { id: "2", title: "Emergency Fund", target: 50000, current: 35000, icon: "🛡️", color: "from-green-500 to-emerald-600" },
            ].map(goal => (
              <div key={goal.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-6 relative overflow-hidden group">
                 <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${goal.color} opacity-5 rounded-bl-[4rem] group-hover:scale-110 transition-transform`} />
                 <div className="flex items-center justify-between">
                    <span className="text-3xl">{goal.icon}</span>
                    <div className="px-3 py-1 bg-gray-50 rounded-full text-[8px] font-black text-text-muted uppercase tracking-widest">
                       {Math.round((goal.current/goal.target)*100)}% Complete
                    </div>
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-text-main">{goal.title}</h4>
                    <p className="text-xs text-text-muted font-medium mt-1">₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}</p>
                 </div>
                 <div className="space-y-2">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                       <div 
                         className={`h-full bg-gradient-to-r ${goal.color} transition-all duration-1000`} 
                         style={{ width: `${(goal.current/goal.target)*100}%` }}
                       />
                    </div>
                 </div>
                 <button className="flex items-center gap-2 text-xs font-black text-brand-primary uppercase tracking-widest group-hover:gap-3 transition-all pt-2">
                    Add Savings <ArrowUpRight className="w-3 h-3" />
                 </button>
              </div>
            ))}
        </div>

      </div>

      {/* Suggested Saving Plan */}
      <div className="bg-text-main rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
         <div className="absolute inset-0 bg-brand-gradient opacity-5" />
         <div className="flex gap-6 relative z-10">
            <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center text-white shrink-0 shadow-inner">
               <PiggyBank className="w-8 h-8" />
            </div>
            <div className="space-y-2">
               <h3 className="text-2xl font-black">Join the 50/30/20 Challenge</h3>
               <p className="text-white/40 text-sm font-medium leading-relaxed max-w-sm">
                 We've calculated that you can save an extra <span className="text-white font-bold">₹2,400</span> this month by optimizing your utilities.
               </p>
            </div>
         </div>
         <button className="h-14 px-10 bg-white text-text-main font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10">
            Activate Auto-Save
         </button>
      </div>

    </div>
  );
}
