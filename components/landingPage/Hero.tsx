import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-main leading-tight mb-6">
                            Split bills not,{" "}
                            <span className="text-brand-primary">Friendships.</span> no drama
                        </h1>

                        <p className="text-lg text-text-muted mb-8 max-w-xl mx-auto lg:mx-0">
                            Track group expenses, split bills fairly, and settle up instantly via UPI. Built for India. Free forever.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link
                                href="/signup"
                                className="w-full sm:w-auto bg-brand-primary hover:bg-brand-secondary text-white font-semibold py-3.5 px-8 rounded-xl transition-all text-base"
                            >
                                Get Started
                            </Link>
                            <Link
                                href="#features"
                                className="w-full sm:w-auto bg-white text-text-main border border-gray-300 font-semibold py-3.5 px-8 rounded-xl hover:bg-gray-50 transition-all text-base"
                            >
                                Learn more
                            </Link>
                        </div>
                    </div>

                    {/* Right - Product Screenshots */}
                    <div className="relative hidden lg:block">
                        <div className="relative w-full h-[500px] flex items-center justify-center">
                            {/* Placeholder for app screenshots - you can replace with actual images */}
                            <div className="absolute right-0 w-[280px] h-[560px] bg-linear-to-br from-orange-100 to-orange-50 rounded-3xl shadow-2xl border-8 border-white flex items-center justify-center">
                                <div className="text-center p-8">
                                    <div className="w-16 h-16 bg-brand-primary rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                                        DB
                                    </div>
                                    <p className="text-sm text-text-muted">App Screenshot</p>
                                </div>
                            </div>
                            <div className="absolute left-0 top-12 w-[240px] h-auto bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold">Group Expenses</span>
                                        <span className="text-xs text-brand-primary">View all</span>
                                    </div>
                                    <div className="space-y-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                                <div className="w-8 h-8 bg-orange-100 rounded-full"></div>
                                                <div className="flex-1">
                                                    <div className="h-2 bg-gray-200 rounded w-20 mb-1"></div>
                                                    <div className="h-2 bg-gray-100 rounded w-16"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}