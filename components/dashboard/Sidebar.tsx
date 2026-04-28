"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  History, 
  PieChart,
  HelpCircle,
  ShieldCheck,
  Receipt,
  Wallet,
  Landmark,
  Calendar,
  Briefcase,
  FileText,
  UserCog
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Users, label: "Groups", href: "/dashboard/groups" },
  { icon: UserPlus, label: "Friends", href: "/dashboard/friends" },
  { icon: History, label: "Activity", href: "/dashboard/activity" },
  { icon: PieChart, label: "Insights", href: "/dashboard/insights" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Structured Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-gray-100 z-50 transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex flex-col h-full">
          
          {/* Logo Section */}
          <div className="h-20 flex items-center px-8 border-b border-gray-50 mb-4">
            <Link href="/dashboard" className="flex items-center group">
              <img src="/logo.png" alt="DostBill" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform" />
            </Link>
          </div>

          {/* Unified Scrollable Navigation Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4">
            
            {/* Global Navigation Section */}
            <div className="mb-8">
              <p className="px-4 text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] mb-4">Navigation</p>
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group
                        ${isActive 
                          ? "bg-brand-light text-brand-primary" 
                          : "text-text-muted hover:text-text-main hover:bg-gray-50"}
                      `}
                    >
                      <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-brand-primary" : "group-hover:text-text-main"}`} />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Business Section */}
            <div className="mb-8 pt-6 border-t border-gray-50">
              <p className="px-4 text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] mb-4">Business</p>
              <nav className="space-y-1">
                {[
                  { icon: Briefcase, label: "Hub", href: "/dashboard/business/overview" },
                  { icon: FileText, label: "Invoices", href: "/dashboard/business/invoices" },
                  { icon: UserCog, label: "Members", href: "/dashboard/business/members" },
                ].map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group
                        ${isActive 
                          ? "bg-brand-light text-brand-primary" 
                          : "text-text-muted hover:text-text-main hover:bg-gray-50"}
                      `}
                    >
                      <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-brand-primary" : "group-hover:text-text-main"}`} />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Personal Section */}
            <div className="mb-4 pt-6 border-t border-gray-50">
              <p className="px-4 text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] mb-4">Personal</p>
              <nav className="space-y-1">
                {[
                  { icon: Receipt, label: "My Expenses", href: "/dashboard/personal/expenses" },
                  { icon: Wallet, label: "Budget Planner", href: "/dashboard/personal/budget" },
                  { icon: Landmark, label: "Savings Goals", href: "/dashboard/personal/savings" },
                  { icon: Calendar, label: "Monthly Planner", href: "/dashboard/personal/planner" },
                ].map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group
                        ${isActive 
                          ? "bg-brand-light text-brand-primary" 
                          : "text-text-muted hover:text-text-main hover:bg-gray-50"}
                      `}
                    >
                      <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-brand-primary" : "group-hover:text-text-main"}`} />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

          </div>

          {/* Minimalist Footer inside Sidebar */}
          <div className="p-6 border-t border-gray-50">
             <div className="bg-brand-primary/5 rounded-2xl p-4 border border-brand-primary/10">
                <div className="flex items-center gap-3 mb-2">
                   <ShieldCheck className="w-4 h-4 text-brand-primary" />
                   <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Secured by Dost</span>
                </div>
                <p className="text-[10px] text-text-muted font-medium leading-relaxed">
                   Your data is encrypted and safe with us.
                </p>
             </div>
          </div>

        </div>
      </aside>
    </>
  );
}
