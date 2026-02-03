import LiquidButton from './LiquidButton';
import Marquee from './Marquee';

export default function Hero() {
    return (
        <section className="w-full min-h-screen flex items-center justify-center pt-24 pb-12 md:pt-32 px-6 relative overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-dark/5 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            <div className="w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div className="space-y-8 relative z-10">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-brand-red/10 text-brand-red font-semibold text-sm tracking-wide mb-2 border border-brand-red/20">
                            🚀 Guaranteed Results
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] text-brand-black tracking-tight">
                            Top 3 Maps <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-dark">
                                Rankings
                            </span> in 90 Days.
                        </h1>

                        <p className="text-xl md:text-2xl text-brand-gray leading-relaxed max-w-lg font-light">
                            We'll get your UK local business ranking in the <strong className="text-brand-black font-semibold">top 3 Google Maps results</strong> for your service area. If we don't, you don't pay.
                        </p>

                        <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <LiquidButton className="px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-brand-red/20 transition-all transform hover:-translate-y-1">
                                Get The FREE Analysis
                            </LiquidButton>
                            <span className="text-sm text-brand-gray/60 italic mt-2 sm:mt-0 px-4">
                                No credit card required.
                            </span>
                        </div>

                        {/* Trust Indicator */}
                        <div className="flex items-center gap-2 pt-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-brand-cream"></div>
                                ))}
                            </div>
                            <span className="text-sm font-medium text-brand-black pl-2">Trusted by 50+ UK Businesses</span>
                        </div>
                    </div>

                    {/* Right Content - Video Placeholder */}
                    <div className="relative group cursor-pointer perspective-1000">
                        {/* Decorative blur/glow behind */}
                        <div className="absolute -inset-2 bg-gradient-to-tr from-brand-red via-brand-dark to-brand-red rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>

                        <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-2xl aspect-video ring-1 ring-black/5 transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:-rotate-1">
                            {/* Fake Video Content */}
                            <div className="w-full h-full bg-neutral-100 flex items-center justify-center relative overflow-hidden">
                                {/* Abstract Background for Video */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-cream to-white opacity-80"></div>

                                {/* UI Mockup element inside video */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white shadow-lg rounded-lg border border-gray-100 flex flex-col p-4">
                                    <div className="h-4 w-1/3 bg-gray-200 rounded mb-4"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-2 w-full bg-gray-100 rounded"></div>
                                        <div className="h-2 w-5/6 bg-gray-100 rounded"></div>
                                        <div className="h-2 w-4/6 bg-gray-100 rounded"></div>
                                    </div>
                                    <div className="mt-auto flex gap-2">
                                        <div className="h-8 w-8 rounded-full bg-brand-red/20"></div>
                                        <div className="h-8 w-24 rounded bg-gray-100"></div>
                                    </div>
                                </div>

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <div className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border border-white/50">
                                        <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[22px] border-l-brand-red border-b-[12px] border-b-transparent ml-2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Social Proof / Logos */}
                <div className="mt-32 border-t border-brand-black/5 pt-12">
                    <p className="text-center text-sm font-semibold text-brand-gray/60 uppercase tracking-widest mb-10">Powering Leading Local Businesses</p>
                    <Marquee />
                </div>
            </div>
        </section>
    );
}
