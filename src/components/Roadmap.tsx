import Link from 'next/link';
import LiquidButton from './LiquidButton';

export default function Roadmap() {
    return (
        <section className="w-full py-24 px-6 bg-brand-cream relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-20">
                    <div className="inline-block px-4 py-1.5 bg-brand-black/5 rounded-lg mb-6">
                        <span className="text-base font-medium text-brand-black">How We Work</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-black">
                        It's <span className="text-brand-red italic font-serif">Straightforward</span>
                    </h2>
                </div>

                {/* Steps Container with Relative Positioning for Line */}
                <div className="relative">
                    {/* Connecting Line (Hidden on mobile) */}
                    <div className="hidden md:block absolute top-[48px] left-0 right-0 -translate-y-1/2 z-0 pointer-events-none opacity-30">
                        <svg viewBox="0 0 800 100" fill="none" preserveAspectRatio="none" className="w-full h-[100px]">
                            <path d="M0,50 C150,80 250,20 400,50 C550,80 650,20 800,50" stroke="#222222" strokeWidth="2" strokeDasharray="8 8"></path>
                        </svg>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-10">

                        {/* Step 1 */}
                        <div className="group flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 gpu-accelerate">
                            <div className="relative mb-8">
                                <div className="w-24 h-24 rounded-3xl bg-brand-cream border border-brand-black/10 flex items-center justify-center text-brand-red shadow-lg relative z-20 transition-all duration-500 group-hover:border-brand-red/30 group-hover:shadow-brand-red/20 group-hover:scale-110 gpu-accelerate">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-brand-black mb-4">90-Day Roadmap</h3>
                            <p className="text-lg text-brand-gray leading-relaxed max-w-sm">
                                We audit your current position, analyze your market, and build a custom plan to reach your goals. Most of our partners see significant results within the first 90 days.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="group flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 delay-100 gpu-accelerate">
                            <div className="relative mb-8">
                                <div className="w-24 h-24 rounded-3xl bg-brand-cream border border-brand-black/10 flex items-center justify-center text-brand-red shadow-lg relative z-20 transition-all duration-500 group-hover:border-brand-red/30 group-hover:shadow-brand-red/20 group-hover:scale-110 gpu-accelerate">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-brand-black mb-4">We Handle Everything</h3>
                            <p className="text-lg text-brand-gray leading-relaxed max-w-sm">
                                Daily optimizations, content posting and technical fixes. We take care of the technical stuff so you can enjoy the results.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="group flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 delay-200 gpu-accelerate">
                            <div className="relative mb-8">
                                <div className="w-24 h-24 rounded-3xl bg-brand-cream border border-brand-black/10 flex items-center justify-center text-brand-red shadow-lg relative z-20 transition-all duration-500 group-hover:border-brand-red/30 group-hover:shadow-brand-red/20 group-hover:scale-110 gpu-accelerate">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-brand-black mb-4">Track Your Growth</h3>
                            <p className="text-lg text-brand-gray leading-relaxed max-w-sm">
                                You see exactly how much closer you are to your goals each week. We track the increase in revenue and engagement.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
