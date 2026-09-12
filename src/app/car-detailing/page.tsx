"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidButton from "@/components/LiquidButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getFbCookie, getFbcFromUrl } from "@/utils/facebook";

type StepType = "step1" | "step2" | "step3" | "disqualified";

export default function CarDetailingQuizPage() {
    const router = useRouter();
    const [step, setStep] = useState<StepType>("step1");
    const [isCarDetailer, setIsCarDetailer] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        avgJobValue: "",
        setupType: "",
        firstName: "",
        phone: "",
        location: "",
        websiteOrSocial: ""
    });

    const avgJobOptions = [
        { value: "Under £100", label: "Under £100" },
        { value: "£100–£300", label: "£100–£300" },
        { value: "£300–£600", label: "£300–£600" },
        { value: "£600+", label: "£600+" }
    ];

    const setupOptions = [
        { value: "Mobile Detailing / Valeting", label: "Mobile Detailing / Valeting" },
        { value: "Detailing Unit / Studio", label: "Detailing Unit / Studio" },
        { value: "Both Mobile & Studio", label: "Both Mobile & Studio" }
    ];

    const handleStep1Select = (answer: boolean) => {
        setIsCarDetailer(answer);
        if (answer) {
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
                    type: 'car-detailing-quiz',
                    country: 'UK',
                    isCarDetailer: true,
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
                        We help car detailers get <br className="hidden sm:block" />
                        <span className="text-brand-green font-serif italic font-bold">more high-paying customers</span> in the UK.
                    </h1>
                </div>

                <div className="w-full max-w-md mx-auto">
                    {/* Card Container */}
                    <div className="bg-white/80 border border-brand-black/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-300">
                        
                        {/* STEP 1: Qualification */}
                        {step === "step1" && (
                            <div className="space-y-4 sm:space-y-5">
                                {/* Top Progress Bar */}
                                <div className="space-y-1.5">
                                    <div className="w-full bg-brand-black/5 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-brand-green h-full w-1/3 rounded-full transition-all duration-500"></div>
                                    </div>
                                    <div className="text-[10px] sm:text-xs font-bold tracking-wider text-brand-green uppercase">
                                        STEP 1 OF 3
                                    </div>
                                </div>

                                {/* Question Title */}
                                <div>
                                    <h2 className="text-base sm:text-lg font-bold text-brand-black uppercase tracking-wide">
                                        DO YOU RUN A CAR DETAILING OR VALETING BUSINESS IN THE UK?
                                    </h2>
                                </div>

                                {/* Option Buttons */}
                                <div className="space-y-2.5 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => handleStep1Select(true)}
                                        className={`w-full text-left py-3.5 px-5 rounded-xl font-bold text-base transition-all duration-200 border flex items-center justify-between shadow-xs ${
                                            isCarDetailer === true
                                                ? "bg-brand-green/10 border-brand-green text-brand-black"
                                                : "bg-white border-brand-black/15 text-brand-black hover:border-brand-green/40 hover:bg-brand-black/5"
                                        }`}
                                    >
                                        <span>Yes</span>
                                        {isCarDetailer === true && <span className="text-brand-green font-bold">✓</span>}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleStep1Select(false)}
                                        className={`w-full text-left py-3.5 px-5 rounded-xl font-bold text-base transition-all duration-200 border flex items-center justify-between shadow-xs ${
                                            isCarDetailer === false
                                                ? "bg-brand-black/10 border-brand-black text-brand-black"
                                                : "bg-white border-brand-black/15 text-brand-black hover:border-brand-black/30 hover:bg-brand-black/5"
                                        }`}
                                    >
                                        <span>No</span>
                                        {isCarDetailer === false && <span className="text-brand-black font-bold">✓</span>}
                                    </button>
                                </div>

                                {/* Continue Button */}
                                <div className="pt-1">
                                    <LiquidButton
                                        type="button"
                                        onClick={() => {
                                            if (isCarDetailer === true) setStep("step2");
                                            else if (isCarDetailer === false) setStep("disqualified");
                                            else alert("Please select an option to continue.");
                                        }}
                                        className="w-full py-3.5 text-base font-bold shadow-lg hover:shadow-xl transition-all"
                                    >
                                        Continue →
                                    </LiquidButton>
                                </div>
                            </div>
                        )}

                        {/* DISQUALIFIED VIEW: If "No" chosen */}
                        {step === "disqualified" && (
                            <div className="text-center space-y-4 py-2">
                                <div className="inline-block px-3 py-1 bg-amber-500/10 rounded-full">
                                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-700">Notice</span>
                                </div>

                                <h2 className="text-xl sm:text-2xl font-bold text-brand-black tracking-tight leading-tight">
                                    We only work with <br />
                                    <span className="text-brand-green font-serif italic font-bold">UK car detailers &amp; valeters</span>
                                </h2>

                                <p className="text-xs sm:text-sm text-brand-gray leading-relaxed max-w-sm mx-auto">
                                    Our client acquisition systems are specifically built for car detailing and valeting businesses in the UK. Because of this focus, we cannot take on businesses outside this industry at this time.
                                </p>

                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setStep("step1");
                                            setIsCarDetailer(null);
                                        }}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-black text-white hover:bg-brand-black/80 text-sm font-bold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md"
                                    >
                                        ← Go Back
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Quick Business Details */}
                        {step === "step2" && (
                            <div className="space-y-4 sm:space-y-5">
                                {/* Top Progress Bar */}
                                <div className="space-y-1.5">
                                    <div className="w-full bg-brand-black/5 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-brand-green h-full w-2/3 rounded-full transition-all duration-500"></div>
                                    </div>
                                    <div className="text-[10px] sm:text-xs font-bold tracking-wider text-brand-green uppercase">
                                        STEP 2 OF 3
                                    </div>
                                </div>

                                {/* Average Job Value */}
                                <div className="space-y-2">
                                    <h2 className="text-base sm:text-lg font-bold text-brand-black uppercase tracking-wide">
                                        WHAT IS THE AVERAGE VALUE OF ONE JOB?
                                    </h2>
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        {avgJobOptions.map((opt) => (
                                            <button
                                                type="button"
                                                key={opt.value}
                                                onClick={() => setFormData({ ...formData, avgJobValue: opt.value })}
                                                className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 border text-center ${
                                                    formData.avgJobValue === opt.value
                                                        ? "bg-brand-green text-white border-brand-green shadow-xs"
                                                        : "bg-white border-brand-black/15 text-brand-black hover:border-brand-green/40 hover:bg-brand-black/5"
                                                }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Setup Type */}
                                <div className="space-y-2 pt-1">
                                    <h2 className="text-base sm:text-lg font-bold text-brand-black uppercase tracking-wide">
                                        HOW ARE YOU SET UP?
                                    </h2>
                                    <div className="space-y-2 pt-1">
                                        {setupOptions.map((opt) => (
                                            <button
                                                type="button"
                                                key={opt.value}
                                                onClick={() => setFormData({ ...formData, setupType: opt.value })}
                                                className={`w-full text-left py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 border flex items-center justify-between shadow-xs ${
                                                    formData.setupType === opt.value
                                                        ? "bg-brand-green/10 border-brand-green text-brand-black font-bold"
                                                        : "bg-white border-brand-black/15 text-brand-black hover:border-brand-black/30 hover:bg-brand-black/5"
                                                }`}
                                            >
                                                <span>{opt.label}</span>
                                                {formData.setupType === opt.value && <span className="text-brand-green font-bold">✓</span>}
                                            </button>
                                        ))}
                                    </div>
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
                                            type="button"
                                            onClick={() => {
                                                if (!formData.avgJobValue) {
                                                    alert("Please select your average job value.");
                                                    return;
                                                }
                                                if (!formData.setupType) {
                                                    alert("Please select how you are set up.");
                                                    return;
                                                }
                                                setStep("step3");
                                            }}
                                            className="w-full py-3.5 text-base font-bold shadow-lg hover:shadow-xl transition-all"
                                        >
                                            Continue to Step 3 →
                                        </LiquidButton>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Contact Details */}
                        {step === "step3" && (
                            <div className="space-y-4 sm:space-y-5">
                                {/* Top Progress Bar */}
                                <div className="space-y-1.5">
                                    <div className="w-full bg-brand-black/5 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-brand-green h-full w-full rounded-full transition-all duration-500"></div>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold tracking-wider text-brand-green uppercase">
                                        <span>STEP 3 OF 3</span>
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
                                <form onSubmit={handleSubmit} className="space-y-3">
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

                                    {/* WHATSAPP NUMBER */}
                                    <div className="space-y-1">
                                        <label htmlFor="phone" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-black/70 ml-1">
                                            WHATSAPP NUMBER *
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

                                    {/* TOWN / CITY */}
                                    <div className="space-y-1">
                                        <label htmlFor="location" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-black/70 ml-1">
                                            TOWN / CITY *
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            required
                                            placeholder="e.g. Manchester, Birmingham, Leeds"
                                            className="w-full bg-white border border-brand-black/15 rounded-xl px-4 py-2.5 sm:py-3 text-brand-black font-medium outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all text-sm sm:text-base shadow-xs placeholder:text-brand-gray/40"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>

                                    {/* WEBSITE */}
                                    <div className="space-y-1">
                                        <label htmlFor="websiteOrSocial" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-black/70 ml-1">
                                            WEBSITE *
                                        </label>
                                        <input
                                            type="text"
                                            id="websiteOrSocial"
                                            required
                                            placeholder="website or Instagram link"
                                            className="w-full bg-white border border-brand-black/15 rounded-xl px-4 py-2.5 sm:py-3 text-brand-black font-medium outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all text-sm sm:text-base shadow-xs placeholder:text-brand-gray/40"
                                            value={formData.websiteOrSocial}
                                            onChange={(e) => setFormData({ ...formData, websiteOrSocial: e.target.value })}
                                        />
                                    </div>

                                    {/* Buttons Row */}
                                    <div className="flex items-center gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setStep("step2")}
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
                                                {loading ? "Submitting..." : "Submit Details →"}
                                            </LiquidButton>
                                        </div>
                                    </div>

                                    {/* Disclaimer Note */}
                                    <p className="text-center text-[11px] sm:text-xs text-brand-gray/80 pt-1 leading-relaxed font-medium">
                                        We&apos;ll show you the exact Google search volume for detailing services in your town, plus real results we&apos;ve gotten for other detailing clients.
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
