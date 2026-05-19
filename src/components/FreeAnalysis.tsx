"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LiquidButton from "./LiquidButton";

export default function FreeAnalysis() {
    const router = useRouter();
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
                    type: 'free-analysis',
                    ...formData
                }),
            });

            if (response.ok) {
                if (formData.urgency === "Just exploring") {
                    router.push("/thank-you?status=disqualified");
                } else {
                    router.push("/thank-you");
                }
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

    return (
        <section className="py-16 md:py-24 px-6 bg-white relative overflow-hidden">
            {/* Background Gradient/Sheen */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-cream/50 to-transparent pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    
                    {/* Left Side: Content */}
                    <div className="space-y-6 lg:space-y-8">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold text-brand-black tracking-tight leading-[1.1] mb-8">
                                Get Your <br />
                                Profile <span className="font-serif italic font-bold text-brand-green">Analyzed</span>
                            </h2>
                            <p className="text-xl text-brand-gray leading-relaxed max-w-lg mb-8">
                                Fill out the form and we will record your personalized analysis with the exact things that need to happen so you can <strong className="text-brand-black">rank in the top 3 within your area</strong>.
                            </p>

                            <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-white/60 border border-brand-black/5 shadow-sm">
                                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-brand-black font-bold text-sm">100% Positive ROI Track Record</p>
                                    <p className="text-brand-gray text-sm mt-0.5">Every single client we&apos;ve ranked in the top 3 has seen a positive return on investment.</p>
                                </div>
                            </div>

                            <p className="text-brand-gray/60 font-medium text-sm max-w-xs">
                                No costs, no obligations, no annoying sales pitch. Guaranteed.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="bg-white border border-brand-black/5 rounded-[2.5rem] p-8 md:p-10 shadow-xl w-full">
                        {/* Step Indicator */}
                        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 max-w-xs mx-auto">
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

                        <form 
                            onSubmit={handleSubmit} 
                            onFocusCapture={() => { if (typeof window !== 'undefined') (window as any).isFillingFreeAnalysis = true; }}
                            onChangeCapture={() => { if (typeof window !== 'undefined') (window as any).isFillingFreeAnalysis = true; }}
                            className="space-y-5"
                        >
                            {step === 1 ? (
                                <>
                                    {/* Step 1: Contact Information */}
                                    {/* Row 1: Name & Email */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label htmlFor="fullName" className="text-sm font-bold text-brand-black/70 ml-1">Full Name *</label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                required
                                                className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-bold text-brand-black/70 ml-1">Email *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: Phone & Website */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-sm font-bold text-brand-black/70 ml-1">Phone Number *</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                required
                                                className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="website" className="text-sm font-bold text-brand-black/70 ml-1">Website</label>
                                            <input
                                                type="text"
                                                id="website"
                                                className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black"
                                                value={formData.website}
                                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3: Company */}
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2">
                                            <label htmlFor="companyName" className="text-sm font-bold text-brand-black/70 ml-1">Company Name *</label>
                                            <input
                                                type="text"
                                                id="companyName"
                                                required
                                                className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black"
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
                                            className="w-full py-5 text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-brand-green/20 transition-all opacity-100"
                                        >
                                            Continue to Step 2 →
                                        </LiquidButton>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Step 2: Business & Urgency details */}
                                    {/* What does your business do? */}
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2">
                                            <label htmlFor="businessDescription" className="text-sm font-bold text-brand-black/70 ml-1">What does your business do? *</label>
                                            <input
                                                type="text"
                                                id="businessDescription"
                                                required
                                                placeholder="e.g. Plumbing in Cape Town"
                                                className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black"
                                                value={formData.businessDescription}
                                                onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Row 4: Budget & Average Job Value */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label htmlFor="budget" className="text-sm font-bold text-brand-black/70 ml-1">Current Monthly Marketing Budget *</label>
                                            <select
                                                id="budget"
                                                required
                                                className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black cursor-pointer"
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
                                            <p className="text-xs text-brand-gray/70 ml-1 mt-1 font-medium">Our programs start at R4,250/month.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="avgJobValue" className="text-sm font-bold text-brand-black/70 ml-1">Average value of one job/sale *</label>
                                            <select
                                                id="avgJobValue"
                                                required
                                                className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black cursor-pointer"
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

                                    {/* Row 5: Customers per Month */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label htmlFor="customersPerMonth" className="text-sm font-bold text-brand-black/70 ml-1">Customers per month *</label>
                                            <select
                                                id="customersPerMonth"
                                                required
                                                className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all text-base text-brand-black cursor-pointer"
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
                                    <div className="pt-2">
                                        <label className="text-sm font-bold text-brand-black/70 ml-1 block">How soon are you looking to start the ranking process? *</label>
                                        <div className="flex flex-wrap gap-3 mt-8 mb-2">
                                            {["Today", "A few weeks", "Just exploring"].map((option) => (
                                                <button
                                                    type="button"
                                                    key={option}
                                                    onClick={() => setFormData({ ...formData, urgency: option })}
                                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${formData.urgency === option
                                                        ? "bg-brand-black text-white border-brand-black"
                                                        : "bg-white text-brand-gray border-brand-black/10 hover:border-brand-black/30"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${formData.urgency === option ? "bg-white" : "bg-brand-gray/30"}`}></div>
                                                        {option}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="w-1/3 py-5 text-base font-bold text-brand-black bg-white hover:bg-brand-black/5 border border-brand-black/10 rounded-xl transition-all duration-200"
                                        >
                                            ← Back
                                        </button>
                                        <div className="w-2/3">
                                            <LiquidButton
                                                className="w-full py-5 text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-brand-green/20 transition-all opacity-100 disabled:opacity-70 disabled:cursor-not-allowed"
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
            </div>
        </section>
    );
}
