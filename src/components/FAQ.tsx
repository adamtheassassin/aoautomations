"use client";

import { useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";


export default function FAQ() {
    const { currency } = useCurrency();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const prices = {
        monthly: currency === 'ZAR' ? 'R4,250' : '$350',
        quarterly: currency === 'ZAR' ? 'R11,000' : '$900'
    };

    const FAQ_ITEMS = [
        {
            question: "1. How do I know you can actually guarantee top 3?",
            answer: "We've done this for dozens of local businesses from Modular Home Suppliers to Car Detailers. We only take on businesses we know we can rank - that's why we've never had to refund anyone (so far). Before we take your money, we audit your market and only proceed if we're confident we can get you there. If we can't deliver top 3 in 90 days, we'll work for free until we do."
        },
        {
            question: "2. What's this actually going to cost me total?",
            answer: `If and provided we can help you out, we will offer you two different payment plans. One is monthly and the other one is a prepayment for the quarter. For this specific package it's either ${prices.monthly} / month or ${prices.quarterly} / quarter.`
        },
        {
            question: "3. Will this work for my specific type of business?",
            answer: "If you're a local business with a physical service area, yes. The system works for any local service business. On our call, we'll tell you straight up if your market is too competitive or if there's something that would prevent us from ranking you. We don't take your money if we can't deliver."
        },
        {
            question: "4. How long until I actually see results?",
            answer: "Most businesses see ranking movement within 2-3 weeks. You'll notice you're climbing in the maps. The guarantee is top 3 within 90 days, but many hit it sooner. Once you're in the top 3, the phone starts ringing consistently. That's when you see the real ROI - not from rankings, but from the actual customers booking with you instead of your competitors."
        },
        {
            question: "5. How much of my time does this require?",
            answer: "About 30 minutes total. One onboarding call where we get access to your Google Business Profile and gather some info about your business. After that, we handle absolutely everything - optimization, reviews, posts, citations, all of it. You won't need to touch anything or learn anything technical. You just keep running your business while we get you ranked."
        },
        {
            question: "6. What happens if you don't get the promised result?",
            answer: "We are proactively checking and reporting your progress. If we didn't hit the result by the day we promised to hit it, we'll stop your billing until we actually get you there. As soon as we do, we'll start billing next month again to then maintain your ranking."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="questions" className="w-full py-24 px-6 bg-white relative overflow-hidden">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-12 flex flex-col items-center text-center">
                    <div className="inline-block px-4 py-1.5 bg-brand-black/5 rounded-lg mb-6">
                        <span className="text-base font-medium text-brand-black">Questions</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-medium text-brand-black tracking-tight leading-[1.1]">
                        Frequently Asked <span className="font-serif italic font-semibold text-brand-red">Questions</span>
                    </h2>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {FAQ_ITEMS.map((item, idx) => (
                        <div
                            key={idx}
                            className={`bg-white rounded-lg overflow-hidden transition-all duration-300 border border-brand-black/5 hover:border-brand-block/10 ${openIndex === idx ? 'shadow-md' : 'shadow-sm'}`}
                        >
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full flex items-center justify-between px-5 py-4 text-left group"
                            >
                                <span className={`font-semibold text-base md:text-lg flex-1 pr-8 leading-tight transition-colors ${openIndex === idx ? 'text-brand-red' : 'text-brand-black group-hover:text-brand-red'}`}>
                                    {item.question}
                                </span>
                                <div className={`w-8 h-8 rounded-md bg-brand-black/5 flex items-center justify-center transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-45' : ''}`}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 1V11M1 6H11" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </button>

                            <div
                                className={`grid transition-all duration-300 ease-in-out ${openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                            >
                                <div className="overflow-hidden px-5 pb-5 pt-0">
                                    <p className="text-brand-gray text-sm md:text-base leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
