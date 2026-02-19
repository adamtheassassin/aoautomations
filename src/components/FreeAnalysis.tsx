"use client";

import Link from 'next/link';
import LiquidButton from './LiquidButton';

export default function FreeAnalysis() {
    return (
        <section className="w-full py-24 px-6 bg-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="relative bg-white rounded-[2rem] p-8 md:p-16 text-center shadow-2xl overflow-hidden gpu-accelerate ring-1 ring-brand-black/5 group hover:-translate-y-1 transition-transform duration-500">
                    {/* Background Gradient/Sheen */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-cream/50 to-transparent pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red/10 via-brand-red/40 to-brand-red/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 gpu-accelerate"></div>

                    {/* Icon Container */}
                    <div className="relative z-10 mx-auto w-20 h-20 bg-black rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-black/10 transform rotate-3 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105 gpu-accelerate">
                        {/* Logo - White filter for black background */}
                        <img
                            src="/icons_&_images/Client Logos/ao-icon.svg"
                            alt="AO Automations"
                            className="w-10 h-10 object-contain brightness-0 invert"
                        />
                    </div>

                    {/* Pill Label */}
                    <div className="relative z-10 inline-block px-4 py-1.5 bg-brand-black/5 rounded-lg mb-8 backdrop-blur-sm">
                        <span className="text-base font-medium text-brand-black">Free stuff</span>
                    </div>

                    {/* Headline */}
                    <h2 className="relative z-10 text-4xl md:text-6xl font-bold text-brand-black tracking-tight mb-8 leading-[1.1]">
                        Get A <span className="font-serif italic font-medium text-brand-red drop-shadow-sm">Free Analysis</span><br />Right Here
                    </h2>

                    {/* Body Text */}
                    <div className="relative z-10 max-w-2xl mx-auto mb-10 space-y-6">
                        <p className="text-lg md:text-xl text-brand-gray leading-relaxed font-light">
                            Click the button below to enter your business details. We will then go ahead and record a 5-min video going over how we'll get your business into the top 3 within 90 days.
                        </p>
                        <p className="text-brand-gray/60 text-base font-medium uppercase tracking-wider">
                            The video doesn't cost you anything
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="relative z-10">
                        <Link href="/free-analysis">
                            <LiquidButton className="px-12 py-5 text-lg shadow-xl hover:shadow-2xl transition-all">
                                Get The FREE Analysis
                            </LiquidButton>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
