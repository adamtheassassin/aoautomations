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
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        phone: "",
        websiteOrSocial: ""
    });

    const handleStep1Choice = (isTrades: boolean) => {
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

            <section className="pt-28 pb-16 px-4 sm:px-6 md:pt-36 md:pb-24 flex-1 flex items-center justify-center">
                <div className="w-full max-w-xl mx-auto">
                    {/* Card Container */}
                    <div className="bg-white/80 border border-brand-black/10 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-2xl backdrop-blur-md transition-all duration-300">
                        
                        {/* STEP 1: Qualification Question */}
                        {step === "step1" && (
                            <div className="space-y-6 sm:space-y-8 animate-fadeIn">
                                {/* Header / Badge */}
                                <div className="text-center space-y-3">
                                    <div className="inline-block px-4 py-1.5 bg-brand-green/10 rounded-full">
                                        <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Qualification</span>
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black tracking-tight leading-tight">
                                        Do you own a <br className="hidden sm:block" />
                                        <span className="text-brand-green font-serif italic font-bold">trades business?</span>
                                    </h1>
                                    <p className="text-sm sm:text-base text-brand-gray max-w-md mx-auto leading-relaxed">
                                        We work exclusively with hands-on, contractor, and home service businesses such as:
                                    </p>

                                    {/* Trade Examples Badges */}
                                    <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto pt-1 pb-2">
                                        {["Plumbing", "Electrical", "Roofing", "HVAC / AC", "Landscaping", "Builders", "Painters", "Home Services"].map((trade) => (
                                            <span key={trade} className="px-3 py-1 bg-white border border-brand-black/10 rounded-full text-xs font-semibold text-brand-black/80 shadow-2xs">
                                                {trade}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Choices */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => handleStep1Choice(true)}
                                        className="group relative p-6 bg-white border-2 border-brand-black/10 rounded-2xl hover:border-brand-green hover:shadow-lg transition-all duration-200 text-left flex flex-col justify-between items-start gap-4 active:scale-[0.98]"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center font-bold text-lg group-hover:bg-brand-green group-hover:text-white transition-colors">
                                            ✓
                                        </div>
                                        <div>
                                            <span className="block text-xl font-bold text-brand-black group-hover:text-brand-green transition-colors">
                                                Yes
                                            </span>
                                            <span className="text-xs text-brand-gray font-medium mt-1 block">
                                                I own or manage a trades or home service business
                                            </span>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleStep1Choice(false)}
                                        className="group relative p-6 bg-white border-2 border-brand-black/10 rounded-2xl hover:border-brand-black/30 hover:shadow-lg transition-all duration-200 text-left flex flex-col justify-between items-start gap-4 active:scale-[0.98]"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-brand-black/5 text-brand-black/60 flex items-center justify-center font-bold text-lg group-hover:bg-brand-black group-hover:text-white transition-colors">
                                            ✕
                                        </div>
                                        <div>
                                            <span className="block text-xl font-bold text-brand-black transition-colors">
                                                No
                                            </span>
                                            <span className="text-xs text-brand-gray font-medium mt-1 block">
                                                I run another type of business (e.g. e-commerce, consulting)
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* DISQUALIFIED VIEW: If "No" chosen */}
                        {step === "disqualified" && (
                            <div className="text-center space-y-6 animate-fadeIn py-4">
                                <div className="inline-block px-4 py-1.5 bg-amber-500/10 rounded-full">
                                    <span className="text-xs font-bold uppercase tracking-widest text-amber-700">Notice</span>
                                </div>

                                <h2 className="text-2xl sm:text-4xl font-bold text-brand-black tracking-tight leading-tight">
                                    We only work with <br />
                                    <span className="text-brand-green font-serif italic font-bold">trades businesses</span>
                                </h2>

                                <p className="text-sm sm:text-base text-brand-gray leading-relaxed max-w-md mx-auto">
                                    Our growth systems and ranking frameworks are built specifically for trades & home service contractors. Because of this focus, we unfortunately cannot take on non-trades clients at this time.
                                </p>

                                <div className="pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep("step1")}
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-black text-white hover:bg-brand-black/80 font-bold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md"
                                    >
                                        ← Go Back
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Details Form */}
                        {step === "step2" && (
                            <div className="space-y-6 animate-fadeIn">
                                {/* Top Progress Bar */}
                                <div className="space-y-2">
                                    <div className="w-full bg-brand-black/5 h-2 rounded-full overflow-hidden">
                                        <div className="bg-brand-green h-full w-full rounded-full transition-all duration-500"></div>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold tracking-widest text-brand-black/60 uppercase">
                                        <span>STEP 2 OF 2</span>
                                    </div>
                                </div>

                                {/* Form Header */}
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-black tracking-tight mb-1">
                                        Where should we reach you?
                                    </h2>
                                    <p className="text-xs sm:text-sm font-semibold text-red-500/90">
                                        All fields are required *
                                    </p>
                                </div>

                                {/* Form Inputs */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* FIRST NAME */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-brand-black/70 ml-1">
                                            FIRST NAME *
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            required
                                            placeholder="John"
                                            className="w-full bg-white border border-brand-black/15 rounded-2xl px-5 py-3.5 text-brand-black font-medium outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all text-base shadow-sm placeholder:text-brand-gray/40"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>

                                    {/* EMAIL */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-brand-black/70 ml-1">
                                            EMAIL *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            placeholder="john@example.com"
                                            className="w-full bg-white border border-brand-black/15 rounded-2xl px-5 py-3.5 text-brand-black font-medium outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all text-base shadow-sm placeholder:text-brand-gray/40"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    {/* PHONE NUMBER */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-brand-black/70 ml-1">
                                            PHONE NUMBER *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            required
                                            placeholder="07123 456789"
                                            className="w-full bg-white border border-brand-black/15 rounded-2xl px-5 py-3.5 text-brand-black font-medium outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all text-base shadow-sm placeholder:text-brand-gray/40"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>

                                    {/* FACEBOOK / INSTAGRAM / WEBSITE */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="websiteOrSocial" className="text-xs font-bold uppercase tracking-wider text-brand-black/70 ml-1">
                                            FACEBOOK PAGE / INSTAGRAM PROFILE / WEBSITE *
                                        </label>
                                        <input
                                            type="text"
                                            id="websiteOrSocial"
                                            required
                                            placeholder="https://facebook.com/yourbusiness"
                                            className="w-full bg-white border border-brand-black/15 rounded-2xl px-5 py-3.5 text-brand-black font-medium outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all text-base shadow-sm placeholder:text-brand-gray/40"
                                            value={formData.websiteOrSocial}
                                            onChange={(e) => setFormData({ ...formData, websiteOrSocial: e.target.value })}
                                        />
                                    </div>

                                    {/* Buttons Row */}
                                    <div className="flex items-center gap-3 pt-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep("step1")}
                                            className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-brand-black/10 flex items-center justify-center text-xl font-bold text-brand-black hover:bg-brand-black/5 hover:border-brand-black/30 transition-all active:scale-95 shadow-sm"
                                            title="Back to previous step"
                                        >
                                            ←
                                        </button>
                                        <div className="flex-1">
                                            <LiquidButton
                                                type="submit"
                                                disabled={loading}
                                                className="w-full py-4 text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-brand-green/20 transition-all opacity-100 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {loading ? "Submitting..." : "Submit →"}
                                            </LiquidButton>
                                        </div>
                                    </div>

                                    {/* Disclaimer Note */}
                                    <p className="text-center text-xs text-brand-gray/80 pt-2 leading-relaxed font-medium">
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
