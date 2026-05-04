"use client";

import React, { useState, useEffect } from "react";
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Clock, 
  UserPlus, 
  CreditCard, 
  Receipt,
  MoreVertical,
  Circle
} from "lucide-react";
import { toast } from "react-hot-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "settlement" | "invite" | "expense" | "system";
  timestamp: string;
  isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New Settlement Request",
    message: "Rahul requested ₹450 for the 'Pizza Night' split.",
    type: "settlement",
    timestamp: "2 mins ago",
    isRead: false
  },
  {
    id: "2",
    title: "Group Invitation",
    message: "Simran invited you to join 'Goa Trip 2024'.",
    type: "invite",
    timestamp: "1 hour ago",
    isRead: false
  },
  {
    id: "3",
    title: "Expense Added",
    message: "A new expense of ₹1,200 was added to 'Flatmates'.",
    type: "expense",
    timestamp: "3 hours ago",
    isRead: true
  },
  {
    id: "4",
    title: "Payment Received",
    message: "Amit settled his balance of ₹150 with you.",
    type: "settlement",
    timestamp: "Yesterday",
    isRead: true
  },
  {
    id: "5",
    title: "Security Update",
    message: "Your password was successfully updated via mobile verification.",
    type: "system",
    timestamp: "2 days ago",
    isRead: true
  }
];

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setNotifications(MOCK_NOTIFICATIONS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    toast.success("Marked as read");
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success("Notification deleted");
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success("Notifications cleared");
  };

  const filteredNotifications = notifications.filter(n => 
    filter === "all" ? true : !n.isRead
  );

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "settlement": return <CreditCard className="w-5 h-5 text-financial-success" />;
      case "invite": return <UserPlus className="w-5 h-5 text-blue-500" />;
      case "expense": return <Receipt className="w-5 h-5 text-brand-primary" />;
      default: return <Bell className="w-5 h-5 text-purple-500" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
           <div className="space-y-2">
             <div className="h-10 w-64 skeleton rounded-xl" />
             <div className="h-5 w-80 skeleton rounded-lg" />
           </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-24 w-full skeleton rounded-[2rem]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-text-main tracking-tight flex items-center gap-3">
            Notifications
            {notifications.filter(n => !n.isRead).length > 0 && (
              <span className="bg-brand-primary text-white text-xs font-black px-3 py-1 rounded-full animate-bounce">
                {notifications.filter(n => !n.isRead).length} New
              </span>
            )}
          </h1>
          <p className="text-text-muted font-medium">Messages, updates and activity alerts.</p>
        </div>

        <div className="flex items-center gap-3">
           <button 
             onClick={markAllRead}
             disabled={notifications.length === 0 || notifications.every(n => n.isRead)}
             className="px-6 h-12 bg-surface-main border border-border-main text-text-main font-bold rounded-2xl flex items-center gap-2 hover:bg-surface-main/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
           >
             <CheckCheck className="w-4 h-4" /> Mark all read
           </button>
           <button 
             onClick={clearAll}
             disabled={notifications.length === 0}
             className="px-6 h-12 bg-red-500/10 border border-red-500/20 text-red-500 font-bold rounded-2xl flex items-center gap-2 hover:bg-red-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
           >
             <Trash2 className="w-4 h-4" /> Clear All
           </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 p-1.5 bg-surface-main rounded-2xl w-fit border border-border-main">
         <button 
           onClick={() => setFilter("all")}
           className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${filter === "all" ? "bg-surface-card text-text-main shadow-sm" : "text-text-muted hover:text-text-main"}`}
         >
           All Activity
         </button>
         <button 
           onClick={() => setFilter("unread")}
           className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${filter === "unread" ? "bg-surface-card text-text-main shadow-sm" : "text-text-muted hover:text-text-main"}`}
         >
           Unread
         </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div 
              key={notif.id}
              className={`group bg-surface-card rounded-[2rem] p-6 border transition-all hover:shadow-md flex items-center gap-6 ${notif.isRead ? "border-border-main opacity-80" : "border-brand-primary/10 shadow-sm"}`}
            >
              {/* Type Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                notif.type === 'settlement' ? 'bg-financial-success/10' : 
                notif.type === 'invite' ? 'bg-blue-500/10' : 
                notif.type === 'expense' ? 'bg-orange-500/10' : 'bg-purple-500/10'
              }`}>
                {getTypeIcon(notif.type)}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                   {!notif.isRead && <Circle className="w-2 h-2 fill-brand-primary text-brand-primary" />}
                   <h3 className="font-black text-text-main text-lg">{notif.title}</h3>
                </div>
                <p className="text-text-muted font-medium text-sm leading-relaxed">{notif.message}</p>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-placeholder uppercase tracking-widest pt-1">
                   <Clock className="w-3 h-3" /> {notif.timestamp}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 {!notif.isRead && (
                   <button 
                     onClick={() => markAsRead(notif.id)}
                     className="p-3 bg-surface-main text-text-muted hover:bg-financial-success/10 hover:text-financial-success rounded-xl transition-all"
                     title="Mark as read"
                   >
                     <CheckCheck className="w-5 h-5" />
                   </button>
                 )}
                 <button 
                   onClick={() => deleteNotification(notif.id)}
                   className="p-3 bg-surface-main text-text-muted hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all"
                   title="Delete"
                 >
                   <Trash2 className="w-5 h-5" />
                 </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-surface-card rounded-[2.5rem] border border-dashed border-border-main p-20 text-center space-y-6">
            <div className="w-24 h-24 bg-surface-main rounded-[2rem] flex items-center justify-center mx-auto text-4xl grayscale opacity-50">
              📭
            </div>
            <div>
              <h3 className="text-xl font-black text-text-main">All clear!</h3>
              <p className="text-text-muted font-medium mt-2">No {filter === 'unread' ? 'unread' : ''} notifications at the moment.</p>
            </div>
            {filter === 'unread' && (
              <button 
                onClick={() => setFilter("all")}
                className="text-brand-primary font-bold hover:underline"
              >
                View past activity
              </button>
            )}
          </div>
        )}
      </div>

      {/* Subscription Card */}
      <div className="bg-slate-950 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group border border-white/5 shadow-2xl">
         <div className="absolute top-0 right-0 p-8 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
            <Bell className="w-40 h-40" />
         </div>
         <div className="relative z-10 max-w-xl space-y-6">
            <h2 className="text-3xl font-black">Stay on top of your bills</h2>
            <p className="text-white/60 font-medium leading-relaxed">
               Enable real-time push notifications so you never miss a split or a settlement request from your friends.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
               <button className="h-14 px-8 bg-brand-gradient text-white font-black rounded-2xl shadow-lg hover:shadow-brand-primary/20 active:scale-95 transition-all">
                  Enable Browser Alerts
               </button>
               <button className="h-14 px-8 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl border border-white/20 transition-all">
                  Notification Settings
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
