import React from "react";

const LOGOS = [
    // Naturelle Logo
    <img
        key="naturelle"
        src="/icons_&_images/Client Logos/Naturelle-Logo@x2-300x84.svg"
        alt="Naturelle"
        className="h-full w-auto object-contain"
    />,
    // Xternal Shine Logo
    <img
        key="xternalshine"
        src="/icons_&_images/Client Logos/xternalshine-logo.svg"
        alt="Xternal Shine"
        className="h-full w-auto object-contain"
    />,

    // Red Engage Logo
    <img
        key="red-engage"
        src="/icons_&_images/Client Logos/red-engage-brand-logo.svg"
        alt="Red Engage"
        className="h-full w-auto object-contain scale-[1.6]"
    />,
    // EHS Logo
    <img
        key="ehs"
        src="/icons_&_images/Client Logos/ehs_logo.svg"
        alt="EHS"
        className="h-full w-auto object-contain scale-[1.6]"
    />,
    // Baboo Logo
    <img
        key="baboo"
        src="/icons_&_images/Client Logos/baboo_logo.svg"
        alt="Baboo"
        className="h-full w-auto object-contain scale-[1.6]"
    />,
];

export default function Marquee() {
    // Reduced duplicates for better performance
    const seamlessLogos = LOGOS;

    return (
        <div className="w-full relative overflow-hidden group">
            {/* Side Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

            {/* Scrolling Container - Optimized with fewer duplicates */}
            <div className="flex w-full overflow-hidden mask-image-linear-to-r">
                <div className="flex animate-marquee gap-10 md:gap-24 pr-10 md:pr-24 items-center min-w-full shrink-0">
                    {seamlessLogos.map((logo, idx) => (
                        <div
                            key={idx}
                            className="h-20 w-48 flex items-center justify-center text-brand-black grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer gpu-accelerate brightness-0 opacity-80"
                        >
                            {logo}
                        </div>
                    ))}
                    {seamlessLogos.map((logo, idx) => (
                        <div
                            key={`dup1-${idx}`}
                            className="h-20 w-48 flex items-center justify-center text-brand-black grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer gpu-accelerate brightness-0 opacity-80"
                        >
                            {logo}
                        </div>
                    ))}
                </div>
                <div className="flex animate-marquee gap-10 md:gap-24 pr-10 md:pr-24 items-center min-w-full shrink-0" aria-hidden="true">
                    {seamlessLogos.map((logo, idx) => (
                        <div
                            key={`dup2-${idx}`}
                            className="h-20 w-48 flex items-center justify-center text-brand-black grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer gpu-accelerate brightness-0 opacity-80"
                        >
                            {logo}
                        </div>
                    ))}
                    {seamlessLogos.map((logo, idx) => (
                        <div
                            key={`dup3-${idx}`}
                            className="h-20 w-48 flex items-center justify-center text-brand-black grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer gpu-accelerate brightness-0 opacity-80"
                        >
                            {logo}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
