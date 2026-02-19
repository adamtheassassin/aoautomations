"use client";

import React, { useEffect, useState } from 'react';
import LiquidButton from './LiquidButton';

interface SubmissionSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
}

export default function SubmissionSuccessModal({
    isOpen,
    onClose,
    title = "Success!",
    message = "We've received your details and will be in touch shortly."
}: SubmissionSuccessModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            // Prevent scrolling when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Wait for animation
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                className={`
                    relative w-full max-w-md bg-white rounded-[2rem] p-8 md:p-10 text-center 
                    shadow-2xl border border-brand-red/10 overflow-hidden
                    transform transition-all duration-300 ease-out
                    ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
                `}
            >
                {/* Decorative Background Blob */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-cream rounded-full blur-3xl pointer-events-none"></div>

                {/* Animated Checkmark Icon */}
                <div className="relative mb-6 mx-auto w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                    <div className="relative w-full h-full bg-green-50 rounded-full flex items-center justify-center text-green-500 shadow-sm border border-green-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="drop-shadow-sm"
                        >
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                </div>

                <h3 className="text-3xl font-bold text-brand-black mb-4 tracking-tight leading-tight relative z-10">
                    {title}
                </h3>

                <p className="text-brand-gray text-lg mb-8 leading-relaxed relative z-10">
                    {message}
                </p>

                <div className="relative z-10">
                    <LiquidButton
                        onClick={onClose}
                        className="w-full py-4 text-lg shadow-lg"
                    >
                        Awesome
                    </LiquidButton>
                </div>
            </div>
        </div>
    );
}
