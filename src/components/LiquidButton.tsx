"use client";

import { LiquidMetal } from '@paper-design/shaders-react';
import React, { useEffect, useRef, useState } from 'react';

interface LiquidButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function LiquidButton({ children, className = "", onClick }: LiquidButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Only render shader when button is actually visible
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            {
                rootMargin: '100px', // Pre-load slightly before it comes into view
                threshold: 0
            }
        );

        if (buttonRef.current) {
            observer.observe(buttonRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className={`relative group inline-flex items-center justify-center overflow-hidden rounded-full font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
        >
            {/* Liquid Border Layer - Only render expensive shader when visible */}
            <div className="absolute inset-0 z-0 bg-brand-black">
                {isVisible && (
                    <div className="absolute inset-[-50%] w-[200%] h-[200%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-500">
                        <LiquidMetal
                            width={600}
                            height={600}
                            image="https://shaders.paper.design/images/logos/diamond.svg"
                            colorBack="#0C2B4E" // Brand Dark (Navy)
                            colorTint="#980404" // Brand Red (Deep)
                            shape="diamond"
                            repetition={2.5}
                            softness={0.4}
                            shiftRed={0.1}
                            shiftBlue={-0.1}
                            distortion={0.6}
                            contour={0}
                            angle={45}
                            speed={1.0}
                            scale={1.2}
                            fit="cover"
                        />
                    </div>
                )}
            </div>

            {/* Inner Mask (Creates the outline effect) */}
            <div className="absolute inset-[5px] rounded-full bg-brand-cream z-0 transition-colors duration-300 group-hover:bg-white"></div>

            {/* Content Overlay */}
            <span className="relative z-10 text-brand-black group-hover:text-brand-red transition-colors duration-300 tracking-wide px-6 py-3">
                {children}
            </span>
        </button>
    );
}
