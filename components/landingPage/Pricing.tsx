"use client";

import Link from "next/link";

const freeFeatures = [
    "Unlimited Groups",
    "Up to 5 Members per Group",
    "Equal & Custom Split",
    "UPI Deep Links (GPay/PhonePe)",
    "WhatsApp Summary Share",
    "Basic Expense History (30 days)",
];

const proFeatures = [
    "Everything in Free",
    "Unlimited Members per Group",
    "AI Receipt Scanner",
    "Percentage & Share-based Split",
    "Full Expense History (Unlimited)",
    "CSV/PDF Export",
    "Advanced Analytics & Charts",
    "Recurring Expense Reminders",
    "Priority Support",
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-20 bg-white px-6">
            <div className="max-w-6xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl lg:text-4xl font-bold text-text-main mb-4">
                        Honest pricing. No tricks.
                    </h2>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Start free forever. Upgrade to Pro when you need advanced features.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                    {/* FREE PLAN */}
                    <div className="bg-surface-card rounded-2xl border border-gray-100 shadow-card p-8">
                        <div className="mb-8">
                            <p className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">Free Forever</p>
                            <h3 className="text-4xl font-extrabold text-text-main mb-1">
                                ₹0
                            </h3>
                            <p className="text-text-muted">No credit card required</p>
                        </div>

                        <Link
                            href="/signup"
                            className="w-full block text-center bg-surface-main border border-gray-200 text-text-main font-semibold py-3.5 px-4 rounded-xl hover:bg-gray-100 transition-colors mb-8"
                        >
                            Get started free
                        </Link>

                        <ul className="space-y-4">
                            {freeFeatures.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-0.5 w-5 h-5 rounded-full bg-financial-successBg flex items-center justify-center shrink-0">
                                        <svg className="w-3 h-3 text-financial-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span className="text-text-muted text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* PRO PLAN */}
                    <div className="relative bg-brand-primary rounded-2xl shadow-floating p-8 overflow-hidden text-white">
                        {/* Most Popular Badge */}
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                            MOST POPULAR
                        </div>

                        <div className="relative z-10 mb-8">
                            <p className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-2">DostBill Pro</p>
                            <div className="flex items-end gap-2 mb-1">
                                <h3 className="text-5xl font-extrabold text-white">
                                    ₹499
                                </h3>
                                <span className="text-lg font-semibold text-white/80 mb-1">/year</span>
                            </div>
                            <p className="text-sm text-white/80">
                                That's just ₹42/month
                            </p>
                        </div>

                        <Link
                            href="/signup"
                            className="relative z-10 w-full block text-center bg-white text-brand-primary font-bold py-3.5 px-4 rounded-xl hover:bg-gray-50 transition-all mb-8"
                        >
                            Start Pro — Free 7-day trial
                        </Link>

                        <ul className="relative z-10 space-y-3">
                            {proFeatures.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-0.5 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span className={`text-sm ${i === 0 ? "text-white font-semibold" : "text-white/90"}`}>
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Bottom trust note */}
                <p className="text-center text-sm text-text-muted mt-10">
                    🔒 Secure payments via Razorpay. Cancel anytime. No questions asked.
                </p>

            </div>
        </section>
    );
}