"use client";

import React, { useEffect, useRef, useState } from 'react';

const cards = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
        title: "Visibility",
        stat: "75%",
        description: "75% of all leads who are searching for your services go to the top 3 results. If you're not there, you're invisible.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="12" x="2" y="6" rx="2" />
                <circle cx="12" cy="12" r="2" />
                <path d="M6 12h.01M18 12h.01" />
            </svg>
        ),
        title: "Free",
        stat: "$0",
        description: "No pay per click or huge ad budgets as with running Google Ads, Meta Ads or alike.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
            </svg>
        ),
        title: "Long Term Strategy",
        stat: "Years",
        description: "Unlike Google Ads that vanish the moment you stop paying, local seo rankings keep you at the top for years.",
    },
];

export default function StatsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-24 px-6 bg-brand-cream relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-4xl mx-auto space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-black tracking-tight leading-[1.1]">
                        Why Is Being In The <span className="text-brand-red italic font-serif">Top 3</span> Even Important?
                    </h2>
                    <div className="max-w-2xl mx-auto">
                        <p className="text-lg md:text-xl text-brand-gray font-medium">
                            <span className="font-bold text-brand-black">75% of all search requests</span> go to the top 3 results on Google Maps. And if you&apos;re not in the top 3, you&apos;re essentially invisible.
                        </p>
                    </div>
                </div>

                {/* Desktop: Cards with connecting lines */}
                <div className="hidden md:block relative">
                    {/* Animated connecting line behind cards */}
                    <div className="absolute top-[52px] left-[16.67%] right-[16.67%] h-[2px] z-0">
                        <div
                            className="h-full bg-gradient-to-r from-brand-red/0 via-brand-red/30 to-brand-red/0 rounded-full"
                            style={{
                                transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                                transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
                                transformOrigin: 'left',
                            }}
                        />
                    </div>

                    {/* Animated dots on the line */}
                    <div className="absolute top-[48px] left-[16.67%] right-[16.67%] z-[1] flex justify-between pointer-events-none">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-3 h-3 rounded-full bg-brand-red/40 border-2 border-brand-cream"
                                style={{
                                    transform: isVisible ? 'scale(1)' : 'scale(0)',
                                    transition: `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.5 + i * 0.25}s`,
                                }}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-8 relative z-10">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                    transition: `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`,
                                }}
                            >
                                <div className="group relative bg-white rounded-3xl p-7 shadow-md border border-brand-black/5 hover:border-brand-red/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-700 ease-out overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-red/0 via-brand-red/60 to-brand-red/0 rounded-t-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />

                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red transition-all duration-700 ease-out group-hover:scale-110 group-hover:shadow-md group-hover:shadow-brand-red/10">
                                            {card.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold text-brand-black leading-none transition-colors duration-700 ease-out group-hover:text-brand-red">
                                                {card.stat}
                                            </span>
                                            <span className="text-xs font-semibold text-brand-gray/60 uppercase tracking-wider mt-0.5">
                                                {card.title}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-brand-gray/80 text-sm leading-relaxed">
                                        {card.description}
                                    </p>

                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-brand-red/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile: Cards with vertical connecting flow */}
                <div className="md:hidden relative">
                    <div className="flex flex-col items-center">
                        {cards.map((card, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && (
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="w-[2px] h-10 bg-gradient-to-b from-brand-red/20 to-brand-red/40 rounded-full"
                                            style={{
                                                transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
                                                transition: `transform 0.5s ease-out ${0.3 + index * 0.2}s`,
                                                transformOrigin: 'top',
                                            }}
                                        />
                                        <div
                                            className="w-2.5 h-2.5 rounded-full bg-brand-red/50 mb-1 relative"
                                            style={{
                                                transform: isVisible ? 'scale(1)' : 'scale(0)',
                                                transition: `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.5 + index * 0.2}s`,
                                            }}
                                        >
                                            <span className="absolute inset-0 rounded-full bg-brand-red/30 animate-ping" style={{ animationDuration: '2s' }} />
                                        </div>
                                    </div>
                                )}

                                <div
                                    className="w-full group bg-white rounded-3xl p-6 shadow-md border border-brand-black/5 relative overflow-hidden"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                        transition: `opacity 0.5s ease-out ${index * 0.2}s, transform 0.5s ease-out ${index * 0.2}s`,
                                    }}
                                >
                                    <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-gradient-to-b from-brand-red/60 to-brand-red/10 rounded-r-full" />

                                    <div className="flex items-center gap-4 mb-4 pl-3">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0 shadow-sm">
                                            {card.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold text-brand-black leading-none">
                                                {card.stat}
                                            </span>
                                            <span className="text-xs font-semibold text-brand-gray/60 uppercase tracking-wider mt-0.5">
                                                {card.title}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-brand-gray/80 text-sm leading-relaxed pl-3">
                                        {card.description}
                                    </p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
