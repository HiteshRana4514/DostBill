export default function Stats() {
    const stats = [
        { value: "50k+", label: "Happy users" },
        { value: "₹25Cr+", label: "Money settled" },
        { value: "4.8★", label: "App rating" },
        { value: "10 Lakh+", label: "Expenses tracked" }
    ];

    return (
        <section className="py-12 bg-surface-main px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-text-muted font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
