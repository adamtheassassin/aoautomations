import LiquidButton from './LiquidButton';
import Marquee from './Marquee';

export default function Hero() {
    return (
        <>
            <section className="w-full min-h-screen pt-28 md:pt-40 pb-20 relative overflow-hidden flex flex-col">
                {/* Background Decorative Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none gpu-accelerate"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-dark/5 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none gpu-accelerate"></div>

                <div className="w-full max-w-7xl mx-auto px-6 flex-grow flex flex-col justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left Content */}
                        <div className="space-y-8 relative z-10">
                            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] text-brand-black tracking-tight">
                                Top 3 Google Maps <br />
                                Rankings in 90 Days - <span className="text-brand-red italic font-serif">Guaranteed</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-brand-gray leading-relaxed max-w-lg font-light">
                                We'll get your local business ranking in the <strong className="text-brand-black font-semibold">top 3 Google Maps results</strong> for your service area. If we don't, you don't pay.
                            </p>

                            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                <LiquidButton className="px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-brand-red/20 transition-all transform hover:-translate-y-1">
                                    Get The FREE Analysis
                                </LiquidButton>

                            </div>


                        </div>

                        {/* Right Content - Video Placeholder */}
                        <div className="relative group cursor-pointer perspective-1000">
                            {/* Decorative blur/glow behind */}
                            <div className="absolute -inset-2 bg-gradient-to-tr from-brand-red via-brand-dark to-brand-red rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse-slow gpu-accelerate"></div>

                            <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-2xl aspect-video ring-1 ring-black/5 transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:-rotate-1 gpu-accelerate">
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
                                        <div className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border border-white/50 gpu-accelerate">
                                            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[22px] border-l-brand-red border-b-[12px] border-b-transparent ml-2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Social Proof / Logos - Moved back into Hero for visibility */}
                <div className="w-full mt-auto pt-16 pb-8 relative z-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <p className="text-center text-sm font-semibold text-brand-black/60 uppercase tracking-widest mb-10">Just a few of the businesses we work with</p>
                        <Marquee />
                    </div>
                </div>
            </section>
        </>
    );
}
