"use client";

import { useCurrency } from '@/context/CurrencyContext';
import LiquidButton from './LiquidButton';
import Link from 'next/link';

export default function Pricing() {
    const { currency, symbol, isLoading } = useCurrency();

    // Default prices are USD
    const pricing = {
        monthly: {
            usd: 400,
            zar: 4250
        },
        quarterly: {
            usd: 1100,
            zar: 11000
        }
    };

    const isZA = currency === 'ZAR';
    const monthlyPrice = isZA ? pricing.monthly.zar : pricing.monthly.usd;
    const quarterlyPrice = isZA ? pricing.quarterly.zar : pricing.quarterly.usd;

    return (
        <section id="pricing" className="w-full py-24 px-6 bg-brand-cream relative">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-block px-4 py-1.5 bg-brand-black/5 rounded-lg mb-6">
                        <span className="text-sm font-bold uppercase tracking-widest text-brand-black/70">Pricing</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-black tracking-tight leading-[1.1]">
                        Get More <span className="font-serif italic font-medium text-brand-red">Clients</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Monthly Plan */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-brand-black/5 flex flex-col h-full transform transition-transform duration-300 hover:-translate-y-2">
                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 bg-brand-black/5 rounded-md text-sm font-semibold text-brand-black mb-6">Monthly Pricing</span>
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
                            <LiquidButton className="w-full py-4 text-base font-bold shadow-lg hover:shadow-brand-red/20 transition-all bg-brand-black text-white hover:bg-brand-black/90">
                                Get Started
                            </LiquidButton>
                        </Link>
                    </div>

                    {/* Quarterly Plan */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-brand-red flex flex-col h-full transform transition-transform duration-300 hover:-translate-y-2 relative">
                        {/* Badge */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-red text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                            Save {symbol}{isZA ? '2,000' : '100'}
                        </div>

                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 bg-brand-black/5 rounded-md text-sm font-semibold text-brand-black mb-6">Quarterly Pricing</span>
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
                            <LiquidButton className="w-full py-4 text-base font-bold shadow-lg hover:shadow-brand-red/20 transition-all">
                                Get Started
                            </LiquidButton>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
