"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidButton from "@/components/LiquidButton";
import FAQ from "@/components/FAQ";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FreeAnalysisPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        website: "",
        companyName: "",
        urgency: "Today"
    });

    const [budgetIndex, setBudgetIndex] = useState(0);
    const budgetMarks = ["R4,000", "R8,000", "R12,000", "R15,000+"];

    const [loading, setLoading] = useState(false);

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
                    type: 'free-analysis',
                    budget: budgetMarks[budgetIndex],
                    ...formData
                }),
            });

            if (response.ok) {
                router.push("/thank-you");
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    website: "",
                    companyName: "",
                    urgency: "Today"
                });
                setBudgetIndex(0);
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
        <main className="min-h-screen bg-brand-cream">
            <Navbar />

            <section className="min-h-screen flex items-center pt-28 pb-12 px-6 md:pt-32 md:pb-12">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                        {/* Left Side: Content */}
                        <div className="space-y-6 lg:space-y-8">
                            <div>
                                <div className="inline-block px-4 py-1.5 bg-brand-black/5 rounded-lg mb-6">
                                    <span className="text-sm font-bold uppercase tracking-widest text-brand-black/70">Free Stuff</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold text-brand-black tracking-tight leading-[1.0] mb-8">
                                    Get Your <br />
                                    Profile <span className="font-serif italic font-medium text-brand-red">Analyzed</span>
                                </h1>
                                <p className="text-xl text-brand-gray leading-relaxed max-w-lg mb-8">
                                    Fill out the form and we will record your personalized analysis with the exact things that need to happen so you can <strong className="text-brand-black">rank in the top 3 within your area</strong>.
                                </p>

                                <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-white/60 border border-brand-black/5 shadow-sm">
                                    <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        <div className="bg-white/50 border border-brand-black/5 rounded-[2.5rem] p-8 md:p-10 shadow-xl backdrop-blur-sm w-full">
                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* Row 1: Name & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label htmlFor="fullName" className="text-sm font-bold text-brand-black/70 ml-1">Full Name *</label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            required
                                            className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all text-base text-brand-black"
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
                                            className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all text-base text-brand-black"
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
                                            className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all text-base text-brand-black"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="website" className="text-sm font-bold text-brand-black/70 ml-1">Website</label>
                                        <input
                                            type="text"
                                            id="website"
                                            className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all text-base text-brand-black"
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
                                            className="w-full bg-white border border-brand-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all text-base text-brand-black"
                                            value={formData.companyName}
                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Marketing Budget Slider */}
                                <div className="pt-2">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <label className="text-sm font-bold text-brand-black/70 ml-1">Current Monthly Marketing Budget *</label>
                                        <span className="text-brand-red font-bold text-lg">{budgetMarks[budgetIndex]}</span>
                                    </div>
                                    <div className="relative px-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="3"
                                            step="1"
                                            value={budgetIndex}
                                            onChange={(e) => setBudgetIndex(parseInt(e.target.value))}
                                            className="w-full h-2 bg-brand-black/10 rounded-lg appearance-none cursor-pointer accent-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                                        />
                                        <div className="flex justify-between text-xs font-medium text-brand-black/50 mt-3 px-1">
                                            {budgetMarks.map((mark, i) => (
                                                <span
                                                    key={i}
                                                    className={`cursor-pointer transition-colors ${budgetIndex === i ? 'text-brand-red font-bold' : 'hover:text-brand-black/70'}`}
                                                    onClick={() => setBudgetIndex(i)}
                                                >
                                                    {mark}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Urgency Radio Buttons */}
                                <div className="pt-2">
                                    <label className="text-sm font-bold text-brand-black/70 ml-1 block">How soon are you looking to start the ranking process? *</label>
                                    <div className="flex flex-wrap gap-3 mt-8 mb-2">
                                        {["Today", "Tomorrow", "A few weeks"].map((option) => (
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

                                <div className="pt-2">
                                    <LiquidButton
                                        className="w-full py-5 text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-brand-red/20 transition-all opacity-100 disabled:opacity-70 disabled:cursor-not-allowed"
                                        disabled={loading}
                                    >
                                        {loading ? "Submitting..." : "Submit Analysis Request"}
                                    </LiquidButton>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </section>

            <FAQ />
            <Footer />
        </main>
    );
}
