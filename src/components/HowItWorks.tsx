import Link from 'next/link';
import LiquidButton from './LiquidButton';

export default function HowItWorks() {
    return (
        <section className="w-full py-20 px-6 bg-brand-cream relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-black tracking-tight">
                        How we get you <span className="text-brand-red italic font-serif">there</span>
                    </h2>
                    <p className="text-xl text-brand-gray max-w-2xl mx-auto">
                        We take care of the tech and details, so you can focus on your work while your business brings in more happy customers every single day.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {/* Feature 1: Google Business Profile */}
                    <div className="group relative bg-brand-black p-8 rounded-3xl shadow-xl border border-white/5 hover:border-brand-red/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden text-center flex flex-col items-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-brand-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                        <div className="mb-12 relative w-48 h-48 flex items-center justify-center">
                            <img
                                src="/icons_&_images/Photobooth removed BG.webp"
                                alt="Google Business Profile Optimization"
                                className="w-full h-full object-contain drop-shadow-2xl scale-175"
                            />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-red transition-colors duration-300">
                            Complete Google Business
                            <br />Profile Optimization
                        </h3>

                        <p className="text-gray-400 leading-relaxed">
                            We rebuild your entire Google Business Profile from the ground up to match exactly what Google wants to see.
                        </p>
                    </div>

                    {/* Feature 2: High-Status Website */}
                    <div className="group relative bg-brand-black p-8 rounded-3xl shadow-xl border border-white/5 hover:border-brand-red/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden text-center flex flex-col items-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-brand-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                        <div className="mb-8 relative w-48 h-48 flex items-center justify-center">
                            {/* Placeholder for Calculator/Notepad Icon - Scaled up SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-white group-hover:text-brand-red transition-colors duration-300 scale-150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="12" y1="18" x2="12" y2="18.01" />
                                <line x1="8" y1="18" x2="8" y2="18.01" />
                                <line x1="16" y1="18" x2="16" y2="18.01" />
                                <line x1="8" y1="14" x2="8" y2="14.01" />
                                <line x1="12" y1="14" x2="12" y2="14.01" />
                                <line x1="16" y1="14" x2="16" y2="14.01" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-red transition-colors duration-300">
                            High-Status Business
                            <br />Website
                        </h3>

                        <p className="text-gray-400 leading-relaxed">
                            We make your message resonate with your ideal clients, and support it with a design that aids your copy and builds instant trust.
                        </p>
                    </div>

                    {/* Feature 3: Local Authority Building */}
                    <div className="group relative bg-brand-black p-8 rounded-3xl shadow-xl border border-white/5 hover:border-brand-red/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden text-center flex flex-col items-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-brand-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                        <div className="mb-8 relative w-48 h-48 flex items-center justify-center">
                            {/* Placeholder for Funnel Icon - Scaled up SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-white group-hover:text-brand-red transition-colors duration-300 scale-150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                                <circle cx="12" cy="12" r="1.5" fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                <circle cx="12" cy="7" r="1" fill="currentColor" />
                                <circle cx="7" cy="5" r="1" fill="currentColor" />
                                <circle cx="17" cy="5" r="1" fill="currentColor" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-red transition-colors duration-300">
                            Local Authority Building
                        </h3>

                        <p className="text-gray-400 leading-relaxed">
                            We establish your business as the dominant local authority through citations, content, and signals Google actually cares about.
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <LiquidButton className="px-10 py-4 text-lg shadow-xl">
                        Get Your FREE Analysis
                    </LiquidButton>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl -z-0 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-dark/5 rounded-full blur-3xl -z-0 translate-x-1/3 translate-y-1/3"></div>
        </section>
    );
}
