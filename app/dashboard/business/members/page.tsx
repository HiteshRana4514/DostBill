"use client";

import React, { useState, useEffect } from "react";
import { UserCog, Plus, Search, Mail, Phone, MoreHorizontal, Shield, UserPlus, Filter } from "lucide-react";
import { toast } from "react-hot-toast";

interface Member {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Staff";
  status: "Active" | "Inactive" | "Pending";
  joinedDate: string;
  avatar: string;
}

export default function MembersPage() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([
    { id: "1", name: "Ankit Sharma", email: "ankit@dostbill.com", role: "Admin", status: "Active", joinedDate: "Jan 12, 2026", avatar: "AS" },
    { id: "2", name: "Priya Patel", email: "priya@dostbill.com", role: "Manager", status: "Active", joinedDate: "Feb 05, 2026", avatar: "PP" },
    { id: "3", name: "Rahul Verma", email: "rahul@dostbill.com", role: "Staff", status: "Inactive", joinedDate: "Mar 15, 2026", avatar: "RV" },
    { id: "4", name: "Sneha Reddy", email: "sneha@dostbill.com", role: "Staff", status: "Pending", joinedDate: "Apr 20, 2026", avatar: "SR" },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="h-10 w-64 skeleton rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="h-32 skeleton rounded-[2rem]" />
           <div className="h-32 skeleton rounded-[2rem]" />
           <div className="h-32 skeleton rounded-[2rem]" />
        </div>
        <div className="h-[600px] w-full skeleton rounded-[2.5rem]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-text-main tracking-tight flex items-center gap-3">
             <UserCog className="w-8 h-8 text-brand-primary" />
             Member Management
          </h1>
          <p className="text-text-muted font-medium">Manage your team, roles and permissions.</p>
        </div>
        <button className="h-14 px-8 bg-brand-gradient text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-surface-card rounded-[2rem] p-8 border border-border-main shadow-sm flex items-center gap-6 group hover:border-brand-primary/20 transition-all">
            <div className="w-16 h-16 bg-brand-light/30 rounded-2xl flex items-center justify-center shrink-0">
               <Shield className="w-8 h-8 text-brand-primary" />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Total Members</p>
               <h3 className="text-3xl font-black text-text-main">{members.length}</h3>
            </div>
         </div>
         <div className="bg-surface-card rounded-[2rem] p-8 border border-border-main shadow-sm flex items-center gap-6 hover:border-brand-primary/20 transition-all">
            <div className="w-16 h-16 bg-financial-success/10 rounded-2xl flex items-center justify-center shrink-0">
               <Shield className="w-8 h-8 text-financial-success" />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Active Staff</p>
               <h3 className="text-3xl font-black text-text-main">{members.filter(m => m.status === 'Active').length}</h3>
            </div>
         </div>
         <div className="bg-text-main rounded-[2rem] p-8 text-surface-card shadow-lg flex items-center gap-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-sm">
               <Mail className="w-8 h-8 text-brand-accent" />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Pending Invites</p>
               <h3 className="text-3xl font-black">{members.filter(m => m.status === 'Pending').length}</h3>
            </div>
         </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-surface-card rounded-[2.5rem] border border-border-main shadow-sm overflow-hidden flex flex-col min-h-[600px]">
         
         {/* Filters Bar */}
         <div className="p-8 border-b border-border-main flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-placeholder" />
               <input 
                 type="text" 
                 placeholder="Search members by name or email..." 
                 className="w-full h-12 pl-12 pr-4 bg-surface-main rounded-xl outline-none focus:bg-surface-card focus:ring-2 focus:ring-brand-primary/10 transition-all font-medium text-sm"
               />
            </div>
            <div className="flex gap-2">
               <button className="h-12 px-6 bg-surface-main rounded-xl font-bold text-sm text-text-main flex items-center gap-2 border border-border-main">
                 <Filter className="w-4 h-4" /> Filter
               </button>
            </div>
         </div>

         {/* Members Table */}
         <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-border-main">
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Member</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Role</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Status</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Joined</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="group hover:bg-surface-main/50 transition-colors border-b border-border-main">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-brand-light/30 rounded-2xl flex items-center justify-center font-black text-brand-primary text-sm shadow-sm">
                                {member.avatar}
                             </div>
                             <div>
                                <p className="font-bold text-text-main text-sm">{member.name}</p>
                                <p className="text-xs text-text-muted font-medium">{member.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            member.role === 'Admin' ? 'border-brand-primary/20 text-brand-primary bg-brand-light/20' :
                            member.role === 'Manager' ? 'border-border-main text-text-main' :
                            'border-border-main text-text-muted'
                          }`}>
                            {member.role}
                          </span>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <div className={`w-2 h-2 rounded-full ${
                               member.status === 'Active' ? 'bg-financial-success' :
                               member.status === 'Inactive' ? 'bg-financial-danger' :
                               'bg-yellow-400'
                             }`} />
                             <span className="text-sm font-bold text-text-main">{member.status}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-sm font-medium text-text-muted">
                          {member.joinedDate}
                       </td>
                       <td className="px-8 py-6 text-right">
                          <button className="p-2 hover:bg-surface-main rounded-lg transition-colors text-text-muted hover:text-text-main">
                             <MoreHorizontal className="w-5 h-5" />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination Placeholder */}
         <div className="p-8 bg-surface-main/30 border-t border-border-main flex items-center justify-between">
            <p className="text-xs text-text-muted font-bold tracking-widest uppercase">Showing {members.length} Members</p>
            <div className="flex gap-2">
               <button className="px-4 py-2 bg-surface-card border border-border-main rounded-lg text-xs font-black text-text-muted cursor-not-allowed">Prev</button>
               <button className="px-4 py-2 bg-surface-card border border-border-main rounded-lg text-xs font-black text-text-muted cursor-not-allowed">Next</button>
            </div>
         </div>
      </div>
    </div>
  );
}
