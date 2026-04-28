import Link from "next/link";

export default function CTABanner() {
    return (
        <section className="py-16 bg-brand-primary px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                    Your dosts are waiting.<br />
                    Stop the WhatsApp maths.
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                    Join thousands of Indians who've ditched spreadsheets and awkward payment reminders.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/signup"
                        className="w-full sm:w-auto bg-white text-brand-primary font-bold py-4 px-8 rounded-xl hover:bg-gray-50 transition-all text-lg shadow-lg"
                    >
                        Get Started Free
                    </Link>
                    <Link
                        href="#features"
                        className="w-full sm:w-auto bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/10 transition-all text-lg"
                    >
                        See how it works
                    </Link>
                </div>
            </div>
        </section>
    );
}
