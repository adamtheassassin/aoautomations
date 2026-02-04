"use client";

import Link from 'next/link';
import LiquidButton from './LiquidButton';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY && window.scrollY > 100) { // scrolling down & past header
                    setIsVisible(false);
                } else { // scrolling up
                    setIsVisible(true);
                }
                setLastScrollY(window.scrollY);
            }
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-transform duration-300 backdrop-blur-md bg-white/80 border-b border-brand-black/5 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center md:justify-between">
                <div className="flex items-center gap-3 group cursor-pointer">
                    {/* Logo Icon */}
                    <img
                        src="/icons_&_images/Client Logos/ao-icon.svg"
                        alt="aoautomations"
                        className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="text-2xl font-bold tracking-tight">
                        <span className="text-brand-black">ao</span><span className="text-brand-red">automations</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {/* Navigation links removed as requested */}

                    <div className="hidden md:block">
                        <LiquidButton className="px-6 py-2.5 text-sm font-semibold shadow-lg hover:shadow-brand-red/20 transition-all">
                            Get Your FREE Analysis
                        </LiquidButton>
                    </div>
                </div>
            </div>
        </nav>
    );
}
