"use client";

import React, { useState } from "react";
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  LifeBuoy, 
  Globe, 
  MessageSquare,
  Sparkles,
  PhoneCall
} from "lucide-react";
import { toast } from "react-hot-toast";

const FAQS = [
  {
    q: "How do I split a bill with multiple people?",
    a: "Navigate to any group, tap 'Add Expense', enter the amount and select the members you want to split with. You can split equally or set custom amounts."
  },
  {
    q: "Can I settle bills using UPI?",
    a: "Yes! If you've added your UPI ID in Account Details, other members can see it and pay you directly via any UPI app. DostBill helps track these settlements."
  },
  {
    q: "Is my financial data secure?",
    a: "Absolutely. DostBill only tracks split amounts and group activity. We never ask for your bank login or pin. Your phone number is verified via secure OTP."
  },
  {
    q: "What if I accidentally delete a group?",
    a: "Currently, group deletion is permanent. We recommend only deleting groups that are fully settled and no longer active."
  }
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [feedback, setFeedback] = useState("");
  const [sending, setSending] = useState(false);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setSending(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    
    toast.success("Feedback sent! Thank you for helping us improve.");
    setFeedback("");
    setSending(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="w-20 h-20 bg-brand-light rounded-[2.5rem] flex items-center justify-center mx-auto text-brand-primary shadow-inner border border-brand-primary/10">
          <LifeBuoy className="w-10 h-10 animate-spin-slow" />
        </div>
        <h1 className="text-4xl font-black text-text-main tracking-tight">How can we help?</h1>
        <p className="text-text-muted font-medium max-w-lg mx-auto leading-relaxed">
          Search our FAQs or send us feedback. We're here to make your bill splitting experience seamless.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left: FAQs */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-3 px-2">
             <HelpCircle className="w-6 h-6 text-brand-primary" />
             <h2 className="text-2xl font-black text-text-main">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-300"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-bold text-text-main">{faq.q}</span>
                  {openFaq === index ? <ChevronUp className="w-5 h-5 text-brand-primary" /> : <ChevronDown className="w-5 h-5 text-text-placeholder" />}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-text-muted font-medium text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
             <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100/50 space-y-4 group cursor-pointer hover:bg-blue-50 transition-colors">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm transition-transform group-hover:scale-110">
                   <MessageSquare className="w-6 h-6" />
                </div>
                <h4 className="font-black text-blue-900">Live Support</h4>
                <p className="text-xs text-blue-700/70 font-medium">Chat with our team for quick resolutions to your issues.</p>
             </div>
             
             <div className="p-8 bg-purple-50/50 rounded-[2.5rem] border border-purple-100/50 space-y-4 group cursor-pointer hover:bg-purple-50 transition-colors">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-500 shadow-sm transition-transform group-hover:scale-110">
                   <Mail className="w-6 h-6" />
                </div>
                <h4 className="font-black text-purple-900">Email Us</h4>
                <p className="text-xs text-purple-700/70 font-medium">Prefer email? Drop us a line at support@dostbill.com</p>
             </div>
          </div>
        </div>

        {/* Right: Feedback Form */}
        <div className="lg:col-span-1">
           <div className="bg-text-main rounded-[2.5rem] p-8 lg:p-10 text-white space-y-8 sticky top-8 shadow-floating">
              <div className="flex items-center gap-3">
                 <Sparkles className="w-6 h-6 text-brand-accent" />
                 <h3 className="text-2xl font-black">Feedback</h3>
              </div>
              <p className="text-white/60 text-sm font-medium leading-relaxed">
                 Have a feature request or found a bug? Let us know! We love hearing from our dosts.
              </p>

              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Your Message</label>
                    <textarea 
                       value={feedback}
                       onChange={(e) => setFeedback(e.target.value)}
                       placeholder="I wish DostBill could..."
                       className="w-full h-40 p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all font-medium text-sm resize-none"
                    />
                 </div>
                 <button 
                    type="submit"
                    disabled={sending || !feedback.trim()}
                    className="w-full h-14 bg-brand-gradient text-white font-black rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-40"
                 >
                    {sending ? (
                       <span className="animate-pulse">Sending...</span>
                    ) : (
                       <>
                          <Send className="w-5 h-5" />
                          Send Feedback
                       </>
                    )}
                 </button>
              </form>

              <div className="pt-8 border-t border-white/5 space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Follow Us</p>
                 <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                       <Globe className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                       <MessageCircle className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                       <PhoneCall className="w-5 h-5" />
                    </a>
                 </div>
                 <div className="pt-4 text-[10px] text-white/20 font-bold uppercase tracking-widest">
                    Version 1.0.4 • Made with ❤️
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
