const features = [
    {
        category: "Pricing",
        items: [
            { label: "Free Forever Plan", dostbill: true, splitwise: "Limited" },
            { label: "Pro Plan Price", dostbill: "₹499/year", splitwise: "₹3,300/year" },
            { label: "Free Daily Expense Limit", dostbill: "Unlimited", splitwise: "3 per day" },
        ],
    },
    {
        category: "Indian Market",
        items: [
            { label: "UPI Deep Links (GPay/PhonePe)", dostbill: true, splitwise: false },
            { label: "WhatsApp Summary Share", dostbill: true, splitwise: false },
            { label: "Indian Expense Categories (Kirana, Chai, Petrol)", dostbill: true, splitwise: false },
            { label: "Phone Number Login (OTP)", dostbill: true, splitwise: false },
        ],
    },
    {
        category: "Splitting",
        items: [
            { label: "Equal Split", dostbill: true, splitwise: true },
            { label: "Custom Amount Split", dostbill: true, splitwise: true },
            { label: "Percentage Split", dostbill: true, splitwise: "Pro only" },
            { label: "Split by Shares", dostbill: true, splitwise: "Pro only" },
            { label: "Exclude Member from Expense", dostbill: true, splitwise: true },
        ],
    },
    {
        category: "AI & Smart Features",
        items: [
            { label: "AI Receipt Scanner", dostbill: true, splitwise: false },
            { label: "Smart Group Types (Trip, Flat, Event)", dostbill: true, splitwise: false },
            { label: "Guest Join via Link (No Download)", dostbill: true, splitwise: false },
            { label: "Recurring Expense Reminders", dostbill: true, splitwise: "Pro only" },
        ],
    },
];

type CellValue = string | boolean;

function Cell({ value }: { value: CellValue }) {
    if (value === true) {
        return (
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-financial-successBg">
                <svg className="w-4 h-4 text-financial-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </span>
        );
    }
    if (value === false) {
        return (
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-financial-dangerBg">
                <svg className="w-4 h-4 text-financial-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
        );
    }
    // String value — e.g. "Pro only", "₹499/year", "3 per day"
    const isGood = value.includes("₹499") || value === "Unlimited";
    const isBad = value.includes("₹3,300") || value === "3 per day" || value === "Limited";
    return (
        <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${isGood
                    ? "bg-financial-successBg text-financial-success"
                    : isBad
                        ? "bg-financial-dangerBg text-financial-danger"
                        : "bg-gray-100 text-text-muted"
                }`}
        >
            {value}
        </span>
    );
}

export default function Comparison() {
    return (
        <section id="compare" className="py-20 bg-surface-main px-6">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-text-main mb-4">
                        Why DostBill over Splitwise?
                    </h2>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Splitwise charges ₹3,300/year and limits free users to 3 expenses per day. We don't.
                    </p>
                </div>

                {/* Comparison Table */}
                <div className="bg-surface-card rounded-2xl border border-gray-100 shadow-card overflow-hidden">

                    {/* Table Header */}
                    <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_160px_160px] bg-surface-main border-b border-gray-100 px-6 py-4 gap-4">
                        <div></div>
                        <div className="text-center">
                            <div className="inline-flex items-center gap-1.5 font-bold text-text-main">
                                <div className="w-6 h-6 bg-brand-gradient rounded flex items-center justify-center text-white text-xs font-bold">DB</div>
                                DostBill
                            </div>
                            <p className="text-xs text-financial-success font-semibold mt-1">₹499/year</p>
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-text-muted">Splitwise</p>
                            <p className="text-xs text-financial-danger font-semibold mt-1">₹3,300/year</p>
                        </div>
                    </div>

                    {/* Feature Rows */}
                    {features.map((group, gi) => (
                        <div key={gi}>
                            {/* Category Label */}
                            <div className="px-6 py-3 bg-brand-light border-b border-orange-100">
                                <p className="text-xs font-bold text-brand-primary uppercase tracking-wider">{group.category}</p>
                            </div>

                            {/* Feature Items */}
                            {group.items.map((item, fi) => (
                                <div
                                    key={fi}
                                    className={`grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_160px_160px] items-center px-6 py-4 gap-4 border-b border-gray-50 hover:bg-surface-main transition-colors ${fi === group.items.length - 1 ? "border-b-gray-100" : ""
                                        }`}
                                >
                                    <p className="text-sm font-medium text-text-main">{item.label}</p>
                                    <div className="flex justify-center">
                                        <Cell value={item.dostbill} />
                                    </div>
                                    <div className="flex justify-center">
                                        <Cell value={item.splitwise} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Bottom CTA Row */}
                    <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_160px_160px] items-center px-6 py-6 gap-4 bg-surface-main">
                        <p className="text-sm font-semibold text-text-main">Start today</p>
                        <div className="flex justify-center">
                            <a
                                href="/signup"
                                className="bg-brand-gradient text-white text-xs font-bold px-4 py-2 rounded-xl shadow-floating hover:opacity-90 transition-all whitespace-nowrap"
                            >
                                Try Free →
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <span className="text-xs text-text-muted font-medium">₹3,300/yr</span>
                        </div>
                    </div>

                </div>

                {/* Savings Callout */}
                <div className="mt-10 bg-brand-gradient rounded-2xl p-8 text-white text-center relative overflow-hidden">
                    <div className="absolute top-[-30%] right-[-5%] w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-30%] left-[-5%] w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <p className="relative z-10 text-sm font-semibold opacity-90 mb-2">THE BOTTOM LINE</p>
                    <h3 className="relative z-10 text-3xl lg:text-4xl font-extrabold mb-3">
                        Save ₹2,801 every year.
                    </h3>
                    <p className="relative z-10 text-lg opacity-90 mb-6 max-w-lg mx-auto">
                        DostBill Pro is <strong>6.6× cheaper</strong> than Splitwise Pro, with more features built specifically for India.
                    </p>
                    <a
                        href="/signup"
                        className="relative z-10 inline-block bg-white text-brand-primary font-bold py-3.5 px-8 rounded-xl hover:bg-brand-light transition-colors shadow-md"
                    >
                        Switch to DostBill — It's Free
                    </a>
                </div>

            </div>
        </section>
    );
}