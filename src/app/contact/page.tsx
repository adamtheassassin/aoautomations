"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidButton from "@/components/LiquidButton";
import SubmissionSuccessModal from "@/components/SubmissionSuccessModal";
import { useState, useEffect } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        business: "",
        message: ""
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isSA, setIsSA] = useState(false);

    useEffect(() => {
        // Fetch user's country using a free IP geolocation API
        const checkLocation = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                if (data.country_code === 'ZA') {
                    setIsSA(true);
                }
            } catch (error) {
                console.error("Error fetching location:", error);
                // Fail clearly: default to not showing phone if check fails
            }
        };

        checkLocation();
    }, []);

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
                    type: 'contact-form',
                    ...formData
                }),
            });

            if (response.ok) {
                setIsModalOpen(true);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    business: "",
                    message: ""
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
        <main className="min-h-screen bg-brand-cream">
            <Navbar />

            <section className="pt-32 pb-24 px-6 md:pt-48 md:pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                        {/* Left Side: Content */}
                        <div className="space-y-8">
                            <div>
                                <div className="inline-block px-4 py-1.5 bg-brand-red/10 rounded-lg mb-6">
                                    <span className="text-sm font-bold uppercase tracking-widest text-brand-red">Contact Us</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold text-brand-black tracking-tight leading-[1.1] mb-6">
                                    Let's build your <br />
                                    <span className="text-brand-red italic font-serif">local authority</span>
                                </h1>
                                <p className="text-xl text-brand-gray leading-relaxed max-w-md">
                                    Ready to dominate your local market? Reach out and we'll show you exactly how we'll get you into the <strong className="text-brand-black">Top 3 within 90 days</strong>.
                                </p>
                            </div>

                            <div className="space-y-6 pt-8">
                                {/* Conditionally Render Phone Block */}
                                {isSA && (
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-brand-black/5 group-hover:border-brand-red/20 transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 18.92z"></path></svg>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-brand-gray/60 font-bold">Call us</p>
                                            <p className="text-lg font-bold text-brand-black">+27 64 5353 773</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-brand-black/5 group-hover:border-brand-red/20 transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-brand-gray/60 font-bold">Email us</p>
                                        <p className="text-lg font-bold text-brand-black">adam@aoautomation.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="relative">
                            {/* Decorative background for form */}
                            <div className="absolute inset-0 bg-brand-red/5 blur-3xl rounded-[3rem] -z-10 transform translate-x-4 translate-y-4"></div>

                            <form
                                onSubmit={handleSubmit}
                                className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-brand-black/5 border border-brand-black/5 relative z-10"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold text-brand-black/70 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="w-full bg-brand-cream/50 border border-brand-black/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all font-medium text-brand-black"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-bold text-brand-black/70 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full bg-brand-cream/50 border border-brand-black/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all font-medium text-brand-black"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 mb-8">
                                    <label htmlFor="phone" className="text-sm font-bold text-brand-black/70 ml-1">Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        required
                                        className="w-full bg-brand-cream/50 border border-brand-black/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all font-medium text-brand-black"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2 mb-8">
                                    <label htmlFor="business" className="text-sm font-bold text-brand-black/70 ml-1">Business Name</label>
                                    <input
                                        type="text"
                                        id="business"
                                        className="w-full bg-brand-cream/50 border border-brand-black/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all font-medium text-brand-black"
                                        placeholder="Your Local Business"
                                        value={formData.business}
                                        onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2 mb-10">
                                    <label htmlFor="message" className="text-sm font-bold text-brand-black/70 ml-1">How can we help?</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        className="w-full bg-brand-cream/50 border border-brand-black/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-red/30 focus:ring-4 focus:ring-brand-red/5 transition-all font-medium text-brand-black resize-none"
                                        placeholder="Tell us about your goals..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <LiquidButton
                                    className="w-full py-5 text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-brand-red/20 transition-all opacity-100 disabled:opacity-70 disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    {loading ? "Sending..." : "Send Message"}
                                </LiquidButton>

                                <p className="text-center text-xs text-brand-gray/50 mt-6 font-medium">
                                    By submitting this form, you agree to our Privacy Policy.
                                </p>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />

            <SubmissionSuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Message Sent!"
                message="Thanks for reaching out. We'll get back to you shortly."
            />
        </main>
    );
}
