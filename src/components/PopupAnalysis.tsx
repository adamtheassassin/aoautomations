"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LiquidButton from "@/components/LiquidButton";

export default function PopupAnalysis() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        website: "",
        companyName: "",
        budget: "",
        urgency: "Today"
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Show popup after 20 seconds
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 20000);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://hook.eu1.make.com/p3uvqprbij5cj4ysbnbth89vrk5u60pa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'free-analysis-popup',
                    ...formData
                }),
            });

            if (response.ok) {
                router.push("/thank-you");
                setIsOpen(false);
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    website: "",
                    companyName: "",
                    budget: "",
                    urgency: "Today"
                });
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-6 overflow-hidden">
            <div className="bg-[#e9e9e9] border border-brand-black/5 rounded-[1.5rem] sm:rounded-[2rem] w-full max-w-2xl relative shadow-2xl p-4 sm:p-8 overflow-y-auto max-h-full scrollbar-hide">
                
                {/* Close Button */}
                <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors z-10"
                >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 1L1 11M1 1L11 11" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Header */}
                <div className="text-center mb-3 sm:mb-6 mt-1 sm:mt-2">
                    <h2 className="text-2xl sm:text-4xl font-bold text-brand-black tracking-tight mb-1 sm:mb-2 leading-tight">
                        Get Your Profile <span className="font-serif italic font-medium text-brand-red">Analyzed</span>
                    </h2>
                    <p className="text-brand-gray/80 text-[10px] sm:text-sm font-medium leading-snug">
                        No costs, no obligations, no annoying sales pitch. Guaranteed.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-5">

                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-5">
                        <div className="space-y-0.5 sm:space-y-1.5">
                            <label htmlFor="popup-fullName" className="text-[10px] sm:text-sm font-bold text-brand-black/70 ml-1">Full Name *</label>
                            <input
                                type="text"
                                id="popup-fullName"
                                required
                                className="w-full bg-white border border-brand-black/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all text-xs sm:text-base text-brand-black"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1.5">
                            <label htmlFor="popup-email" className="text-[10px] sm:text-sm font-bold text-brand-black/70 ml-1">Email *</label>
                            <input
                                type="email"
                                id="popup-email"
                                required
                                className="w-full bg-white border border-brand-black/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all text-xs sm:text-base text-brand-black"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Row 2: Phone & Website */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-5">
                        <div className="space-y-0.5 sm:space-y-1.5">
                            <label htmlFor="popup-phone" className="text-[10px] sm:text-sm font-bold text-brand-black/70 ml-1">Phone Number *</label>
                            <input
                                type="tel"
                                id="popup-phone"
                                required
                                className="w-full bg-white border border-brand-black/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all text-xs sm:text-base text-brand-black"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1.5">
                            <label htmlFor="popup-website" className="text-[10px] sm:text-sm font-bold text-brand-black/70 ml-1">Website</label>
                            <input
                                type="text"
                                id="popup-website"
                                className="w-full bg-white border border-brand-black/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all text-xs sm:text-base text-brand-black"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Row 3: Company & Budget */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-5">
                        <div className="space-y-0.5 sm:space-y-1.5">
                            <label htmlFor="popup-companyName" className="text-[10px] sm:text-sm font-bold text-brand-black/70 ml-1 whitespace-nowrap overflow-hidden text-ellipsis">Company Name *</label>
                            <input
                                type="text"
                                id="popup-companyName"
                                required
                                className="w-full bg-white border border-brand-black/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all text-xs sm:text-base text-brand-black"
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1.5">
                            <label htmlFor="popup-budget" className="text-[10px] sm:text-sm font-bold text-brand-black/70 ml-1 whitespace-nowrap overflow-hidden text-ellipsis">Marketing Budget *</label>
                            <input
                                type="text"
                                id="popup-budget"
                                required
                                className="w-full bg-white border border-brand-black/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all text-xs sm:text-base text-brand-black"
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Urgency Radio Buttons */}
                    <div>
                        <label className="text-[10px] sm:text-sm font-bold text-brand-black/70 ml-1 block mb-1.5 sm:mb-3">How soon are you looking to start? *</label>
                        <div className="flex flex-wrap gap-1.5 sm:gap-3">
                            {["Today", "Tomorrow", "A few weeks"].map((option) => (
                                <button
                                    type="button"
                                    key={option}
                                    onClick={() => setFormData({ ...formData, urgency: option })}
                                    className={`px-2.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-sm font-medium transition-all duration-200 border ${formData.urgency === option
                                        ? "bg-brand-black text-white border-brand-black"
                                        : "bg-white text-brand-gray border-brand-black/10 hover:border-brand-black/30"
                                        }`}
                                >
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${formData.urgency === option ? "bg-white" : "bg-brand-gray/30"}`}></div>
                                        {option}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-1 sm:pt-2">
                        <LiquidButton
                            className="w-full py-2.5 sm:py-4 text-sm sm:text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-brand-red/20 transition-all opacity-100 disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit Analysis Request"}
                        </LiquidButton>
                    </div>

                </form>
            </div>
        </div>
    );
}
