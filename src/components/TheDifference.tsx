"use client";

import Link from 'next/link';
import LiquidButton from './LiquidButton';

export default function TheDifference() {
    return (
        <section className="w-full py-24 px-6 bg-brand-cream relative overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-block px-4 py-1.5 bg-brand-black/5 rounded-lg mb-6">
                        <span className="text-base font-medium text-brand-black">The Difference</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-black tracking-tight leading-[1.1]">
                        Why choose <span className="text-brand-red font-serif italic font-medium">AO Automations</span><br className="hidden md:block" /> over everyone else?
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">

                    {/* Other Agencies Card */}
                    <div className="bg-white/50 border border-brand-black/5 rounded-3xl p-8 md:p-10 flex flex-col">
                        <h3 className="text-2xl font-bold text-brand-black/60 mb-8 text-center">Other Agencies</h3>
                        <ul className="space-y-6 flex-1">
                            {[
                                "Promise results but no refund guarantee",
                                "Long-term contracts that lock you in",
                                "Generic optimization that barely moves the needle",
                                "Monthly retainers with no accountability",
                                "Disappear after taking your money"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-4 text-brand-gray/80">
                                    <div className="shrink-0 w-6 h-6 rounded-full bg-brand-gray/20 flex items-center justify-center mt-0.5">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 1L1 9M1 1L9 9" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span className="font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* AO Automations Card */}
                    <div className="bg-white border border-brand-black/5 rounded-3xl p-8 md:p-10 flex flex-col shadow-xl relative overflow-hidden transform md:-translate-y-4">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red/10 via-brand-red to-brand-red/10"></div>

                        <div className="flex items-center justify-center gap-3 mb-8">
                            {/* Small Logo or Icon if needed, using text for now to match style */}
                            <h3 className="text-2xl font-bold text-brand-black text-center">AO Automations</h3>
                        </div>

                        <ul className="space-y-6 flex-1">
                            {[
                                "Top 3 in 90 days guaranteed",
                                "No long-term contracts - pure performance",
                                "Proven system taking businesses to #1",
                                "We only win if you win - 100% risk free",
                                "Weekly updates so you always know where you stand"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-4 text-brand-black">
                                    <div className="shrink-0 w-6 h-6 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span className="font-medium text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Link href="/free-analysis">
                        <LiquidButton className="px-10 py-5 text-lg shadow-xl hover:shadow-2xl transition-all">
                            Get Your FREE Analysis
                        </LiquidButton>
                    </Link>
                </div>

            </div>
        </section>
    );
}
