export default function Features() {
    const features = [
        {
            icon: "📱",
            title: "Track group expenses",
            description: "Create groups for trips, flatmates, or events. Add expenses and split them fairly among members."
        },
        {
            icon: "💰",
            title: "Multiple split options",
            description: "Split equally, by percentage, by shares, or enter exact amounts. Flexible for any scenario."
        },
        {
            icon: "⚡",
            title: "Instant UPI settlements",
            description: "Settle debts with 1-click UPI links for PhonePe, GPay, and Paytm. No manual copying needed."
        },
        {
            icon: "🤖",
            title: "AI receipt scanning",
            description: "Snap a photo of any bill. Our AI extracts items, prices, and automatically splits them."
        },
        {
            icon: "📊",
            title: "Expense analytics",
            description: "See spending patterns, category breakdowns, and who owes what at a glance."
        },
        {
            icon: "🔔",
            title: "Smart reminders",
            description: "Get notified about pending settlements and recurring expenses. Never forget to settle up."
        }
    ];

    return (
        <section id="features" className="py-20 bg-white px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <h2 className="text-3xl lg:text-4xl font-bold text-text-main mb-4">Everything your friend group needs</h2>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        All the tools to track expenses, split bills fairly, and settle up instantly.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feat, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-brand-primary hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-2xl mb-4">
                                {feat.icon}
                            </div>
                            <h3 className="text-lg font-bold text-text-main mb-2">{feat.title}</h3>
                            <p className="text-sm text-text-muted leading-relaxed">
                                {feat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}