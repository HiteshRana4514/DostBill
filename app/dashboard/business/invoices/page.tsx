"use client";

import React, { useState, useEffect } from "react";
import { FileText, Plus, Search, Filter, ArrowDownToLine, Send } from "lucide-react";

export default function InvoicesPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="h-10 w-64 skeleton rounded-xl" />
        <div className="h-96 w-full skeleton rounded-[2.5rem]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-text-main tracking-tight">Invoices</h1>
          <p className="text-text-muted font-medium">Create, send and track professional invoices.</p>
        </div>
        <button className="h-14 px-8 bg-brand-gradient text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Invoice
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-placeholder" />
              <input 
                type="text" 
                placeholder="Search invoices by client or ID..." 
                className="w-full h-12 pl-12 pr-4 bg-gray-50 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/10 transition-all font-medium text-sm"
              />
           </div>
           <div className="flex gap-2">
              <button className="h-12 px-6 bg-gray-50 rounded-xl font-bold text-sm text-text-main flex items-center gap-2 hover:bg-gray-100 transition-all border border-gray-100">
                <Filter className="w-4 h-4" /> Filter
              </button>
           </div>
        </div>

        <div className="flex-1 p-2 bg-gray-50/50">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {[
                { id: "INV-2026-001", client: "Acme Corp", amount: "₹12,450", status: "Paid", date: "May 12, 2026" },
                { id: "INV-2026-002", client: "Global Tech", amount: "₹45,000", status: "Pending", date: "May 15, 2026" },
                { id: "INV-2026-003", client: "Freelance Project", amount: "₹2,500", status: "Overdue", date: "May 01, 2026" },
              ].map((inv) => (
                <div key={inv.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        inv.status === 'Paid' ? 'bg-green-50 text-financial-success' :
                        inv.status === 'Pending' ? 'bg-orange-50 text-brand-primary' :
                        'bg-red-50 text-financial-danger'
                      }`}>
                        {inv.status}
                      </span>
                   </div>
                   <div className="space-y-4">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{inv.id}</p>
                         <h4 className="text-xl font-black text-text-main">{inv.client}</h4>
                      </div>
                      <div className="pt-4 border-t border-gray-50">
                         <p className="text-2xl font-black text-text-main">{inv.amount}</p>
                         <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">Due {inv.date}</p>
                      </div>
                      <div className="flex gap-2 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="flex-1 h-10 bg-gray-50 rounded-xl text-text-main text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                           <ArrowDownToLine className="w-3 h-3" /> PDF
                         </button>
                         <button className="flex-1 h-10 bg-brand-light text-brand-primary text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-2">
                           <Send className="w-3 h-3" /> RESEND
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
