"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  LogOut, 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Activity,
  Search,
  Bell,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || session.user.user_metadata?.role !== 'admin') {
        router.push("/admin/login");
      } else {
        setIsLoading(false);
      }
    };
    checkAdmin();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
           <div className="w-12 h-12 bg-brand-gradient rounded-xl flex items-center justify-center font-black text-white">DB</div>
           <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Accessing Secure Terminal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-jakarta selection:bg-brand-primary/20">
      
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-6 left-6 z-50">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-3 bg-slate-900 border border-white/10 rounded-xl text-white shadow-xl"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
      </div>

      {/* Admin Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-72 bg-[#020617] border-r border-white/5 p-8 flex flex-col z-[60] transition-transform duration-500
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
         <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-brand-gradient rounded-xl flex items-center justify-center font-black text-white shadow-lg">DB</div>
            <div>
               <p className="font-black text-xl tracking-tight leading-none">ADMIN</p>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Control Panel</p>
            </div>
         </div>

         <nav className="flex-1 space-y-1">
            {[
              { icon: LayoutDashboard, label: "Overview", active: true },
              { icon: Users, label: "Users" },
              { icon: CreditCard, label: "Payments" },
              { icon: Activity, label: "Logs" },
              { icon: ShieldCheck, label: "Permissions" },
            ].map(item => (
              <div 
                key={item.label} 
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all cursor-pointer text-sm font-bold border ${
                  item.active 
                  ? "bg-brand-primary/10 border-brand-primary/20 text-brand-primary" 
                  : "bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </div>
            ))}
         </nav>

         <div className="mt-auto pt-8">
            <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/5 mb-6">
               <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs">A</div>
                  <div className="min-w-0">
                     <p className="text-xs font-bold truncate">Admin Root</p>
                     <p className="text-[10px] text-slate-500 font-medium">Session: 4h 12m</p>
                  </div>
               </div>
               <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary w-3/4 rounded-full"></div>
               </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 text-sm font-bold transition-all border border-transparent hover:border-red-500/20"
            >
              <LogOut className="w-5 h-5" />
              Terminate Session
            </button>
         </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-72 min-h-screen">
         
         {/* Desktop Header */}
         <header className="h-24 hidden lg:flex items-center justify-between px-10 border-b border-white/5 sticky top-0 bg-[#020617]/80 backdrop-blur-md z-40">
            <div className="relative group max-w-md w-full">
               <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
               <input 
                  type="text" 
                  placeholder="Query system database..." 
                  className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/5 rounded-2xl text-sm focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-slate-600 focus:bg-slate-900"
               />
            </div>

            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none mt-0.5">Cloud Sync Live</span>
               </div>
               <button className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-3 right-3 w-2 h-2 bg-brand-primary rounded-full border-2 border-[#020617]"></span>
               </button>
            </div>
         </header>

         <div className="p-6 lg:p-10 space-y-10">
            
            {/* Greeting & Quick Summary */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
               <div>
                  <h1 className="text-4xl font-black tracking-tight">System Status</h1>
                  <p className="text-slate-500 font-medium text-sm mt-1">Real-time analytical overview of the DostBill ecosystem.</p>
               </div>
               <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-xl border border-white/5 text-sm font-bold hover:bg-white/10 transition-all leading-none">
                     <Download className="w-4 h-4" /> Export Report
                  </button>
                  <button className="flex items-center gap-2 bg-brand-primary px-4 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg hover:shadow-brand-primary/20 hover:scale-105 transition-all leading-none">
                     <Filter className="w-4 h-4" /> Filter Views
                  </button>
               </div>
            </div>

            {/* Bento Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
               {[
                 { label: "Total Users", value: "12,450", change: "+12.5%", color: "text-emerald-500", trend: <ArrowUpRight className="w-4 h-4" /> },
                 { label: "Volume Settled", value: "₹2.4Cr", change: "+8.2%", color: "text-emerald-500", trend: <ArrowUpRight className="w-4 h-4" /> },
                 { label: "Failed Payouts", value: "14", change: "-2", color: "text-red-500", trend: <ArrowDownRight className="w-4 h-4" /> },
                 { label: "Avg Expense", value: "₹4,200", change: "+₹120", color: "text-white", trend: <Activity className="w-4 h-4" /> },
               ].map(stat => (
                 <div key={stat.label} className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] hover:bg-white/[0.05] transition-all group">
                    <div className="flex justify-between items-start mb-4">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
                       <div className={`p-2 rounded-lg bg-white/5 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all`}>
                          <MoreVertical className="w-4 h-4" />
                       </div>
                    </div>
                    <div className="flex items-end justify-between">
                       <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
                       <div className={`flex items-center gap-1 text-sm font-bold ${stat.color}`}>
                          {stat.trend} {stat.change}
                       </div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
               
               {/* User Management Table Section */}
               <div className="xl:col-span-2 bg-white/[0.03] border border-white/5 rounded-[2.5rem] overflow-hidden">
                  <div className="p-8 border-b border-white/5 flex items-center justify-between">
                     <div>
                        <h3 className="text-xl font-black">Recent Provisioning</h3>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Latest Registered Accounts</p>
                     </div>
                     <button className="text-sm font-bold text-brand-primary hover:underline">Manage All Users</button>
                  </div>
                  
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/[0.02]">
                              <th className="px-8 py-4">Identity</th>
                              <th className="px-8 py-4">Auth Method</th>
                              <th className="px-8 py-4">System Role</th>
                              <th className="px-8 py-4">Terminal Status</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                           {[
                              { name: "Rahul Singh", id: "9812...44", method: "Phone Auth", role: "End User", status: "Active" },
                              { name: "Priya Sharma", id: "google_77", method: "OAuth 2.0", role: "Contributor", status: "Active" },
                              { name: "Amit Kumar", id: "6321...90", method: "Phone Auth", role: "End User", status: "Suspended" },
                              { name: "Sneha Kapur", id: "9555...12", method: "Phone Auth", role: "End User", status: "Active" },
                           ].map((user, i) => (
                              <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                                 <td className="px-8 py-5">
                                    <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center font-black text-sm">
                                          {user.name.split(' ').map(n => n[0]).join('')}
                                       </div>
                                       <div>
                                          <p className="text-sm font-bold group-hover:text-brand-primary transition-colors">{user.name}</p>
                                          <p className="text-[10px] font-medium text-slate-500">{user.id}</p>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-8 py-5">
                                    <span className="text-xs font-bold text-slate-400">{user.method}</span>
                                 </td>
                                 <td className="px-8 py-5">
                                    <span className="text-xs font-bold text-slate-400">{user.role}</span>
                                 </td>
                                 <td className="px-8 py-5">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                       user.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                                    }`}>
                                       {user.status}
                                    </span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>

               {/* Right Side: System Logs / Terminal */}
               <div className="bg-[#0f172a] border border-white/5 rounded-[2.5rem] p-8 space-y-6 flex flex-col">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-brand-primary" />
                        <h3 className="text-lg font-black">Live Logs</h3>
                     </div>
                     <div className="w-2 h-2 bg-brand-primary rounded-full animate-ping"></div>
                  </div>

                  <div className="flex-1 space-y-4 font-mono text-[10px] overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-white/10">
                     {[
                        { time: "16:20:01", type: "INFO", msg: "API Request: /v1/transactions", status: "200 OK" },
                        { time: "16:19:45", type: "WARN", msg: "Rate Limit Hint: user_9982", status: "Throttled" },
                        { time: "16:19:12", type: "AUTH", msg: "User Login: Rahul S. (Phone)", status: "Success" },
                        { time: "16:18:55", type: "INFO", msg: "Group Created: Manali Trip", status: "Created" },
                        { time: "16:18:22", type: "ERR", msg: "Database Pool Exhaustion", status: "Retrying" },
                        { time: "16:17:10", type: "INFO", msg: "Background Job: Audit logs", status: "Done" },
                     ].map((log, i) => (
                        <div key={i} className="p-3 bg-black/30 rounded-xl border border-white/[0.03] space-y-1 group hover:border-brand-primary/20 transition-all">
                           <div className="flex justify-between font-black">
                              <span className="text-slate-500">{log.time}</span>
                              <span className={
                                 log.type === "ERR" ? "text-red-500" : 
                                 log.type === "WARN" ? "text-amber-500" : 
                                 log.type === "AUTH" ? "text-brand-accent" : "text-emerald-500"
                              }>{log.type}</span>
                           </div>
                           <p className="text-slate-400">{log.msg}</p>
                           <p className="text-[9px] font-black uppercase tracking-widest text-slate-600">{log.status}</p>
                        </div>
                     ))}
                  </div>

                  <button className="w-full h-12 bg-white/5 border border-white/5 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">
                     View Terminal History
                  </button>
               </div>

            </div>

         </div>
      </main>
    </div>
  );
}
