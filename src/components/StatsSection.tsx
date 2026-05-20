"use client";

import React, { useEffect, useRef, useState } from 'react';

// ==========================================
// PRESERVED OLD SECTION METADATA (DEACTIVATED)
// ==========================================
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

// ==========================================
// SIMPLIFIED GBP CLIENT RESULTS METADATA
// ==========================================
interface ClientResult {
    id: string;
    title: string;
    imagePath: string;
}

const gbpResults: ClientResult[] = [
    {
        id: 'result-1',
        title: 'Direct Customer Calls Generated',
        imagePath: '/GBP Results/kebabish calls.png',
    },
    {
        id: 'result-2',
        title: 'Consistent Inbound Phone Inquiries',
        imagePath: '/GBP Results/xternalshine calls.png',
    },
    {
        id: 'result-3',
        title: 'High-Volume Website Visits',
        imagePath: '/GBP Results/xternalshine websiteclicks.png',
    },
    {
        id: 'result-4',
        title: 'Direct Customer Chat Messages',
        imagePath: '/GBP Results/xternalshinewhatsapp msg.png',
    },
    {
        id: 'result-5',
        title: 'Over R414,000 Generated from R15,000 Ad Spend',
        imagePath: '/GBP Results/Naturelle Google Ads.png',
    },
    {
        id: 'result-6',
        title: '100 Leads Generated',
        imagePath: '/GBP Results/Xternalshine Google Ads.png',
    },
];

