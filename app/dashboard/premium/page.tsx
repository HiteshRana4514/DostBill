"use client";

import React, { useState, useEffect } from "react";
import { 
  Crown, 
  Check, 
  Zap, 
  Infinity, 
  BarChart3, 
  ShieldCheck, 
  Timer, 
  Gift,
  ArrowRight,
  TrendingDown,
  Clock,
  UserPlus,
  CreditCard,
  Smartphone
} from "lucide-react";
import { toast } from "react-hot-toast";

type Frequency = "monthly" | "quarterly" | "yearly";

export default function PremiumPage() {
  const [loading, setLoading] = useState(true);
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [timeLeft, setTimeLeft] = useState("01:59:59"); // Mock countdown for "2 days" discount

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const plans = [
    {
      name: "Free",
      price: 0,
      desc: "Perfect for casual split with friends.",
      features: [
        "Up to 5 groups",
        "Basic expense logging",
        "WhatsApp summaries",
        "Standard support"
      ],
      cta: "Current Plan",
      highlight: false,
      isFree: true
    },
    {
      name: "Pro",
      price: {
        monthly: 49,
        quarterly: 129,
        yearly: 399
      },
      desc: "For power users who split daily.",
      features: [
        "Unlimited groups",
        "Detailed spending analytics",
        "PDF & Excel exports",
        "Custom categories",
        "Priority support"
      ],
      cta: "Go Pro",
      highlight: true,
      tag: "Best Value"
    },
    {
      name: "Pro +",
      price: {
        monthly: 99,
        quarterly: 249,
        yearly: 799
      },
      desc: "The ultimate DostBill experience.",
      features: [
        "Everything in Pro",
        "Smart bill scanning (OCR)",
        "Settlement reminders",
        "Zero Ads forever",
        "Dedicated account manager"
      ],
      cta: "Get Everything",
      highlight: false,
      tag: "Premium"
    }
  ];

  const handleSubscribe = (planName: string) => {
    toast.success(`Redirecting to payment for ${planName} (${frequency})...`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
           <div className="h-10 w-64 skeleton mx-auto rounded-xl" />
           <div className="h-5 w-96 skeleton mx-auto rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-[600px] skeleton rounded-[3rem]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-16 animate-in fade-in duration-700 pb-24">
      
      {/* Header & Offer */}
      <div className="relative text-center space-y-6 pt-8">
        {/* Flash Offer Banner */}
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-financial-danger-bg text-financial-danger rounded-full border border-red-100 shadow-sm animate-pulse mb-4">
           <Timer className="w-4 h-4" />
           <span className="text-xs font-black uppercase tracking-widest">
             Flash Offer: 10% OFF ends in 01:59:59
           </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl font-black text-text-main tracking-tight flex items-center justify-center gap-4">
            <Crown className="w-10 h-10 text-brand-accent fill-brand-accent" />
            DostBill Premium
          </h1>
          <p className="text-text-muted font-medium text-lg max-w-2xl mx-auto">
            Upgrade your financial harmony. Unlock advanced tools to track, analyze, and settle splits faster than ever.
          </p>
        </div>

        {/* Frequency Switcher */}
        <div className="flex items-center justify-center pt-4">
           <div className="p-1.5 bg-gray-100 rounded-2xl flex gap-1 border border-gray-200 shadow-inner">
              {(["monthly", "quarterly", "yearly"] as Frequency[]).map(freq => (
                <button
                  key={freq}
                  onClick={() => setFrequency(freq)}
                  className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                    frequency === freq 
                    ? "bg-white text-text-main shadow-sm scale-105" 
                    : "text-text-muted hover:text-text-main"
                  }`}
                >
                  {freq}
                  {freq === 'yearly' && (
                    <span className="ml-2 bg-financial-success text-white px-2 py-0.5 rounded-full text-[8px]">Save 30%</span>
                  )}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative group bg-white rounded-[3rem] p-10 border transition-all duration-500 hover:shadow-floating ${
              plan.highlight 
              ? "border-brand-primary/20 shadow-xl scale-105 z-10" 
              : "border-gray-100 hover:border-brand-primary/10 shadow-sm"
            }`}
          >
            {plan.tag && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                {plan.tag}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-text-main">{plan.name}</h3>
                <p className="text-text-muted font-medium text-sm mt-1">{plan.desc}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">₹</span>
                <span className="text-6xl font-black tracking-tight">
                  {typeof plan.price === 'number' ? plan.price : plan.price[frequency]}
                </span>
                {!plan.isFree && frequency !== 'yearly' && (
                   <span className="text-text-muted font-bold text-sm uppercase tracking-widest">/{frequency.slice(0, 3)}</span>
                )}
                {frequency === 'yearly' && !plan.isFree && (
                  <span className="text-text-muted font-bold text-xs uppercase tracking-widest">/one-time</span>
                )}
              </div>

              {/* Feature List */}
              <ul className="space-y-4 pt-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`mt-1 p-0.5 rounded-full ${plan.highlight ? 'bg-brand-primary/10 text-brand-primary' : 'bg-gray-100 text-text-muted'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm font-medium text-text-main/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => !plan.isFree && handleSubscribe(plan.name)}
                disabled={plan.isFree}
                className={`w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-lg ${
                  plan.isFree 
                  ? "bg-gray-50 text-text-muted cursor-default shadow-none border border-gray-100" 
                  : plan.highlight 
                  ? "bg-brand-gradient text-white hover:opacity-90" 
                  : "bg-text-main text-white hover:bg-black"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Offers Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Lifetime Access Offer */}
         <div className="bg-text-main rounded-[3rem] p-10 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 transform group-hover:rotate-12 transition-transform duration-700">
               <Zap className="w-48 h-48 fill-brand-accent text-brand-accent" />
            </div>
            <div className="relative z-10 space-y-6">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-accent/20 text-brand-accent rounded-full border border-brand-accent/20">
                  <Infinity className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Limited Availability</span>
               </div>
               <h2 className="text-4xl font-black tracking-tight leading-tight">
                 Get Lifetime Access to <span className="text-brand-accent">Pro +</span>
               </h2>
               <p className="text-white/60 font-medium leading-relaxed max-w-md">
                 Pay once and enjoy all premium features forever. No subscriptions, no renewals, just pure financial peace of mind.
               </p>
               <div className="flex items-center gap-6 pt-2">
                  <div className="flex flex-col">
                     <span className="text-3xl font-black">₹999</span>
                     <span className="text-[10px] uppercase font-black tracking-widest text-white/40">One-time payment</span>
                  </div>
                  <button className="h-14 px-8 bg-brand-gradient text-white font-black rounded-2xl shadow-xl hover:opacity-90 active:scale-95 transition-all">
                     Secure Lifetime Now
                  </button>
               </div>
            </div>
         </div>

         {/* Promo Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between group cursor-pointer hover:border-brand-primary/20 transition-all">
               <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-brand-primary shadow-inner mb-6 transition-transform group-hover:scale-110">
                  <Gift className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="font-black text-text-main">Student Discount</h4>
                  <p className="text-xs text-text-muted font-medium mt-2">Get 50% off Pro plans with your .edu email.</p>
                  <div className="mt-4 flex items-center gap-2 text-brand-primary font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                     Verify Status <ArrowRight className="w-3 h-3" />
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between group cursor-pointer hover:border-brand-primary/20 transition-all">
               <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-financial-success shadow-inner mb-6 transition-transform group-hover:scale-110">
                  <UserPlus className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="font-black text-text-main">Refer & Earn</h4>
                  <p className="text-xs text-text-muted font-medium mt-2">Invite 3 friends and get 1 month of Pro free.</p>
                  <div className="mt-4 flex items-center gap-2 text-brand-primary font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                     Invite Now <ArrowRight className="w-3 h-3" />
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Security Banner */}
      <div className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-8 justify-between">
         <div className="flex gap-4">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-financial-success shrink-0">
               <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-1">
               <p className="text-text-main font-black text-lg leading-none">Secure Payment Processing</p>
               <p className="text-text-muted text-sm font-medium">All payments are encrypted and processed via major gateways. Auto-pay can be canceled anytime from your dashboard.</p>
            </div>
         </div>
         <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
            <CreditCard className="w-8 h-8" />
            <Smartphone className="w-8 h-8" />
            <Zap className="w-8 h-8" />
         </div>
      </div>
    </div>
  );
}
