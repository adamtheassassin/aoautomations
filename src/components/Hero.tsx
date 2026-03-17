"use client";
import Link from 'next/link';
import Script from 'next/script';
import LiquidButton from './LiquidButton';
import Marquee from './Marquee';
import LocationIndicator from './LocationIndicator';

export default function Hero() {
    return (
        <>
            <section className="w-full min-h-screen pt-32 md:pt-40 pb-12 relative overflow-hidden flex flex-col bg-white">
                {/* Background Decorative Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none gpu-accelerate"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-dark/5 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none gpu-accelerate"></div>

                <div className="w-full max-w-7xl mx-auto px-6 flex-grow flex flex-col justify-center">
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        wistia-player[media-id='sxfxma40q5']:not(:defined) { 
                            background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/sxfxma40q5/swatch'); 
                            display: block; 
                            filter: blur(5px); 
                            padding-top:56.25%; 
                        }`
                    }} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* Left Content */}
                        <div className="space-y-4 sm:space-y-8 relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left h-full justify-center">
                            <LocationIndicator />
                            <h1 className="text-4xl sm:text-6xl md:text-6xl font-bold leading-tight text-brand-black tracking-tight">
                                Top 3 Google Maps <br />
                                Rankings in 90 Days - <span className="text-brand-red italic font-serif">Guaranteed</span>
                            </h1>

                            {/* Mobile Feature Video */}
                             <div className="relative w-full flex justify-center items-center my-4 lg:hidden">
                                <div className="w-full h-auto rounded-xl shadow-2xl border border-black/5 overflow-hidden bg-black/5 aspect-video">
                                    <wistia-player suppressHydrationWarning media-id="sxfxma40q5" aspect="1.7777777777777777"></wistia-player>
                                </div>
                            </div>

                            <p className="text-base sm:text-xl md:text-2xl text-brand-gray leading-relaxed max-w-lg font-light">
                                We'll get your local business ranking in the <strong className="text-brand-black font-semibold">top 3 Google Maps results</strong> for your service area. If we don't, you don't pay.
                            </p>

                            <div className="w-full pt-4 flex flex-col sm:flex-row gap-4 items-center lg:items-start justify-center lg:justify-start pb-8 lg:pb-0">
                                <Link href="/free-analysis">
                                    <LiquidButton className="w-full sm:w-auto px-8 py-3 text-lg sm:px-10 sm:py-5 sm:text-xl font-semibold shadow-xl hover:shadow-2xl hover:shadow-brand-red/20 transition-all transform hover:-translate-y-1">
                                        Get The FREE Analysis
                                    </LiquidButton>
                                </Link>

                            </div>


                        </div>

                        {/* Right Content - Feature Video */}
                        <div className="relative w-full hidden lg:flex justify-center items-center -mt-8 md:-mt-12">
                            <div className="w-full h-auto rounded-xl shadow-2xl border border-black/5 overflow-hidden bg-black/5 aspect-video">
                                <wistia-player suppressHydrationWarning media-id="sxfxma40q5" aspect="1.7777777777777777"></wistia-player>
                            </div>
                        </div>

                        {/* Wistia Scripts */}
                        <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
                        <Script src="https://fast.wistia.com/embed/sxfxma40q5.js" strategy="afterInteractive" type="module" />

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
