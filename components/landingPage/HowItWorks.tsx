export default function HowItWorks() {
    const steps = [
        {
            number: "1",
            icon: "👥",
            title: "Create a group",
            description: "Add your friends, roommates, or travel buddies to a group in seconds."
        },
        {
            number: "2",
            icon: "📸",
            title: "Add expenses",
            description: "Snap a receipt or manually enter expenses. Split equally or customize amounts."
        },
        {
            number: "3",
            icon: "💸",
            title: "Track balances",
            description: "See who owes what at a glance. DostBill calculates everything automatically."
        },
        {
            number: "4",
            icon: "✅",
            title: "Settle up via UPI",
            description: "One tap to send payment links. No more awkward reminders or manual transfers."
        }
    ];

    return (
        <section className="py-20 bg-surface-main px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <h2 className="text-3xl lg:text-4xl font-bold text-text-main mb-4">
                        Settle up in 4 steps
                    </h2>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        From creating a group to settling debts, DostBill makes it simple.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="relative mb-6">
                                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-lg">
                                    {step.number}
                                </div>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-2xl">
                                    {step.icon}
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-text-main mb-2 mt-4">
                                {step.title}
                            </h3>
                            <p className="text-sm text-text-muted leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
