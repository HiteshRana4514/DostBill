"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { format, isSameDay } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  CreditCard, 
  Home, 
  User, 
  Clock,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  TrendingDown as TrendingDownIcon
} from "lucide-react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/Modal";

// Types
interface PlannedExpense {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category: "emi" | "loan" | "personal" | "bill";
  status: "pending" | "scheduled";
}

export default function PlannerPage() {
  const [loading, setLoading] = useState(true);
  const [value, onChange] = useState<any>(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [plannedExpenses, setPlannedExpenses] = useState<PlannedExpense[]>([
    { id: "1", title: "Home Loan EMI", amount: 25000, date: new Date(2026, 3, 2), category: "loan", status: "scheduled" },
    { id: "2", title: "Credit Card Bill", amount: 12450, date: new Date(2026, 3, 10), category: "emi", status: "scheduled" },
    { id: "3", title: "Repay Rahul", amount: 1500, date: new Date(2026, 3, 15), category: "personal", status: "pending" },
    { id: "4", title: "Internet Bill", amount: 999, date: new Date(2026, 3, 5), category: "bill", status: "scheduled" },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "personal" as PlannedExpense["category"],
    date: format(new Date(), "yyyy-MM-dd")
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const getExpensesForDay = (date: Date) => {
    return plannedExpenses.filter(exp => isSameDay(exp.date, date));
  };

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.date) return;

    const newExpense: PlannedExpense = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date),
      category: formData.category,
      status: "scheduled"
    };

    setPlannedExpenses([...plannedExpenses, newExpense]);
    setShowAddModal(false);
    setFormData({ title: "", amount: "", category: "personal", date: format(new Date(), "yyyy-MM-dd") });
    toast.success("Schedule added successfully!");
  };

  const tileContent = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      const dailyExpenses = getExpensesForDay(date);
      if (dailyExpenses.length > 0) {
        return (
          <div className="flex justify-center gap-1 mt-1">
            {dailyExpenses.map(exp => (
              <div 
                key={exp.id} 
                className={`w-1.5 h-1.5 rounded-full ${
                  exp.category === 'loan' ? 'bg-red-500' : 
                  exp.category === 'emi' ? 'bg-blue-500' : 
                  'bg-brand-primary'
                }`} 
              />
            ))}
          </div>
        );
      }
    }
    return null;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="h-10 w-64 skeleton rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <div className="lg:col-span-3 h-[600px] skeleton rounded-[2.5rem]" />
           <div className="h-[600px] skeleton rounded-[2.5rem]" />
        </div>
      </div>
    );
  }

  const selectedDayExpenses = getExpensesForDay(value);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-text-main tracking-tight flex items-center gap-3">
             <CalendarIcon className="w-8 h-8 text-brand-primary" />
             Monthly Planner
          </h1>
          <p className="text-text-muted font-medium">Schedule and manage your upcoming commitments.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="h-14 px-8 bg-brand-gradient text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Calendar Card */}
        <div className="lg:col-span-3 bg-surface-card rounded-[2.5rem] border border-border-main shadow-sm p-4 md:p-8">
           <Calendar 
              onChange={onChange} 
              value={value} 
              tileContent={tileContent}
              nextLabel={<ChevronRight className="w-5 h-5" />}
              prevLabel={<ChevronLeft className="w-5 h-5" />}
              next2Label={null}
              prev2Label={null}
              className="responsive-calendar"
           />
        </div>

        {/* Info Sidebar */}
        <div className="space-y-8">
           
           {/* Daily Selection */}
           <div className="bg-surface-card rounded-[2.5rem] p-8 border border-border-main shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="text-xl font-black text-text-main">
                    {format(value, "MMMM d")}
                 </h3>
                 <span className="text-[10px] font-black text-brand-primary bg-brand-light/30 px-2 py-0.5 rounded-full uppercase tracking-widest">Selected</span>
              </div>
              
              <div className="space-y-4">
                 {selectedDayExpenses.length > 0 ? (
                    selectedDayExpenses.map(exp => (
                      <div key={exp.id} className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            exp.category === 'loan' ? 'bg-red-50 text-red-500' :
                            exp.category === 'emi' ? 'bg-blue-50 text-blue-500' :
                            'bg-brand-light text-brand-primary'
                         }`}>
                            {exp.category === 'loan' ? <Home className="w-5 h-5" /> :
                             exp.category === 'emi' ? <CreditCard className="w-5 h-5" /> :
                             <User className="w-5 h-5" />}
                         </div>
                         <div className="flex-1">
                            <h4 className="text-sm font-bold text-text-main leading-tight">{exp.title}</h4>
                            <p className="font-black text-brand-primary text-xs mt-1">₹{exp.amount.toLocaleString()}</p>
                         </div>
                      </div>
                    ))
                 ) : (
                    <div className="py-10 text-center space-y-3">
                       <div className="text-3xl grayscale opacity-30">📅</div>
                       <p className="text-xs text-text-muted font-medium">Nothing planned for this day.</p>
                       <button 
                         onClick={() => setShowAddModal(true)}
                         className="text-brand-primary text-[10px] font-black uppercase tracking-widest hover:underline"
                       >
                         Plan something
                       </button>
                    </div>
                 )}
              </div>
           </div>

           {/* Monthly Exposure Card */}
           <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white shadow-lg space-y-6 relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 p-6 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                 <TrendingDownIcon className="w-20 h-20" />
              </div>
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                       <CreditCard className="w-5 h-5 text-brand-accent" />
                    </div>
                    <h4 className="font-bold text-sm tracking-tight">Monthly Commitment</h4>
                 </div>
                 <div>
                    <h2 className="text-4xl font-black tracking-tight">₹{plannedExpenses.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</h2>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1">Total Fixed Expenses</p>
                 </div>
                 <div className="pt-4 border-t border-white/5 space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                       <span className="text-white/40">Status</span>
                       <span className="text-financial-success">Under Budget</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-brand-primary w-[45%] rounded-full" />
                    </div>
                 </div>
              </div>
           </div>

        </div>

      </div>

      {/* Full Month Agenda List (Responsive) */}
      <div className="bg-surface-card rounded-[2.5rem] border border-border-main shadow-sm p-8 md:p-12 space-y-8">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-2xl font-black text-text-main tracking-tight">Upcoming Schedule</h3>
            <div className="flex gap-2">
               <span className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-text-muted border border-gray-100">This Month</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plannedExpenses.sort((a, b) => a.date.getTime() - b.date.getTime()).map(exp => (
              <div key={exp.id} className="p-6 bg-surface-main/30 rounded-[2rem] border border-border-main hover:shadow-md transition-all space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="px-3 py-1 bg-surface-card rounded-full text-[10px] font-black text-text-muted uppercase tracking-widest shadow-sm">
                       {format(exp.date, "MMM d")}
                    </div>
                    {exp.status === 'scheduled' ? (
                       <CheckCircle2 className="w-5 h-5 text-brand-primary/20" />
                    ) : (
                       <Circle className="w-5 h-5 text-gray-200" />
                    )}
                 </div>
                 <div className="space-y-1">
                    <h4 className="font-bold text-text-main text-sm">{exp.title}</h4>
                    <p className="text-lg font-black text-text-main">₹{exp.amount.toLocaleString()}</p>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                       exp.category === 'loan' ? 'bg-red-50 text-red-500' :
                       exp.category === 'emi' ? 'bg-blue-50 text-blue-500' :
                       'bg-brand-light text-brand-primary'
                    }`}>
                       {exp.category === 'loan' ? <Home className="w-4 h-4" /> :
                        exp.category === 'emi' ? <CreditCard className="w-4 h-4" /> :
                        <User className="w-4 h-4" />}
                    </div>
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{exp.category}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Add Schedule Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <div className="bg-surface-card rounded-[2.5rem] p-8 shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
           <div className="space-y-2">
              <h3 className="text-2xl font-black text-text-main">Add Schedule</h3>
              <p className="text-text-muted font-medium text-sm">Planning for {format(value, "MMMM d, yyyy")}</p>
           </div>

           <form onSubmit={handleAddSchedule} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Title</label>
                   <input 
                     type="text"
                     required
                     value={formData.title}
                     onChange={e => setFormData({ ...formData, title: e.target.value })}
                     placeholder="e.g. Rent, Insurance"
                     className="w-full h-14 px-6 bg-gray-50 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/10 transition-all font-bold text-text-main"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Select Date</label>
                   <input 
                     type="date"
                     required
                     value={formData.date}
                     onChange={e => setFormData({ ...formData, date: e.target.value })}
                     className="w-full h-14 px-6 bg-gray-50 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/10 transition-all font-bold text-text-main appearance-none cursor-pointer"
                   />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Amount (₹)</label>
                    <input 
                      type="number"
                      required
                      value={formData.amount}
                      onChange={e => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                      className="w-full h-14 px-6 bg-gray-50 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/10 transition-all font-bold text-text-main"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Category</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full h-14 px-6 bg-gray-50 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/10 transition-all font-bold text-text-main appearance-none cursor-pointer"
                    >
                       <option value="personal">Personal</option>
                       <option value="emi">EMI</option>
                       <option value="loan">Home Loan</option>
                       <option value="bill">Utility Bill</option>
                    </select>
                 </div>
              </div>

              <div className="pt-4 flex gap-3">
                 <button 
                   type="button"
                   onClick={() => setShowAddModal(false)}
                   className="flex-1 h-14 bg-gray-100 text-text-muted font-black rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
                 >
                    Cancel
                 </button>
                 <button 
                   type="submit"
                   className="flex-[2] h-14 bg-brand-gradient text-white font-black rounded-2xl shadow-lg hover:shadow-brand-primary/20 active:scale-95 transition-all"
                 >
                    Confirm Schedule
                 </button>
              </div>
           </form>
        </div>
      </Modal>
    </div>
  );
}

