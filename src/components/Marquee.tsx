import React from "react";

const LOGOS = [
    // EAR Logo
    <img
        key="ear"
        src="/icons_&_images/Client Logos/ear logo menu bar.png"
        alt="EAR Engineering"
        className="h-full w-auto object-contain scale-[1.2]"
    />,
    // Naturelle Logo
    <img
        key="naturelle"
        src="/icons_&_images/Client Logos/Naturelle-Logo.png"
        alt="Naturelle"
        className="h-full w-auto object-contain"
    />,
    // Xternal Shine Logo
    <img
        key="xternalshine"
        src="/icons_&_images/Client Logos/xternalshine-logo.png"
        alt="Xternal Shine"
        className="h-full w-auto object-contain"
    />,

    // Get Keys Logo
    <img
        key="getkeys"
        src="/icons_&_images/Client Logos/getkeys.png"
        alt="Get Keys Auto Locksmith"
        className="h-full w-auto object-contain"
    />,
    // Dr Piet Slabber Logo
    <a
        key="dr-slabber"
        href="https://somersetwestdentist.co.za"
        rel="dofollow"
        target="_blank"
        className="h-full w-auto flex items-center justify-center"
    >
        <img
            src="/icons_&_images/Client Logos/dr slabber.png"
            alt="Dr. Piet Slabber Dentist Somerset West"
            className="h-full w-auto object-contain"
        />
    </a>,
    // Kebabish Logo
    <img
        key="kebabish"
        src="/icons_&_images/Client Logos/Kebabish_Logo-removebg-preview.webp"
        alt="Kebabish"
        className="h-full w-auto object-contain"
    />,
    // AAA Locksmith Logo
    <a
        key="aaa-locksmith"
        href="https://aaalocksmiths.co.za"
        rel="dofollow"
        target="_blank"
        className="h-[85%] w-auto flex items-center justify-center"
    >
        <img
            src="/icons_&_images/Client Logos/AAA_Locksmith_Logo.png"
            alt="AAA Locksmith"
            className="h-full w-auto object-contain"
        />
    </a>,
    // MaxFlex Logo
    <img
        key="maxflex"
        src="/icons_&_images/Client Logos/maxflexlogo.png"
        alt="MaxFlex Mobile Rubberising"
        className="h-full w-auto object-contain"
    />,
    // Security Direct Logo
    <a
        key="security-direct"
        href="https://securitydirect.co.za"
        rel="dofollow"
        target="_blank"
        className="h-full w-auto flex items-center justify-center"
    >
        <img
            src="/icons_&_images/Client Logos/security direct logo.png"
            alt="Security Direct"
            className="h-full w-auto object-contain"
        />
    </a>,
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
                            className="h-20 w-48 flex items-center justify-center text-brand-black opacity-90 hover:opacity-100 transition-all duration-300 cursor-pointer gpu-accelerate"
                        >
                            {logo}
                        </div>
                    ))}
                    {seamlessLogos.map((logo, idx) => (
                        <div
                            key={`dup1-${idx}`}
                            className="h-20 w-48 flex items-center justify-center text-brand-black opacity-90 hover:opacity-100 transition-all duration-300 cursor-pointer gpu-accelerate"
                        >
                            {logo}
                        </div>
                    ))}
                </div>
                <div className="flex animate-marquee gap-10 md:gap-24 pr-10 md:pr-24 items-center min-w-full shrink-0" aria-hidden="true">
                    {seamlessLogos.map((logo, idx) => (
                        <div
                            key={`dup2-${idx}`}
                            className="h-20 w-48 flex items-center justify-center text-brand-black opacity-90 hover:opacity-100 transition-all duration-300 cursor-pointer gpu-accelerate"
                        >
                            {logo}
                        </div>
                    ))}
                    {seamlessLogos.map((logo, idx) => (
                        <div
                            key={`dup3-${idx}`}
                            className="h-20 w-48 flex items-center justify-center text-brand-black opacity-90 hover:opacity-100 transition-all duration-300 cursor-pointer gpu-accelerate"
                        >
                            {logo}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
