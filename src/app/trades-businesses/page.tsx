"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidButton from "@/components/LiquidButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getFbCookie, getFbcFromUrl } from "@/utils/facebook";

type StepType = "step1" | "step2" | "disqualified";

export default function TradesBusinessesPage() {
    const router = useRouter();
    const [step, setStep] = useState<StepType>("step1");
    const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        phone: "",
        websiteOrSocial: ""
    });

    const handleContinueStep1 = () => {
        if (selectedAnswer === true) {
            setStep("step2");
        } else if (selectedAnswer === false) {
            setStep("disqualified");
        } else {
            // Default to true if not explicitly selected, or prompt
            setStep("step2");
        }
    };

    const handleOptionSelect = (isTrades: boolean) => {
        setSelectedAnswer(isTrades);
        if (isTrades) {
            setStep("step2");
        } else {
            setStep("disqualified");
        }
    };

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
                    type: 'trades-business-quiz',
                    isTradesBusiness: true,
                    _fbp: getFbCookie('_fbp'),
                    _fbc: getFbCookie('_fbc') || getFbcFromUrl(),
                    ...formData
                }),
            });

            if (response.ok) {
                router.push("/thank-you");
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
        <main className="min-h-screen bg-brand-cream flex flex-col justify-between">
            <Navbar />

            <section className="pt-24 pb-10 px-4 sm:px-6 md:pt-32 md:pb-16 flex-1 flex flex-col items-center justify-center">
                
                {/* Header text above card */}
                <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-black tracking-tight leading-tight">
                        We help trades businesses get <br className="hidden sm:block" />
                        <span className="text-brand-green font-serif italic font-bold">more local leads</span> from Google.
                    </h1>
                </div>

                <div className="w-full max-w-md mx-auto">
                    {/* Card Container */}
                    <div className="bg-white/80 border border-brand-black/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-300">
                        
                        {/* STEP 1: Qualification Question */}
                        {step === "step1" && (
                            <div className="space-y-4 sm:space-y-5 animate-fadeIn">
                                {/* Top Progress Bar */}
                                <div className="space-y-1.5">
                                    <div className="w-full bg-brand-black/5 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-brand-green h-full w-1/2 rounded-full transition-all duration-500"></div>
                                    </div>
                                    <div className="text-[10px] sm:text-xs font-bold tracking-wider text-brand-green uppercase">
                                        STEP 1 OF 2
                                    </div>
                                </div>

                                {/* Question Title */}
                                <div>
                                    <h2 className="text-base sm:text-lg font-bold text-brand-black uppercase tracking-wide">
                                        DO YOU OWN A TRADES BUSINESS?
                                    </h2>
                                    <p className="text-xs text-brand-gray font-medium mt-1">
                                        (e.g. Plumbers, Electricians, Roofers, HVAC, Landscapers, Builders, Painters, etc.)
                                    </p>
                                </div>

                                {/* Full-Width Stacked Option Buttons (Exact image layout) */}
                                <div className="space-y-2.5 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => handleOptionSelect(true)}
                                        className={`w-full text-left py-3.5 px-5 rounded-xl font-bold text-base transition-all duration-200 border flex items-center justify-between shadow-xs ${
                                            selectedAnswer === true
                                                ? "bg-brand-green/10 border-brand-green text-brand-black"
                                                : "bg-white border-brand-black/15 text-brand-black hover:border-brand-green/40 hover:bg-brand-black/5"
                                        }`}
                                    >
                                        <span>Yes</span>
                                        {selectedAnswer === true && <span className="text-brand-green font-bold">✓</span>}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleOptionSelect(false)}
                                        className={`w-full text-left py-3.5 px-5 rounded-xl font-bold text-base transition-all duration-200 border flex items-center justify-between shadow-xs ${
                                            selectedAnswer === false
                                                ? "bg-brand-black/10 border-brand-black text-brand-black"
                                                : "bg-white border-brand-black/15 text-brand-black hover:border-brand-black/30 hover:bg-brand-black/5"
                                        }`}
                                    >
                                        <span>No</span>
                                        {selectedAnswer === false && <span className="text-brand-black font-bold">✓</span>}
                                    </button>
                                </div>

                                {/* Continue Button */}
                                <div className="pt-1">
                                    <LiquidButton
                                        type="button"
                                        onClick={handleContinueStep1}
                                        className="w-full py-3.5 text-base font-bold shadow-lg hover:shadow-xl transition-all"
                                    >
                                        Continue →
                                    </LiquidButton>
                                </div>
                            </div>
                        )}

                        {/* DISQUALIFIED VIEW: If "No" chosen */}
                        {step === "disqualified" && (
                            <div className="text-center space-y-4 animate-fadeIn py-2">
                                <div className="inline-block px-3 py-1 bg-amber-500/10 rounded-full">
                                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-700">Notice</span>
                                </div>

                                <h2 className="text-xl sm:text-2xl font-bold text-brand-black tracking-tight leading-tight">
                                    We only work with <br />
                                    <span className="text-brand-green font-serif italic font-bold">trades businesses</span>
                                </h2>

                                <p className="text-xs sm:text-sm text-brand-gray leading-relaxed max-w-sm mx-auto">
                                    Our growth systems and ranking frameworks are built specifically for trades &amp; home service contractors. Because of this focus, we unfortunately cannot take on non-trades clients at this time.
                                </p>

                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setStep("step1");
                                            setSelectedAnswer(null);
                                        }}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-black text-white hover:bg-brand-black/80 text-sm font-bold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md"
                                    >
                                        ← Go Back
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Details Form */}
                        {step === "step2" && (
                            <div className="space-y-4 sm:space-y-5 animate-fadeIn">
                                {/* Top Progress Bar */}
                                <div className="space-y-1.5">
                                    <div className="w-full bg-brand-black/5 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-brand-green h-full w-full rounded-full transition-all duration-500"></div>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold tracking-wider text-brand-green uppercase">
                                        <span>STEP 2 OF 2</span>
                                    </div>
                                </div>

                                {/* Form Header */}
                                <div>
                                    <h2 className="text-lg sm:text-xl font-bold text-brand-black tracking-tight mb-0.5">
                                        Where should we reach you?
                                    </h2>
                                    <p className="text-[11px] sm:text-xs font-semibold text-red-500/90">
                                        All fields are required *
                                    </p>
                                </div>

                                {/* Form Inputs */}
                                <form onSubmit={handleSubmit} className="space-y-3.5">
                                    {/* FIRST NAME */}
                                    <div className="space-y-1">
                                        <label htmlFor="firstName" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-black/70 ml-1">
                                            FIRST NAME *
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            required
                                            placeholder="John"
                                            className="w-full bg-white border border-brand-black/15 rounded-xl px-4 py-2.5 sm:py-3 text-brand-black font-medium outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all text-sm sm:text-base shadow-xs placeholder:text-brand-gray/40"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>

                                    {/* EMAIL */}
                                    <div className="space-y-1">
                                        <label htmlFor="email" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-black/70 ml-1">
                                            EMAIL *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            placeholder="john@example.com"
                                            className="w-full bg-white border border-brand-black/15 rounded-xl px-4 py-2.5 sm:py-3 text-brand-black font-medium outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all text-sm sm:text-base shadow-xs placeholder:text-brand-gray/40"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    {/* PHONE NUMBER */}
                                    <div className="space-y-1">
                                        <label htmlFor="phone" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-black/70 ml-1">
                                            PHONE NUMBER *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            required
                                            placeholder="07123 456789"
                                            className="w-full bg-white border border-brand-black/15 rounded-xl px-4 py-2.5 sm:py-3 text-brand-black font-medium outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all text-sm sm:text-base shadow-xs placeholder:text-brand-gray/40"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>

                                    {/* FACEBOOK / INSTAGRAM / WEBSITE */}
                                    <div className="space-y-1">
                                        <label htmlFor="websiteOrSocial" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-black/70 ml-1">
                                            FACEBOOK PAGE / INSTAGRAM PROFILE / WEBSITE *
                                        </label>
                                        <input
                                            type="text"
                                            id="websiteOrSocial"
                                            required
                                            placeholder="https://facebook.com/yourbusiness"
                                            className="w-full bg-white border border-brand-black/15 rounded-xl px-4 py-2.5 sm:py-3 text-brand-black font-medium outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all text-sm sm:text-base shadow-xs placeholder:text-brand-gray/40"
                                            value={formData.websiteOrSocial}
                                            onChange={(e) => setFormData({ ...formData, websiteOrSocial: e.target.value })}
                                        />
                                    </div>

                                    {/* Buttons Row */}
                                    <div className="flex items-center gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setStep("step1")}
                                            className="w-12 h-12 shrink-0 rounded-full bg-white border border-brand-black/15 flex items-center justify-center text-lg font-bold text-brand-black hover:bg-brand-black/5 transition-all active:scale-95 shadow-xs"
                                            title="Back to previous step"
                                        >
                                            ←
                                        </button>
                                        <div className="flex-1">
                                            <LiquidButton
                                                type="submit"
                                                disabled={loading}
                                                className="w-full py-3.5 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl hover:shadow-brand-green/20 transition-all opacity-100 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {loading ? "Submitting..." : "Submit →"}
                                            </LiquidButton>
                                        </div>
                                    </div>

                                    {/* Disclaimer Note */}
                                    <p className="text-center text-[11px] sm:text-xs text-brand-gray/80 pt-1 leading-relaxed font-medium">
                                        We&apos;ll analyze your local Google rankings and show you exactly how to rank in the top 3 in your area.
                                    </p>
                                </form>
                            </div>
                        )}

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
