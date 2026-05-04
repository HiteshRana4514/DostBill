"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Settings, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  IndianRupee, 
  DollarSign, 
  Smartphone,
  Check,
  Languages,
  Monitor
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useTheme } from "next-themes";

export default function PreferencesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState({
    theme: "light",
    currency: "INR",
    language: "English",
    notifications: {
      email: true,
      whatsapp: true,
      push: true
    }
  });

  const { setTheme } = useTheme();

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;

      if (user?.user_metadata?.preferences) {
        setPreferences(user.user_metadata.preferences);
        if (user.user_metadata.preferences.theme) {
          setTheme(user.user_metadata.preferences.theme);
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch preferences");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedPrefs = preferences) => {
    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { preferences: updatedPrefs }
      });
      if (error) throw error;
      toast.success("Preferences saved!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  const toggleNotification = (key: keyof typeof preferences.notifications) => {
    const updated = {
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [key]: !preferences.notifications[key]
      }
    };
    setPreferences(updated);
    handleSave(updated); // Save immediately for toggles
  };

  const setPreference = (key: string, value: any) => {
    const updated = { ...preferences, [key]: value };
    setPreferences(updated);
    if (key === "theme") {
      setTheme(value);
    }
    handleSave(updated);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <div className="h-10 w-64 skeleton rounded-xl" />
          <div className="h-5 w-80 skeleton rounded-lg" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[300px] skeleton rounded-[2.5rem]" />
          <div className="h-[300px] skeleton rounded-[2.5rem]" />
          <div className="h-[300px] skeleton rounded-[2.5rem]" />
          <div className="h-[300px] skeleton rounded-[2.5rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-text-main tracking-tight">App Preferences</h1>
        <p className="text-text-muted font-medium">Customize your DostBill experience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Appearance Section */}
        <div className="bg-surface-card rounded-[2.5rem] p-8 border border-border-main shadow-sm space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-500">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-text-main">Appearance</h3>
              <p className="text-xs text-text-muted font-medium">Choose how DostBill looks to you.</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { id: "light", label: "Light", icon: Sun },
              { id: "dark", label: "Dark", icon: Moon },
              { id: "system", label: "System", icon: Settings }
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => setPreference("theme", theme.id)}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                  preferences.theme === theme.id 
                  ? "border-brand-primary bg-brand-light/20 text-brand-primary" 
                  : "border-border-main hover:border-brand-primary/20 bg-surface-main/50"
                }`}
              >
                <theme.icon className="w-5 h-5" />
                <span className="text-xs font-bold">{theme.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Currency Section */}
        <div className="bg-surface-card rounded-[2.5rem] p-8 border border-border-main shadow-sm space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-600">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-text-main">Regional & Currency</h3>
              <p className="text-xs text-text-muted font-medium">Set your primary currency and language.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Preferred Currency</label>
              <div className="flex gap-4">
                {[
                  { id: "INR", label: "Indian Rupee", symbol: "₹" },
                  { id: "USD", label: "US Dollar", symbol: "$" }
                ].map((cur) => (
                  <button
                    key={cur.id}
                    onClick={() => setPreference("currency", cur.id)}
                    className={`flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl border-2 transition-all font-bold ${
                      preferences.currency === cur.id 
                      ? "border-brand-primary bg-brand-light/20 text-brand-primary" 
                      : "border-border-main hover:border-brand-primary/20 bg-surface-main/50 text-text-muted"
                    }`}
                  >
                    <span className="text-xl">{cur.symbol}</span>
                    <span className="text-xs">{cur.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Language</label>
              <div className="relative group">
                <Languages className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-placeholder group-focus-within:text-brand-primary transition-colors" />
                <select 
                  value={preferences.language}
                  onChange={(e) => setPreference("language", e.target.value)}
                  className="w-full h-14 pl-12 pr-4 bg-surface-main/50 border-2 border-transparent rounded-2xl outline-none focus:border-brand-primary/20 focus:bg-surface-card transition-all font-bold text-text-main appearance-none cursor-pointer"
                >
                  <option value="English">English (Default)</option>
                  <option value="Hindi">Hindi (Beta)</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-surface-card rounded-[2.5rem] p-8 border border-border-main shadow-sm space-y-8 lg:col-span-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-500">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-text-main">Notification Settings</h3>
              <p className="text-xs text-text-muted font-medium">Control how and when you receive updates.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: "email", label: "Email Updates", desc: "Weekly summaries & receipts", icon: Globe },
              { id: "whatsapp", label: "WhatsApp Alerts", desc: "Real-time settlement alerts", icon: Smartphone },
              { id: "push", label: "Push Notifications", desc: "App notifications & reminders", icon: Bell }
            ].map((item) => (
              <div 
                key={item.id}
                className="p-6 bg-surface-main/50 rounded-3xl border border-border-main flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-surface-card rounded-xl shadow-sm flex items-center justify-center text-text-muted">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main text-sm">{item.label}</h4>
                    <p className="text-[10px] text-text-muted font-medium mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                <button 
                  onClick={() => toggleNotification(item.id as any)}
                  className={`w-full h-12 rounded-xl flex items-center justify-center gap-2 transition-all font-bold text-xs ${
                    preferences.notifications[item.id as keyof typeof preferences.notifications]
                    ? "bg-text-main text-surface-card"
                    : "bg-surface-card text-text-muted border border-border-main"
                  }`}
                >
                  {preferences.notifications[item.id as keyof typeof preferences.notifications] ? (
                    <>
                      <Check className="w-4 h-4" /> Enabled
                    </>
                  ) : "Disabled"}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Persistence Note */}
      <div className="bg-brand-light/30 border border-brand-primary/10 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-surface-card rounded-2xl flex items-center justify-center shadow-sm text-brand-primary grow-0 shrink-0">
             <Settings className="w-6 h-6" />
          </div>
          <div>
            <p className="text-text-main font-black">Changes are saved automatically</p>
            <p className="text-text-muted text-xs font-medium mt-1">Your preferences are synced across all your devices.</p>
          </div>
        </div>
        {saving && (
           <div className="flex items-center gap-2 text-brand-primary px-4 py-2 bg-surface-card rounded-full shadow-sm animate-pulse">
              <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce"></div>
              <span className="text-xs font-bold">Syncing choices...</span>
           </div>
        )}
      </div>
    </div>
  );
}
