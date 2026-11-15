"use client";

import { useEffect } from "react";
import { trackOaiq } from "@/utils/oaiq";
import { trackFbq } from "@/utils/fbq";

type IconProps = { className?: string };

const iconBase = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
};

const CheckIcon = ({ className }: IconProps) => (
    <svg {...iconBase} strokeWidth={3} className={className}>
        <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
);

const PhoneIcon = ({ className }: IconProps) => (
    <svg {...iconBase} className={className}>
        <path d="M5.5 3.5h3l1.6 4.2-2 1.5a12 12 0 006.7 6.7l1.5-2 4.2 1.6v3a2 2 0 01-2.2 2A17 17 0 013.5 5.7a2 2 0 012-2.2z" />
    </svg>
);

const ChatIcon = ({ className }: IconProps) => (
    <svg {...iconBase} className={className}>
        <path d="M4 5.5h16v11H10l-4.5 3.5v-3.5H4z" />
        <path d="M8 9.5h8M8 12.5h5" />
    </svg>
);

const RocketIcon = ({ className }: IconProps) => (
    <svg {...iconBase} className={className}>
        <path d="M12 15l-3-3c.6-3.900 3.200-7.500 9.500-8.500C17.500 9.800 13.900 12.400 10 13" transform="translate(1 1)" />
        <path d="M9 12.500l-4 .5 2.500-3.500M12.500 16l-.5 4 3.500-2.500" transform="translate(0 -1)" />
        <path d="M5.500 16.500c-1 .8-1.500 2.500-1.500 4 1.500 0 3.200-.5 4-1.500" />
    </svg>
);

const STEPS = [
    {
        icon: PhoneIcon,
        title: "Expect a call from us soon",
        body: "We'll ring the number you just gave us. Keep your phone close and pick up, even if you don't recognise the number."
    },
    {
        icon: ChatIcon,
        title: "We go over the offer with you",
        body: "On the call we'll walk you through the 5-day trial and explain all the details, including how the £150 ad budget works."
    },
    {
        icon: RocketIcon,
        title: "We get your trial started",
        body: "Ask us anything you like. If you're happy, we set everything up and start your 5 days."
    }
];

export default function CarpetCleaningThankYouPage() {
    useEffect(() => {
        let leadEventId: string | undefined;
        try {
            leadEventId = sessionStorage.getItem("cc_lead_event_id") || undefined;
        } catch {}
        trackFbq("Lead", { content_name: "carpet-cleaning-quiz" }, leadEventId);

        trackOaiq("lead_created", {
            type: "customer_action"
        });
        trackOaiq("registration_completed", {
            type: "customer_action",
            amount: 0,
            currency: "USD"
        });
    }, []);

    return (
        <main className="min-h-screen bg-[#f5f4ef] flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6">
            <section className="w-full max-w-xl mx-auto animate-step-in">
                <div className="text-center mb-8 sm:mb-10 px-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-green text-white shadow-lg shadow-brand-green/30 mb-6 animate-pop">
                        <CheckIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black italic tracking-tight text-neutral-900 leading-[1.15]">
                        You&apos;re In. Expect A Call From Us Soon
                    </h1>
                </div>

                <div className="bg-white border border-neutral-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
                    <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-6">What happens next</h2>

                    <ol className="space-y-6">
                        {STEPS.map((s, i) => (
                            <li key={s.title} className="relative flex gap-4">
                                {i < STEPS.length - 1 && (
                                    <span className="absolute left-6 top-12 -bottom-6 w-0.5 -translate-x-1/2 bg-brand-green/15" aria-hidden />
                                )}
                                <span className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green shrink-0">
                                    <s.icon className="w-6 h-6" />
                                    <span className="absolute -top-1.5 -left-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-brand-green text-white text-[11px] font-bold">
                                        {i + 1}
                                    </span>
                                </span>
                                <div className="pt-0.5">
                                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">{s.title}</h3>
                                    <p className="text-sm text-neutral-600 leading-relaxed mt-1">{s.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="text-center mt-8">
                    <p className="text-sm text-neutral-600 mb-3">Don&apos;t want to wait for the call?</p>
                    <a
                        href="https://wa.me/447936818258"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-white text-base font-bold bg-gradient-to-b from-[#22c55e] via-[#16a34a] to-[#15803d] border-[3px] border-[#4ade80] shadow-[0_0_15px_rgba(34,197,94,0.4),0_8px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6),0_8px_20px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
                    >
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                        </svg>
                        Message us on WhatsApp
                    </a>
                </div>
            </section>
        </main>
    );
}
