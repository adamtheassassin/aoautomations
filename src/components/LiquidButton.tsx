"use client";

import React from 'react';

interface LiquidButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function LiquidButton({ children, className = "", onClick, disabled }: LiquidButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                relative group inline-flex items-center justify-center 
                rounded-full transition-all duration-300 
                bg-gradient-to-b from-[#D92323] via-[#B90E0E] to-[#980404]
                border-[3px] border-[#FF6B6B] 
                shadow-[0_0_15px_rgba(217,35,35,0.4),0_8px_15px_rgba(0,0,0,0.2)]
                hover:shadow-[0_0_25px_rgba(217,35,35,0.6),0_8px_20px_rgba(0,0,0,0.3)]
                hover:scale-[1.02] active:scale-95
                hover:border-[#FF8585]
                text-white font-bold tracking-wide
                ${className}
            `}
        >
            {/* Top Gloss Highlight - Creates the 'glassy' 3D look */}
            <div className="absolute inset-x-4 top-0 h-[50%] bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none opacity-80"></div>

            {/* Inner Glow Rim */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] pointer-events-none"></div>

            {/* Bottom Shade - Adds weight */}
            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/20 to-transparent rounded-b-full pointer-events-none"></div>

            <span className="relative z-10 flex items-center gap-2 drop-shadow-md text-shadow">
                {children}
            </span>
        </button>
    );
}
