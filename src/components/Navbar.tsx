"use client";

import Link from 'next/link';
import LiquidButton from './LiquidButton';
import { useState, useEffect, useCallback } from 'react';

const navLinks = [
    { label: 'Before / After', href: '#before-after' },
    { label: 'The Process', href: '#the-process' },
    { label: 'Questions', href: '#questions' },
];

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    setIsVisible(false);
                    setMobileOpen(false);
                } else {
                    setIsVisible(true);
                }
                setLastScrollY(window.scrollY);
            }
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileOpen(false);
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
            const offset = 80;
            const y = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, []);

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-transform duration-300 backdrop-blur-md bg-white/80 border-b border-brand-black/5 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group cursor-pointer">
                        <img
                            src="/icons_&_images/Client Logos/aoautomations.svg"
                            alt="aoautomations"
                            className="h-8 md:h-10 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-sm font-medium text-brand-black/60 hover:text-brand-black transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-red after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {link.label}
                            </a>
                        ))}

                        <Link href="/free-analysis">
                            <LiquidButton className="px-6 py-2.5 text-sm font-semibold shadow-lg hover:shadow-brand-red/20 transition-all">
                                Get Your FREE Analysis
                            </LiquidButton>
                        </Link>
                    </div>

                    {/* Mobile burger button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-brand-black/5 transition-colors duration-200 cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        <div className="w-5 flex flex-col gap-[5px]">
                            <span className={`block h-[2px] bg-brand-black rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                            <span className={`block h-[2px] bg-brand-black rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
                            <span className={`block h-[2px] bg-brand-black rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMobileOpen(false)}
            />

            {/* Mobile menu panel */}
            <div
                className={`fixed top-0 right-0 z-45 h-full w-[280px] bg-white shadow-2xl transition-transform duration-500 ease-out md:hidden ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ zIndex: 45 }}
            >
                <div className="flex flex-col h-full pt-24 px-8 pb-8">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-lg font-semibold text-brand-black py-3 px-4 rounded-xl hover:bg-brand-black/5 transition-all duration-300"
                                style={{
                                    opacity: mobileOpen ? 1 : 0,
                                    transform: mobileOpen ? 'translateX(0)' : 'translateX(20px)',
                                    transition: `opacity 0.3s ease-out ${0.1 + index * 0.05}s, transform 0.3s ease-out ${0.1 + index * 0.05}s`,
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="mt-auto">
                        <Link href="/free-analysis" onClick={() => setMobileOpen(false)}>
                            <LiquidButton className="w-full px-6 py-3.5 text-base font-semibold shadow-lg">
                                Get Your FREE Analysis
                            </LiquidButton>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
