"use client";

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full py-16 px-6 bg-white border-t border-brand-black/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-5 space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <img
                                src="/icons_&_images/Client Logos/ao-icon.svg"
                                alt="aoautomations"
                                className="w-8 h-8 object-contain"
                            />
                            <div className="text-2xl font-bold tracking-tight">
                                <span className="text-brand-black">ao</span><span className="text-brand-red">automations</span>
                            </div>
                        </Link>
                        <p className="text-brand-gray/80 text-xl leading-relaxed max-w-sm font-medium">
                            <span className="text-brand-black font-bold block mb-1">Dominate your market.</span>
                            <span className="text-brand-red font-serif italic">Built for local businesses.</span>
                        </p>
                        <div className="flex items-center gap-4">
                            {/* Instagram */}
                            <Link href="#" className="w-10 h-10 rounded-full bg-brand-black/5 flex items-center justify-center hover:bg-brand-red/10 transition-colors group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-black/60 group-hover:text-brand-red transition-colors">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </Link>
                            {/* Facebook */}
                            <Link href="#" className="w-10 h-10 rounded-full bg-brand-black/5 flex items-center justify-center hover:bg-brand-red/10 transition-colors group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-black/60 group-hover:text-brand-red transition-colors">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-8">
                        {/* Company (was Explore) */}
                        <div>
                            <h4 className="font-bold text-xs uppercase tracking-widest text-brand-red mb-6">Company</h4>
                            <ul className="space-y-4 text-sm font-medium text-brand-black/70">
                                <li><Link href="/contact" className="hover:text-brand-red transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Services - Non-clickable */}
                        <div>
                            <h4 className="font-bold text-xs uppercase tracking-widest text-brand-red mb-6">Services</h4>
                            <ul className="space-y-4 text-sm font-medium text-brand-black/70 cursor-default">
                                <li>Local SEO</li>
                                <li>Web Design</li>
                                <li>Automations</li>
                                <li>Google Ads</li>
                                <li>Meta Ads</li>
                                <li>Consulting</li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="font-bold text-xs uppercase tracking-widest text-brand-red mb-6">Legal</h4>
                            <ul className="space-y-4 text-sm font-medium text-brand-black/70">
                                <li><Link href="/privacy" className="hover:text-brand-red transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-brand-red transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-brand-black/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-brand-gray/60 text-xs font-medium">
                        © 2026 AO Automations. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
