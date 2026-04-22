"use client";

import { useCurrency } from '@/context/CurrencyContext';
import LiquidButton from './LiquidButton';
import Link from 'next/link';

export default function Pricing() {
    const { currency, symbol, isLoading } = useCurrency();

    // Default prices are USD
    const pricing = {
        minimum: {
            usd: 300,
            zar: 3250
        },
        monthly: {
            usd: 400,
            zar: 4250
        },
        quarterly: {
            usd: 1000,
            zar: 11000
        }
    };

    const isZA = currency === 'ZAR';
    const minimumPrice = isZA ? pricing.minimum.zar : pricing.minimum.usd;
    const monthlyPrice = isZA ? pricing.monthly.zar : pricing.monthly.usd;
    const quarterlyPrice = isZA ? pricing.quarterly.zar : pricing.quarterly.usd;

    return (
        <section id="pricing" className="w-full py-24 px-6 bg-white relative overflow-hidden">
            {/* Background Gradient/Sheen */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-brand-cream/50 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-block px-4 py-1.5 bg-brand-black/5 rounded-lg mb-6">
                        <span className="text-sm font-bold uppercase tracking-widest text-brand-black/70">Pricing</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-black tracking-tight leading-[1.1]">
                        Get More <span className="font-serif italic font-bold text-brand-green">Clients</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Minimum Plan */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-brand-black/5 flex flex-col h-full transform transition-transform duration-300 hover:-translate-y-2">
                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 bg-brand-black/5 rounded-md text-sm font-bold uppercase tracking-widest text-brand-black mb-6">Minimum</span>
                            <div className="flex items-end gap-2 mb-4">
                                <span className="text-5xl font-bold text-brand-black leading-none">{symbol}{isLoading ? "..." : minimumPrice.toLocaleString('en-US')}</span>
                                <span className="text-brand-gray/60 font-medium mb-1">/ Month</span>
                            </div>
                            <p className="text-brand-black font-semibold text-lg">First page on Google within 90 days.</p>
                            <p className="text-brand-gray/80 text-sm mt-1 font-medium">*If first page is not achieved in 90 days, we work for free.</p>
                        </div>

                        <div className="bg-[#fff3cd] text-[#856404] rounded-xl px-4 py-3 text-center font-bold text-sm mb-8">
                            Visible on 25% of search results.
                        </div>

                        <div className="space-y-4 mb-10 flex-1">
                            {['Full Competitor\'s Analysis', 'Updates Every Two Weeks', 'Money-Back-Guarantee', 'Ranking For Main Search-Term', 'Full Website Optimization', 'High Quality Backlinks'].map((feature) => (
                                <div key={feature} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-brand-black/20 shrink-0"></div>
                                    <span className="text-sm text-brand-black/70 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/free-analysis" className="w-full mt-auto">
                            <LiquidButton className="w-full py-4 text-base font-bold shadow-lg hover:shadow-brand-green/20 transition-all bg-brand-black text-white hover:bg-brand-black/90">
                                Get Started
                            </LiquidButton>
                        </Link>
                    </div>

                    {/* Standard Plan (Monthly) */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-brand-black/5 flex flex-col h-full transform transition-transform duration-300 hover:-translate-y-2">
                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 bg-brand-black/5 rounded-md text-sm font-bold uppercase tracking-widest text-brand-black mb-6">Standard</span>
                            <div className="flex items-end gap-2 mb-4">
                                <span className="text-5xl font-bold text-brand-black leading-none">{symbol}{isLoading ? "..." : monthlyPrice.toLocaleString('en-US')}</span>
                                <span className="text-brand-gray/60 font-medium mb-1">/ Month</span>
                            </div>
                            <p className="text-brand-black font-semibold text-lg">Top 3 on Google within 90 days.</p>
                            <p className="text-brand-gray/80 text-sm mt-1 font-medium">*If top 3 is not achieved in 90 days, we work for free.</p>
                        </div>

                        <div className="bg-[#e4f5e7] text-[#1a7a2e] rounded-xl px-4 py-3 text-center font-bold text-sm mb-8">
                            Visible on 75%+ of search results.
                        </div>

                        <div className="space-y-4 mb-10 flex-1">
                            {['Full Competitor\'s Analysis', 'Updates Every Two Weeks', 'Money-Back-Guarantee', 'Ranking For Main Search-Term', 'Full Website Optimization', 'High Quality Backlinks'].map((feature) => (
                                <div key={feature} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-brand-black/20 shrink-0"></div>
                                    <span className="text-sm text-brand-black/70 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/free-analysis" className="w-full mt-auto">
                            <LiquidButton className="w-full py-4 text-base font-bold shadow-lg hover:shadow-brand-green/20 transition-all bg-brand-black text-white hover:bg-brand-black/90">
                                Get Started
                            </LiquidButton>
                        </Link>
                    </div>

                    {/* Best Plan (Quarterly) */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-brand-green flex flex-col h-full transform transition-transform duration-300 hover:-translate-y-2 relative">
                        {/* Badge */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-green text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                            Save {symbol}{isZA ? '1,750' : '200'}
                        </div>

                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 bg-brand-black/5 rounded-md text-sm font-bold uppercase tracking-widest text-brand-black mb-6">Best</span>
                            <div className="flex items-end gap-2 mb-4">
                                <span className="text-5xl font-bold text-brand-black leading-none">{symbol}{isLoading ? "..." : quarterlyPrice.toLocaleString('en-US')}</span>
                                <span className="text-brand-gray/60 font-medium mb-1">/ Quarter</span>
                            </div>
                            <p className="text-brand-black font-semibold text-lg">Top 3 on Google within 90 days.</p>
                            <p className="text-brand-gray/80 text-sm mt-1 font-medium">*If top 3 is not achieved in 90 days, we work for free.</p>
                        </div>

                        <div className="bg-[#e4f5e7] text-[#1a7a2e] rounded-xl px-4 py-3 text-center font-bold text-sm mb-8">
                            Visible on 75%+ of search results.
                        </div>

                        <div className="space-y-4 mb-10 flex-1">
                            {['Full Competitor\'s Analysis', 'Updates Every Two Weeks', 'Money-Back-Guarantee', 'Ranking For Main Search-Term', 'Full Website Optimization', 'High Quality Backlinks'].map((feature) => (
                                <div key={feature} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-brand-black/20 shrink-0"></div>
                                    <span className="text-sm text-brand-black/70 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/free-analysis" className="w-full mt-auto">
                            <LiquidButton className="w-full py-4 text-base font-bold shadow-lg hover:shadow-brand-green/20 transition-all">
                                Get Started
                            </LiquidButton>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
