"use client";

import React, { useState, useEffect } from "react";
import { Receipt, Plus, Search, Filter } from "lucide-react";

export default function MyExpensesPage() {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-40 skeleton rounded-[2rem]" />)}
        </div>
        <div className="h-96 w-full skeleton rounded-[2.5rem]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-text-main tracking-tight">My Expenses</h1>
          <p className="text-text-muted font-medium">Track your personal spending and independent bills.</p>
        </div>
        <button className="h-14 px-8 bg-brand-gradient text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Expense
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-card rounded-[2rem] p-8 border border-border-main shadow-sm space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Total This Month</p>
            <h3 className="text-3xl font-black text-text-main">₹12,450</h3>
            <p className="text-xs text-financial-danger font-bold flex items-center gap-1">↑ 12% from last month</p>
        </div>
        <div className="bg-surface-card rounded-[2rem] p-8 border border-border-main shadow-sm space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Available Balance</p>
            <h3 className="text-3xl font-black text-text-main">₹45,200</h3>
            <p className="text-xs text-financial-success font-bold flex items-center gap-1">Healthy Status</p>
        </div>
        <div className="bg-text-main rounded-[2rem] p-8 border border-border-main shadow-sm space-y-2 text-surface-card">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Average Daily</p>
            <h3 className="text-3xl font-black">₹415</h3>
            <p className="text-xs text-white/60 font-bold">Within budget limits</p>
        </div>
      </div>

      <div className="bg-surface-card rounded-[2.5rem] border border-border-main shadow-sm overflow-hidden">
        <div className="p-8 border-b border-border-main flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-placeholder" />
              <input 
                type="text" 
                placeholder="Search personal expenses..." 
                className="w-full h-12 pl-12 pr-4 bg-surface-main rounded-xl outline-none focus:bg-surface-card focus:ring-2 focus:ring-brand-primary/10 transition-all font-medium text-sm"
              />
           </div>
           <div className="flex gap-2">
              <button className="h-12 px-6 bg-surface-main rounded-xl font-bold text-sm text-text-main flex items-center gap-2 hover:bg-surface-main/80 transition-all border border-border-main">
                <Filter className="w-4 h-4" /> Filter
              </button>
           </div>
        </div>
        
        <div className="p-20 text-center space-y-6">
           <div className="w-20 h-20 bg-brand-light/30 rounded-3xl flex items-center justify-center mx-auto text-4xl">
             🧾
           </div>
           <div className="max-w-xs mx-auto">
              <h3 className="text-xl font-black text-text-main">No independent expenses</h3>
              <p className="text-text-muted font-medium mt-2 text-sm">Start tracking your personal bills to get a full view of your finances.</p>
           </div>
           <button className="text-brand-primary font-bold hover:underline">Import from SMS</button>
        </div>
      </div>
    </div>
  );
}
