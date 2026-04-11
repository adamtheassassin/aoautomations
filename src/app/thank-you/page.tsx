"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidButton from "@/components/LiquidButton";
import Link from 'next/link';

export default function ThankYouPage() {
    return (
        <main className="min-h-screen bg-brand-cream flex flex-col">
            <Navbar />

            <section className="flex-1 flex items-center justify-center pt-24 pb-12 px-6 md:pt-32 md:pb-24">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-block px-4 py-1.5 bg-brand-black/5 rounded-lg mb-6">
                        <span className="text-sm font-bold uppercase tracking-widest text-brand-black/70">Analysis Requested</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-brand-black tracking-tight leading-[1.0] mb-8">
                        Thank <span className="font-serif italic font-medium text-brand-red">You!</span>
                    </h1>
                    <p className="text-lg md:text-xl text-brand-gray leading-relaxed max-w-xl mx-auto mb-8">
                        Here&apos;s what happens next:
                    </p>

                    <div className="bg-white/60 border border-brand-black/5 rounded-3xl p-6 mb-8 max-w-xl mx-auto text-left space-y-6 shadow-sm">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
                                <span className="font-bold text-brand-red">1</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-black text-base md:text-lg mb-1">Brief Clarification</h3>
                                <p className="text-brand-gray leading-relaxed text-sm">We&apos;ll reach out via email/WhatsApp to confirm your target keywords (if needed).</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
                                <span className="font-bold text-brand-red">2</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-black text-base md:text-lg mb-1">Video Analysis</h3>
                                <p className="text-brand-gray leading-relaxed text-sm">You&apos;ll receive a custom 5-min video showing your current rankings and the roadmap to top 3.</p>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-md mx-auto mb-5">
                        <p className="font-semibold text-brand-black text-center text-sm">
                            Got target keywords in mind? Let us know!
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <a
                            href="https://wa.me/27645353773" // Add your WhatsApp link here
                            className="bg-gradient-to-b from-[#22c55e] via-[#16a34a] to-[#15803d] border-[2px] border-[#4ade80] text-white shadow-[0_0_15px_rgba(34,197,94,0.4),0_8px_15px_rgba(0,0,0,0.2)] px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 relative overflow-hidden group"
                        >
                            <div className="absolute inset-x-2 top-0 h-[50%] bg-gradient-to-b from-white/30 to-transparent rounded-t-xl pointer-events-none opacity-80"></div>
                            <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] pointer-events-none"></div>
                            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/20 to-transparent rounded-b-xl pointer-events-none"></div>
                            <svg className="w-6 h-6 relative z-10 drop-shadow-md group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                            </svg>
                            <span className="relative z-10 drop-shadow-md">Message us on WhatsApp</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