export default function StatsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // States for interactive results showcase
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [activeMobileIndex, setActiveMobileIndex] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.05 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Lightbox Modal Controls
    const handlePrev = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (lightboxIndex === null) return;
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : gbpResults.length - 1));
    };

    const handleNext = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (lightboxIndex === null) return;
        setLightboxIndex((prev) => (prev !== null && prev < gbpResults.length - 1 ? prev + 1 : 0));
    };

    // Keyboard handlers for modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex]);

    // Handle Mobile Carousel Scroll Events
    const handleCarouselScroll = () => {
        if (!carouselRef.current) return;
        const scrollLeft = carouselRef.current.scrollLeft;
        const cardWidth = carouselRef.current.querySelector('div')?.offsetWidth || 300;
        const gap = 16; // gap-4 is 16px
        const index = Math.round(scrollLeft / (cardWidth + gap));
        setActiveMobileIndex(Math.min(index, gbpResults.length - 1));
    };

    // Scroll to Mobile Carousel Slide
    const scrollToMobileIndex = (idx: number) => {
        if (!carouselRef.current) return;
        const cardWidth = carouselRef.current.querySelector('div')?.offsetWidth || 300;
        const gap = 16;
        carouselRef.current.scrollTo({
            left: idx * (cardWidth + gap),
            behavior: 'smooth'
        });
        setActiveMobileIndex(idx);
    };

    return (
        <section ref={sectionRef} className="w-full py-20 px-6 bg-white relative overflow-hidden">
            {/* Background Gradient/Sheen */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-brand-cream/50 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-16 max-w-4xl mx-auto space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-black tracking-tight leading-[1.1]">
                        Why Is Being In The <span className="text-brand-green italic font-serif font-bold">Top 3</span> Even Important?
                    </h2>
                    <div className="max-w-2xl mx-auto">
                        <p className="text-lg md:text-xl text-brand-gray font-medium">
                            <span className="font-bold text-brand-black">75% of all search requests</span> go to the top 3 results on Google Maps. And if you&apos;re not in the top 3, you&apos;re essentially invisible.
                        </p>
                    </div>
                </div>

                {/* ==========================================
                    DESKTOP: LARGE 2-COLUMN IMAGE GRID
                   ========================================== */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 relative z-10">
                    {gbpResults.map((item, index) => (
                        <div
                            key={item.id}
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.12}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.12}s`,
                            }}
                            className="flex flex-col group"
                        >
                            {/* Short, direct Title above image */}
                            <h3 className="text-xl font-bold text-brand-black mb-3 group-hover:text-brand-green transition-colors duration-300">
                                {item.title}
                            </h3>

                            {/* Large Image Frame Mockup */}
                            <div className="w-full overflow-hidden rounded-2xl border border-brand-black/5 bg-brand-cream/5 shadow-md group relative">
                                <img
                                    src={item.imagePath}
                                    alt={item.title}
                                    className="w-full h-auto object-contain cursor-pointer transition-transform duration-500 hover:scale-[1.015]"
                                    onClick={() => setLightboxIndex(index)}
                                />

                                {/* Fullscreen hover indicator */}
                                <div
                                    onClick={() => setLightboxIndex(index)}
                                    className="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                                >
                                    <div className="bg-brand-dark/80 backdrop-blur-md text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg border border-white/10 scale-95 group-hover:scale-100 transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><line x1="11" x2="11" y1="8" y2="14" /><line x1="8" x2="14" y1="11" y2="11" />
                                        </svg>
                                        Click to View Fullscreen
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ==========================================
                    MOBILE: NATIVE SWIPE CAROUSEL (SCROLL-SNAP)
                   ========================================== */}
                <div className="md:hidden relative">
                    <div
                        ref={carouselRef}
                        onScroll={handleCarouselScroll}
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-none px-4 -mx-6"
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {gbpResults.map((item, index) => (
                            <div
                                key={item.id}
                                className="w-[85vw] max-w-[340px] shrink-0 snap-center flex flex-col justify-between"
                            >
                                <div>
                                    {/* Direct Title above */}
                                    <h3 className="text-sm font-bold text-brand-black mb-2 truncate">
                                        {item.title}
                                    </h3>

                                    {/* Image Card Frame */}
                                    <div
                                        onClick={() => setLightboxIndex(index)}
                                        className="w-full relative overflow-hidden rounded-2xl bg-brand-cream/5 border border-brand-black/5 cursor-pointer shadow-sm"
                                    >
                                        <img src={item.imagePath} alt={item.title} className="w-full h-auto object-contain" />

                                        {/* Mobile Tap Zoom Badge */}
                                        <div className="absolute bottom-2.5 right-2.5 bg-brand-dark/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[9px] font-bold flex items-center gap-1.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><line x1="11" x2="11" y1="8" y2="14" /><line x1="8" x2="14" y1="11" y2="11" />
                                            </svg>
                                            Tap to Zoom
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Swiping Indicators (Dots) */}
                    <div className="flex justify-center items-center gap-2 mt-4 md:hidden">
                        {gbpResults.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => scrollToMobileIndex(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${activeMobileIndex === idx ? 'w-5 bg-brand-green' : 'w-2 bg-brand-cream/60'
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* ==========================================
                    PRESERVED OLD CARDS RENDERING (DISABLED)
                   ========================================== */}
                {/* 
                {false && (
                    <>
                        <div className="hidden md:block relative">
                            <div className="absolute top-[52px] left-[16.67%] right-[16.67%] h-[2px] z-0">
                                <div
                                    className="h-full bg-gradient-to-r from-brand-green/0 via-brand-green/30 to-brand-green/0 rounded-full"
                                    style={{
                                        transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                                        transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
                                        transformOrigin: 'left',
                                    }}
                                />
                            </div>

                            <div className="absolute top-[48px] left-[16.67%] right-[16.67%] z-[1] flex justify-between pointer-events-none">
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="w-3 h-3 rounded-full bg-brand-green/40 border-2 border-brand-cream"
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
                                        <div className="group relative bg-white rounded-3xl p-7 shadow-md border border-brand-black/5 hover:border-brand-green/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-700 ease-out overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-green/0 via-brand-green/60 to-brand-green/0 rounded-t-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />

                                            <div className="flex items-center gap-4 mb-5">
                                                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green transition-all duration-700 ease-out group-hover:scale-110 group-hover:shadow-md group-hover:shadow-brand-green/10">
                                                    {card.icon}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-2xl font-bold text-brand-black leading-none transition-colors duration-700 ease-out group-hover:text-brand-green">
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

                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-brand-green/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="md:hidden relative">
                            <div className="flex flex-col items-center">
                                {cards.map((card, index) => (
                                    <React.Fragment key={index}>
                                        {index > 0 && (
                                            <div className="flex flex-col items-center">
                                                <div
                                                    className="w-[2px] h-10 bg-gradient-to-b from-brand-green/20 to-brand-green/40 rounded-full"
                                                    style={{
                                                        transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
                                                        transition: `transform 0.5s ease-out ${0.3 + index * 0.2}s`,
                                                        transformOrigin: 'top',
                                                    }}
                                                />
                                                <div
                                                    className="w-2.5 h-2.5 rounded-full bg-brand-green/50 mb-1 relative"
                                                    style={{
                                                        transform: isVisible ? 'scale(1)' : 'scale(0)',
                                                        transition: `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.5 + index * 0.2}s`,
                                                    }}
                                                >
                                                    <span className="absolute inset-0 rounded-full bg-brand-green/30 animate-ping" style={{ animationDuration: '2s' }} />
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
                                            <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-gradient-to-b from-brand-green/60 to-brand-green/10 rounded-r-full" />

                                            <div className="flex items-center gap-4 mb-4 pl-3">
                                                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0 shadow-sm">
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
                    </>
                )}
                */}

            </div>

            {/* ==========================================
                IMMERSIVE LIGHTBOX MODAL WITH FULL ZOOM
               ========================================== */}
            {lightboxIndex !== null && gbpResults[lightboxIndex] && (
                <div
                    className="fixed inset-0 z-50 bg-brand-black/95 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in duration-300"
                    onClick={() => setLightboxIndex(null)}
                >
                    {/* Header Controls */}
                    <div className="flex items-center justify-between p-5 md:p-6 text-white bg-gradient-to-b from-brand-black to-transparent">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white/95">
                                {gbpResults[lightboxIndex].title}
                            </span>
                            <span className="text-[10px] text-white/40 font-semibold mt-0.5">
                                Result {lightboxIndex + 1} of {gbpResults.length}
                            </span>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setLightboxIndex(null)}
                            className="bg-white/10 text-white hover:bg-white/20 p-2.5 rounded-full transition duration-300 border border-white/10 hover:scale-105 cursor-pointer shadow-lg"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Image Showcase Wrapper */}
                    <div className="relative flex-grow flex items-center justify-center p-4">
                        {/* Left Arrow */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 z-20 hidden md:flex items-center justify-center bg-white/10 text-white hover:bg-white/20 p-4 rounded-full transition border border-white/15 hover:scale-105 cursor-pointer shadow-xl backdrop-blur-sm"
                            aria-label="Previous image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>

                        {/* Image */}
                        <div
                            className="max-h-[72vh] md:max-h-[80vh] max-w-full md:max-w-[85vw] flex items-center justify-center relative scale-in-out"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={gbpResults[lightboxIndex].imagePath}
                                alt={gbpResults[lightboxIndex].title}
                                className="max-h-[72vh] md:max-h-[80vh] max-w-full object-contain rounded-xl border border-white/10 shadow-2xl"
                            />
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={handleNext}
                            className="absolute right-4 z-20 hidden md:flex items-center justify-center bg-white/10 text-white hover:bg-white/20 p-4 rounded-full transition border border-white/15 hover:scale-105 cursor-pointer shadow-xl backdrop-blur-sm"
                            aria-label="Next image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile explicit navigation controls in bottom bar */}
                    <div
                        className="bg-brand-black/90 border-t border-white/10 p-6 md:hidden w-full relative z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between max-w-sm mx-auto bg-white/5 rounded-xl border border-white/5 p-1 backdrop-blur-sm">
                            <button
                                onClick={handlePrev}
                                className="flex-1 py-3 text-white flex items-center justify-center gap-1 font-bold text-xs hover:bg-white/5 rounded-lg transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                                Previous
                            </button>
                            <div className="w-[1px] h-6 bg-white/10" />
                            <button
                                onClick={handleNext}
                                className="flex-1 py-3 text-white flex items-center justify-center gap-1 font-bold text-xs hover:bg-white/5 rounded-lg transition"
                            >
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
