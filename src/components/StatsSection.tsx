"use client";

import React from 'react';

export default function StatsSection() {
    return (
        <section className="w-full py-24 px-6 bg-brand-cream relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-4xl mx-auto space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-black tracking-tight leading-[1.1]">
                        Why Is Being In The <span className="text-brand-red italic font-serif">Top 3</span> Even Important?
                    </h2>
                    <div className="max-w-2xl mx-auto">
                        <p className="text-lg md:text-xl text-brand-gray font-medium">
                            <span className="font-bold text-brand-black">75% of all search requests</span> go to the top 3 results on Google Maps. And if you're not in the top 3, you're essentially invisible.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: Visibility */}
                    <div className="bg-white rounded-3xl p-6 shadow-md border border-brand-black/5 hover:-translate-y-1 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center mb-4 text-brand-red">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-brand-black mb-3">Visibility</h3>
                        <p className="text-brand-gray/80 text-sm leading-relaxed">
                            75% of all leads who are searching for your services go to the top 3 results. If you're not there, you're invisible.
                        </p>
                    </div>

                    {/* Card 2: Free */}
                    <div className="bg-white rounded-3xl p-6 shadow-md border border-brand-black/5 hover:-translate-y-1 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center mb-4 text-brand-red">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="12" x="2" y="6" rx="2" />
                                <circle cx="12" cy="12" r="2" />
                                <path d="M6 12h.01M18 12h.01" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-brand-black mb-3">Free</h3>
                        <p className="text-brand-gray/80 text-sm leading-relaxed">
                            No pay per click or huge ad budgets as with running Google Ads, Meta Ads or alike.
                        </p>
                    </div>

                    {/* Card 3: Long Term Strategy */}
                    <div className="bg-white rounded-3xl p-6 shadow-md border border-brand-black/5 hover:-translate-y-1 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center mb-4 text-brand-red">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 3v18h18" />
                                <path d="m19 9-5 5-4-4-3 3" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-brand-black mb-3">Long Term Strategy</h3>
                        <p className="text-brand-gray/80 text-sm leading-relaxed">
                            Unlike Google Ads that vanish the moment you stop paying, local seo rankings keep you at the top for years.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
