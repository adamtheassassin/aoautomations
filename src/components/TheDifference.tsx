"use client";

import { useState } from 'react';
import Image from 'next/image';

const beforeStats = [
    { label: "Average Ranking", value: "86", color: "bg-[#962424]" },
    { label: "Marketshare", value: "1%", color: "bg-[#962424]" },
    { label: "Clicks per Month", value: "5", color: "bg-[#962424]" },
    { label: "Customers per Month", value: "1-2", color: "bg-[#d41c1c]" },
];

const afterStats = [
    { label: "Average Ranking", value: "2", color: "bg-[#1a7a2e]" },
    { label: "Marketshare", value: "82%", color: "bg-[#1a7a2e]" },
    { label: "Clicks per Month", value: "80", color: "bg-[#1a7a2e]" },
    { label: "Customers per Month", value: "15+", color: "bg-[#1a7a2e]" },
];

export default function TheDifference() {
    const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');

    const stats = activeTab === 'before' ? beforeStats : afterStats;
    const imageSrc = activeTab === 'before'
        ? '/icons_&_images/background images/Bad Ranking.webp'
        : '/icons_&_images/background images/Good Ranking.webp';
    const imageAlt = activeTab === 'before'
        ? 'Bad ranking heatmap showing mostly 20+ positions'
        : 'Good ranking heatmap showing mostly #1 positions';

    return (
        <section id="before-after" className="w-full py-24 px-6 bg-brand-cream relative overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-block px-4 py-1.5 bg-brand-black/5 rounded-lg mb-6">
                        <span className="text-base font-medium text-brand-black">Before / After</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-black tracking-tight leading-[1.1]">
                        The <span className="text-brand-red font-serif italic font-medium">Difference</span>
                    </h2>
                </div>

                {/* Main Content Card */}
                <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-brand-black/5 overflow-hidden">

                    {/* Mobile: Toggle at top, visible without scrolling */}
                    <div className="p-6 pb-0 lg:hidden">
                        <div className="inline-flex bg-[#f5f5f5] rounded-xl p-1.5">
                            <button
                                onClick={() => setActiveTab('before')}
                                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${activeTab === 'before'
                                    ? 'bg-white text-brand-black shadow-[0_2px_8px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.08)] translate-y-[-1px]'
                                    : 'text-brand-black/50 hover:text-brand-black/70 hover:bg-white/40'
                                    }`}
                            >
                                Before
                            </button>
                            <button
                                onClick={() => setActiveTab('after')}
                                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${activeTab === 'after'
                                    ? 'bg-white text-brand-black shadow-[0_2px_8px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.08)] translate-y-[-1px]'
                                    : 'text-brand-black/50 hover:text-brand-black/70 hover:bg-white/40'
                                    }`}
                            >
                                After
                            </button>
                        </div>
                    </div>

                    {/* Mobile: Image right after toggle */}
                    <div className="lg:hidden bg-[#f5f5f5] mx-6 mt-4 rounded-2xl overflow-hidden relative">
                        {/* Info hover tooltip */}
                        <div className="absolute top-3 right-3 z-20 group">
                            <div className="w-9 h-9 rounded-full bg-brand-black/80 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center cursor-help shadow-lg hover:shadow-xl hover:bg-brand-black transition-all duration-200">
                                <span className="text-sm font-bold text-white select-none" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>i</span>
                            </div>
                            <div className="absolute top-full right-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                                <div className="bg-brand-black text-white text-xs leading-relaxed rounded-xl p-4 shadow-xl border border-white/10">
                                    <p className="font-semibold mb-1.5">How to read this map:</p>
                                    <p className="text-white/80 mb-2">Each dot shows your Google ranking for that area. The number is your position in search results.</p>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="w-3 h-3 rounded-full bg-[#22c55e] shrink-0"></span>
                                        <span className="text-white/80"><strong className="text-white">Green (1-3)</strong> — Top results, customers see you first</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-[#dc2626] shrink-0"></span>
                                        <span className="text-white/80"><strong className="text-white">Red (20+)</strong> — Buried, essentially invisible</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            key={`mobile-${activeTab}`}
                            className="relative w-full aspect-square rounded-2xl overflow-hidden"
                            style={{ animation: 'fadeIn 0.5s ease-out forwards' }}
                        >
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                fill
                                className="object-cover"
                                sizes="100vw"
                                priority
                            />
                        </div>
                    </div>

                    {/* Mobile: Stats below image */}
                    <div className="p-6 lg:hidden">
                        {/* Company Info */}
                        <div className="bg-[#f5f5f5] rounded-2xl p-5 mb-4 flex items-center gap-4">
                            <div className="w-10 h-10 bg-brand-black rounded-lg flex items-center justify-center shrink-0">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 21V10L12 3L20 10V21H14V14H10V21H4Z" fill="white" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-brand-black text-lg leading-tight">Your Company</p>
                                <p className="text-brand-gray text-sm">Example Address 12, 12101 NYC</p>
                            </div>
                        </div>

                        {/* Stats List */}
                        <div className="space-y-3">
                            {stats.map((stat, index) => (
                                <div
                                    key={`mobile-stat-${activeTab}-${index}`}
                                    className="bg-[#f5f5f5] rounded-2xl px-5 py-4 flex items-center justify-between"
                                    style={{
                                        animation: 'fadeSlideIn 0.4s ease-out forwards',
                                        animationDelay: `${index * 0.08}s`,
                                        opacity: 0,
                                    }}
                                >
                                    <span className="font-medium text-brand-black">{stat.label}</span>
                                    <span className={`${stat.color} text-white text-sm font-bold px-3 py-1 rounded-md shadow-[0_2px_6px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.12)] min-w-[40px] text-center`}>
                                        {stat.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop: Original side-by-side layout */}
                    <div className="hidden lg:grid lg:grid-cols-2">

                        {/* Left Side - Stats */}
                        <div className="p-8 md:p-10 flex flex-col">

                            {/* Toggle Buttons */}
                            <div className="inline-flex bg-[#f5f5f5] rounded-xl p-1.5 mb-8 self-start">
                                <button
                                    onClick={() => setActiveTab('before')}
                                    className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${activeTab === 'before'
                                        ? 'bg-white text-brand-black shadow-[0_2px_8px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.08)] translate-y-[-1px]'
                                        : 'text-brand-black/50 hover:text-brand-black/70 hover:bg-white/40'
                                        }`}
                                >
                                    Before
                                </button>
                                <button
                                    onClick={() => setActiveTab('after')}
                                    className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${activeTab === 'after'
                                        ? 'bg-white text-brand-black shadow-[0_2px_8px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.08)] translate-y-[-1px]'
                                        : 'text-brand-black/50 hover:text-brand-black/70 hover:bg-white/40'
                                        }`}
                                >
                                    After
                                </button>
                            </div>

                            {/* Company Info */}
                            <div className="bg-[#f5f5f5] rounded-2xl p-5 mb-6 flex items-center gap-4">
                                <div className="w-10 h-10 bg-brand-black rounded-lg flex items-center justify-center shrink-0">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 21V10L12 3L20 10V21H14V14H10V21H4Z" fill="white" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-brand-black text-lg leading-tight">Your Company</p>
                                    <p className="text-brand-gray text-sm">Example Address 12, 12101 NYC</p>
                                </div>
                            </div>

                            {/* Stats List */}
                            <div className="space-y-3 flex-1">
                                {stats.map((stat, index) => (
                                    <div
                                        key={`desktop-stat-${activeTab}-${index}`}
                                        className="bg-[#f5f5f5] rounded-2xl px-5 py-4 flex items-center justify-between"
                                        style={{
                                            animation: 'fadeSlideIn 0.4s ease-out forwards',
                                            animationDelay: `${index * 0.08}s`,
                                            opacity: 0,
                                        }}
                                    >
                                        <span className="font-medium text-brand-black">{stat.label}</span>
                                        <span className={`${stat.color} text-white text-sm font-bold px-3 py-1 rounded-md shadow-[0_2px_6px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.12)] min-w-[40px] text-center`}>
                                            {stat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Map Image */}
                        <div className="bg-[#f5f5f5] lg:rounded-r-3xl overflow-hidden flex items-center justify-center p-4 min-h-[400px] relative">

                            {/* Info hover tooltip */}
                            <div className="absolute top-4 right-4 z-20 group">
                                <div className="w-9 h-9 rounded-full bg-brand-black/80 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center cursor-help shadow-lg hover:shadow-xl hover:bg-brand-black transition-all duration-200">
                                    <span className="text-sm font-bold text-white select-none" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>i</span>
                                </div>
                                <div className="absolute top-full right-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                                    <div className="bg-brand-black text-white text-xs leading-relaxed rounded-xl p-4 shadow-xl border border-white/10">
                                        <p className="font-semibold mb-1.5">How to read this map:</p>
                                        <p className="text-white/80 mb-2">Each dot shows your Google ranking for that area. The number is your position in search results.</p>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="w-3 h-3 rounded-full bg-[#22c55e] shrink-0"></span>
                                            <span className="text-white/80"><strong className="text-white">Green (1-3)</strong> — Top results, customers see you first</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full bg-[#dc2626] shrink-0"></span>
                                            <span className="text-white/80"><strong className="text-white">Red (20+)</strong> — Buried, essentially invisible</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                key={`desktop-${activeTab}`}
                                className="relative w-full h-full min-h-[380px] rounded-2xl overflow-hidden shadow-lg"
                                style={{
                                    animation: 'fadeIn 0.5s ease-out forwards',
                                }}
                            >
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    fill
                                    className="object-cover"
                                    sizes="50vw"
                                    priority
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </section>
    );
}
