"use client";

import { LiquidMetal } from '@paper-design/shaders-react';
import React, { useRef, useState, useEffect } from 'react';

interface LiquidButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function LiquidButton({ children, className = "", onClick }: LiquidButtonProps) {
    // Use a ref to measure the button size if needed, 
    // currently hardcoding a reasonable size for the shader or letting it fill?
    // The shader library asks for width/height. We'll give it a somewhat fixed canvas size but scaled down.

    return (
        <button
            onClick={onClick}
            className={`relative group overflow-hidden rounded-full font-bold transition-all hover:scale-105 active:scale-95 ${className}`}
        // Ensure the button has specific dimensions if the shader needs it, 
        // but 'px-8 py-4' usually defines it. We place the shader absolutely.
        >
            {/* Container for the shader background */}
            <div className="absolute inset-0 z-0 opacity-90 group-hover:opacity-100 transition-opacity">
                {/* 
           Using negative margins or sizing to ensure the "diamond" or liquid 
           covers the whole button area. The user snippet has width 1280.
           We'll try to fit it into the button container.
        */}
                <div className="w-[300px] h-[150px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <LiquidMetal
                        width={600}
                        height={300} // Rendering larger then scaling down for crispness
                        image="https://shaders.paper.design/images/logos/diamond.svg"
                        colorBack="#780000" // Brand Dark
                        colorTint="#c1121f" // Brand Red
                        shape="diamond"
                        repetition={2.0}
                        softness={0.45}
                        shiftRed={0}
                        shiftBlue={0}
                        distortion={0.2} // Added slight distortion for movement
                        contour={0}
                        angle={90}
                        speed={0.5} // Slower speed for elegance
                        scale={1}
                        fit="cover" // Changed to cover to fill the button
                    />
                </div>
            </div>

            {/* Content Overlay */}
            <span className="relative z-10 text-white drop-shadow-md tracking-wide">
                {children}
            </span>

            {/* Shine effect overlay */}
            <div className="absolute inset-0 rounded-full ring-1 ring-white/20 z-20"></div>
        </button>
    );
}
