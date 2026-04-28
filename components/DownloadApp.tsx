import Image from "next/image";

export default function DownloadApp() {
    return (
        <section className="py-20 bg-white px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Content */}
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-text-main mb-4">
                            Get the app. Split on the go.
                        </h2>
                        <p className="text-lg text-text-muted mb-8">
                            Download DostBill for iOS and Android. Track expenses, split bills, and settle up from anywhere.
                        </p>

                        {/* Download Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Google Play Store */}
                            <a
                                href="#"
                                className="inline-flex items-center gap-3 bg-black text-white px-6 py-3.5 rounded-xl hover:bg-gray-800 transition-all group"
                            >
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-xs opacity-80">GET IT ON</div>
                                    <div className="text-base font-semibold">Google Play</div>
                                </div>
                            </a>

                            {/* Apple App Store */}
                            <a
                                href="#"
                                className="inline-flex items-center gap-3 bg-black text-white px-6 py-3.5 rounded-xl hover:bg-gray-800 transition-all group"
                            >
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-xs opacity-80">Download on the</div>
                                    <div className="text-base font-semibold">App Store</div>
                                </div>
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 mt-8 pt-8 border-t border-gray-200">
                            <div>
                                <div className="text-2xl font-bold text-text-main">4.8★</div>
                                <div className="text-sm text-text-muted">App Rating</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-text-main">50k+</div>
                                <div className="text-sm text-text-muted">Downloads</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-text-main">10MB</div>
                                <div className="text-sm text-text-muted">App Size</div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Phone Mockup */}
                    <div className="relative hidden lg:flex justify-center items-center">
                        <div className="relative">
                            {/* Phone Frame */}
                            <div className="w-[280px] h-[560px] bg-linear-to-br from-orange-100 to-orange-50 rounded-[3rem] shadow-2xl border-8 border-gray-900 relative overflow-hidden">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
                                
                                {/* Screen Content */}
                                <div className="absolute inset-2 bg-white rounded-[2.5rem] overflow-hidden">
                                    <div className="p-6 pt-8">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold">
                                                DB
                                            </div>
                                            <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                                        </div>
                                        
                                        <h3 className="text-lg font-bold text-text-main mb-4">Your Groups</h3>
                                        
                                        {/* Group Cards */}
                                        <div className="space-y-3">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 bg-brand-primary rounded-full"></div>
                                                            <div className="h-3 bg-gray-300 rounded w-20"></div>
                                                        </div>
                                                        <div className="h-3 bg-green-200 rounded w-12"></div>
                                                    </div>
                                                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Floating Elements */}
                            <div className="absolute -right-4 top-20 bg-white rounded-xl shadow-xl p-3 border border-gray-100">
                                <div className="text-xs font-semibold text-brand-primary">₹2,450</div>
                                <div className="text-xs text-text-muted">You owe</div>
                            </div>
                            
                            <div className="absolute -left-4 bottom-32 bg-white rounded-xl shadow-xl p-3 border border-gray-100">
                                <div className="text-xs font-semibold text-green-600">₹1,200</div>
                                <div className="text-xs text-text-muted">You get back</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
