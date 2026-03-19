"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidButton from "@/components/LiquidButton";
import Link from 'next/link';

export default function ThankYouPage() {
    return (
        <main className="min-h-screen bg-brand-cream flex flex-col">
            <Navbar />

            <section className="flex-1 flex items-center justify-center pt-32 pb-24 px-6 md:pt-48 md:pb-32">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-block px-4 py-1.5 bg-brand-black/5 rounded-lg mb-6">
                        <span className="text-sm font-bold uppercase tracking-widest text-brand-black/70">Analysis Requested</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-brand-black tracking-tight leading-[1.0] mb-8">
                        Thank <span className="font-serif italic font-medium text-brand-red">You!</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-brand-gray leading-relaxed max-w-2xl mx-auto mb-12">
                        We'll start working on your personalized video analysis right away. Check your inbox soon!
                    </p>
                    
                    <div className="flex justify-center">
                        <Link href="/">
                            <LiquidButton className="px-10 py-4 text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-brand-red/20 transition-all opacity-100">
                                Back to Homepage
                            </LiquidButton>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
