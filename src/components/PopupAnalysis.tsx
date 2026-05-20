"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import LiquidButton from "@/components/LiquidButton";

export default function PopupAnalysis() {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        website: "",
        companyName: "",
        budget: "",
        avgJobValue: "",
        customersPerMonth: "",
        businessDescription: "",
        urgency: "Today"
    });
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        // Show popup after 20 seconds
        const timer = setTimeout(() => {
            if (pathname !== '/free-analysis' && !(window as any).isFillingFreeAnalysis) {
                setIsOpen(true);
            }
        }, 20000);

        return () => clearTimeout(timer);
    }, [pathname]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://hook.eu2.make.com/fgxu7pagp166o36qexkv9xnlqd9hcig3', {
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
                if (formData.urgency === "Just exploring") {
                    router.push("/thank-you?status=disqualified");
                } else {
                    router.push("/thank-you");
                }
                setIsOpen(false);
                setStep(1);
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    website: "",
                    companyName: "",
                    budget: "",
                    avgJobValue: "",
                    customersPerMonth: "",
                    businessDescription: "",
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

    if (!isOpen || pathname === '/free-analysis') return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-6 overflow-hidden">
            <div className="bg-[#e9e9e9] border border-brand-black/5 rounded-[1.5rem] sm:rounded-[2rem] w-full max-w-2xl relative shadow-2xl p-4 sm:p-8 overflow-y-auto max-h-full scrollbar-hide">
                
                {/* Close Button */}
                <button 
                    onClick={() => { setIsOpen(false); setStep(1); }}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors z-10"
                >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 1L1 11M1 1L11 11" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Header */}
                <div className="text-center mb-2 sm:mb-6 mt-0 sm:mt-2">
                    <h2 className="text-2xl sm:text-4xl font-bold text-brand-black tracking-tight mb-0.5 sm:mb-2 leading-tight">
                        Get Your Profile <span className="font-serif italic font-bold text-brand-green">Analyzed</span>
                    </h2>
                    <p className="text-brand-gray/80 text-[11px] sm:text-sm font-medium leading-snug">
                        No costs, no obligations, no annoying sales pitch. Guaranteed.
                    </p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 max-w-xs mx-auto">
                    <div className="flex items-center gap-1.5">
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all duration-300 ${
                            step >= 1 ? "bg-brand-green text-white" : "bg-brand-black/5 text-brand-gray/60"
                        }`}>
                            1
                        </div>
                        <span className={`text-[11px] sm:text-xs font-bold transition-colors ${step >= 1 ? "text-brand-black" : "text-brand-gray/40"}`}>Contact Info</span>
                    </div>
                    <div className={`h-[1px] flex-1 bg-brand-black/10 transition-colors ${step === 2 ? "bg-brand-green" : ""}`}></div>
                    <div className="flex items-center gap-1.5">
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all duration-300 ${
                            step === 2 ? "bg-brand-green text-white" : "bg-brand-black/5 text-brand-gray/60"
                        }`}>
                            2
                        </div>
                        <span className={`text-[11px] sm:text-xs font-bold transition-colors ${step === 2 ? "text-brand-black" : "text-brand-gray/40"}`}>Business Details</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-5">
                    {step === 1 ? (
                        <>
                            {/* Step 1 Fields */}
                            {/* Row 1: Name */}
                            <div className="grid grid-cols-1 gap-2 sm:gap-5">
                                <div className="space-y-0.5 sm:space-y-1.5">
                                    <label htmlFor="popup-fullName" className="text-xs sm:text-sm font-bold text-brand-black/70 ml-1">Full Name *</label>
                                    <input
                                        type="text"
                                        id="popup-fullName"
                                        required
                                        className="w-full bg-white border border-brand-black/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Row 2: Email */}
                            <div className="grid grid-cols-1 gap-2 sm:gap-5">
                                <div className="space-y-0.5 sm:space-y-1.5">
                                    <label htmlFor="popup-email" className="text-xs sm:text-sm font-bold text-brand-black/70 ml-1">Email *</label>
                                    <input
                                        type="email"
                                        id="popup-email"
                                        required
                                        className="w-full bg-white border border-brand-black/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Row 3: Phone */}
                            <div className="grid grid-cols-1 gap-2 sm:gap-5">
                                <div className="space-y-0.5 sm:space-y-1.5">
                                    <label htmlFor="popup-phone" className="text-xs sm:text-sm font-bold text-brand-black/70 ml-1">Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="popup-phone"
                                        required
                                        className="w-full bg-white border border-brand-black/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Row 4: Website */}
                            <div className="grid grid-cols-1 gap-2 sm:gap-5">
                                <div className="space-y-0.5 sm:space-y-1.5">
                                    <label htmlFor="popup-website" className="text-xs sm:text-sm font-bold text-brand-black/70 ml-1">Website</label>
                                    <input
                                        type="text"
                                        id="popup-website"
                                        className="w-full bg-white border border-brand-black/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Row 5: Company */}
                            <div className="grid grid-cols-1 gap-2 sm:gap-5">
                                <div className="space-y-0.5 sm:space-y-1.5">
                                    <label htmlFor="popup-companyName" className="text-xs sm:text-sm font-bold text-brand-black/70 ml-1">Company Name *</label>
                                    <input
                                        type="text"
                                        id="popup-companyName"
                                        required
                                        className="w-full bg-white border border-brand-black/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <LiquidButton
                                    type="button"
                                    onClick={(e) => {
                                        const form = e.currentTarget.closest("form");
                                        if (form && form.checkValidity()) {
                                            setStep(2);
                                        } else if (form) {
                                            form.reportValidity();
                                        }
                                    }}
                                    className="w-full py-2.5 sm:py-4 text-[15px] sm:text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-brand-green/20 transition-all opacity-100"
                                >
                                    Continue to Step 2 →
                                </LiquidButton>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Step 2 Fields */}
                            {/* Row 6: What does your business do? */}
                            <div className="grid grid-cols-1 gap-2 sm:gap-5">
                                <div className="space-y-0.5 sm:space-y-1.5">
                                    <label htmlFor="popup-businessDescription" className="text-xs sm:text-sm font-bold text-brand-black/70 ml-1">What does your business do? *</label>
                                    <input
                                        type="text"
                                        id="popup-businessDescription"
                                        required
                                        placeholder="e.g. Plumbing services in Cape Town"
                                        className="w-full bg-white border border-brand-black/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black"
                                        value={formData.businessDescription}
                                        onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Row 7: Budget */}
                            <div className="grid grid-cols-1 gap-2 sm:gap-5">
                                <div className="space-y-0.5 sm:space-y-1.5">
                                    <label htmlFor="popup-budget" className="text-xs sm:text-sm font-bold text-brand-black/70 ml-1">
                                        Current Marketing <span className="whitespace-nowrap">Budget *</span>
                                    </label>
                                    <select
                                        id="popup-budget"
                                        required
                                        className="w-full bg-white border border-brand-black/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black cursor-pointer"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                    >
                                        <option value="" disabled>Select budget range...</option>
                                        <option value="Under R3,000">Under R3,000</option>
                                        <option value="R3k–R5k">R3k–R5k</option>
                                        <option value="R5k–R10k">R5k–R10k</option>
                                        <option value="R10k–R25k">R10k–R25k</option>
                                        <option value="R25k+">R25k+</option>
                                    </select>
                                    <p className="text-[10px] sm:text-xs text-brand-gray/70 ml-1 mt-0.5 font-medium">Our programs start from R3,250/month.</p>
                                </div>
                            </div>

                            {/* Row 8: Average Value of Job */}
                            <div className="grid grid-cols-1 gap-2 sm:gap-5">
                                <div className="space-y-0.5 sm:space-y-1.5">
                                    <label htmlFor="popup-avgJobValue" className="text-xs sm:text-sm font-bold text-brand-black/70 ml-1">
                                        Average value of one <span className="whitespace-nowrap">job/sale *</span>
                                    </label>
                                    <select
                                        id="popup-avgJobValue"
                                        required
                                        className="w-full bg-white border border-brand-black/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black cursor-pointer"
                                        value={formData.avgJobValue}
                                        onChange={(e) => setFormData({ ...formData, avgJobValue: e.target.value })}
                                    >
                                        <option value="" disabled>Select average value...</option>
                                        <option value="Under R1k">Under R1k</option>
                                        <option value="R1k–R3k">R1k–R3k</option>
                                        <option value="R3k–R10k">R3k–R10k</option>
                                        <option value="R10k–R30k">R10k–R30k</option>
                                        <option value="R30k+">R30k+</option>
                                    </select>
                                </div>
                            </div>

                            {/* Row 9: Customers per Month */}
                            <div className="grid grid-cols-1 gap-2 sm:gap-5">
                                <div className="space-y-0.5 sm:space-y-1.5">
                                    <label htmlFor="popup-customersPerMonth" className="text-xs sm:text-sm font-bold text-brand-black/70 ml-1">Customers per month *</label>
                                    <select
                                        id="popup-customersPerMonth"
                                        required
                                        className="w-full bg-white border border-brand-black/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black cursor-pointer"
                                        value={formData.customersPerMonth}
                                        onChange={(e) => setFormData({ ...formData, customersPerMonth: e.target.value })}
                                    >
                                        <option value="" disabled>Select customers per month...</option>
                                        <option value="0–2">0–2</option>
                                        <option value="3–10">3–10</option>
                                        <option value="11–25">11–25</option>
                                        <option value="25+">25+</option>
                                    </select>
                                </div>
                            </div>

                            {/* Urgency Radio Buttons */}
                            <div>
                                <label className="text-xs sm:text-sm font-bold text-brand-black/70 ml-1 block mb-1 sm:mb-3">How soon are you looking to start the ranking process? *</label>
                                <div className="flex flex-wrap gap-1.5 sm:gap-3">
                                    {["Today", "A few weeks", "Just exploring"].map((option) => (
                                        <button
                                            type="button"
                                            key={option}
                                            onClick={() => setFormData({ ...formData, urgency: option })}
                                            className={`px-2.5 py-1 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-medium transition-all duration-200 border ${formData.urgency === option
                                                ? "bg-brand-black text-white border-brand-black"
                                                : "bg-white text-brand-gray border-brand-black/10 hover:border-brand-black/30"
                                                }`}
                                        >
                                            <div className="flex items-center gap-1 sm:gap-2">
                                                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${formData.urgency === option ? "bg-white" : "bg-brand-gray/30"}`}></div>
                                                {option}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 sm:gap-4 pt-1 sm:pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-1/3 py-2.5 sm:py-4 text-[13px] sm:text-base font-bold text-brand-black bg-white hover:bg-brand-black/5 border border-brand-black/10 rounded-xl transition-all duration-200"
                                >
                                    ← Back
                                </button>
                                <div className="w-2/3">
                                    <LiquidButton
                                        className="w-full py-2.5 sm:py-4 text-[15px] sm:text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-brand-green/20 transition-all opacity-100 disabled:opacity-70 disabled:cursor-not-allowed"
                                        disabled={loading}
                                    >
                                        {loading ? "Submitting..." : "Submit Analysis"}
                                    </LiquidButton>
                                </div>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
