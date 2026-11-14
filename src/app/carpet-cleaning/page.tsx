"use client";

import LiquidButton from "@/components/LiquidButton";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getFbCookie, getFbcFromUrl } from "@/utils/facebook";
import { getUkPhoneErrorMessage } from "@/utils/ukPhone";

type StepType =
    | "business"
    | "budget"
    | "name"
    | "phone"
    | "disqualified-not-cleaner"
    | "disqualified-no-budget";

const STEP_ORDER: StepType[] = ["business", "budget", "name", "phone"];

// How long the tapped answer stays highlighted before the next step slides in
const PICK_DELAY_MS = 380;

const RESULTS_DIR = "/Carpet%20cleaning%20results";

// Ordered highest value first
const RESULTS = [
    {
        src: `${RESULTS_DIR}/carpet-cleaning-meta-win-1.jpg`,
        alt: "WhatsApp message from a carpet cleaning client: So far trade £4000."
    },
    {
        src: `${RESULTS_DIR}/carpet-cleaning-meta-win-3.jpg`,
        alt: "WhatsApp message from a carpet cleaning client: We have booked five jobs totalling £1380."
    },
    {
        src: `${RESULTS_DIR}/carpet-cleaning-meta-win-6.jpg`,
        alt: "WhatsApp chat where a carpet cleaning client says he booked 10 jobs worth £800 in total."
    },
    {
        src: `${RESULTS_DIR}/carpet-cleaning-meta-win-5.jpg`,
        alt: "WhatsApp message from a carpet cleaning client: 8 jobs confirmed, £775 total."
    },
    {
        src: `${RESULTS_DIR}/carpet-cleaning-meta-win-4.jpg`,
        alt: "WhatsApp message from a carpet cleaning client saying he booked £520 of jobs from the trial leads."
    },
    {
        src: `${RESULTS_DIR}/carpet-cleaning-meta-win-2.jpg`,
        alt: "WhatsApp chat where a carpet cleaning client confirms 6 jobs worth around £500."
    }
];

/* ---------- Icons ---------- */

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

const CrossIcon = ({ className }: IconProps) => (
    <svg {...iconBase} strokeWidth={3} className={className}>
        <path d="M6 6l12 12M18 6L6 18" />
    </svg>
);

// Upright carpet cleaning machine with a clean-sparkle
const CarpetCleanerIcon = ({ className }: IconProps) => (
    <svg {...iconBase} strokeWidth={1.75} className={className}>
        <path d="M21 2.5l-3 1-2.2 4.6" />
        <rect x="10.6" y="7.2" width="6" height="9" rx="3" transform="rotate(26 13.6 11.7)" />
        <path d="M11.5 15.8l-.8 1.7" />
        <path d="M2.5 21v-.5a3 3 0 013-3h7a2.5 2.5 0 012.5 2.5v1z" />
        <path d="M18.5 21h3" />
        <path d="M5.5 3c.4 2.6 1.4 3.6 4 4-2.6.4-3.6 1.4-4 4-.4-2.6-1.4-3.6-4-4 2.6-.4 3.6-1.4 4-4z" />
    </svg>
);

const PoundIcon = ({ className }: IconProps) => (
    <svg {...iconBase} className={className}>
        <circle cx="12" cy="12" r="9" />
        <path d="M15 9.2A2.6 2.6 0 0012.6 7.5c-1.5 0-2.6 1.1-2.6 2.6 0 1.6.9 2.6.9 4.2 0 .9-.5 1.7-1.4 2.2H15" />
        <path d="M8.8 12.5h4.4" />
    </svg>
);

const UserIcon = ({ className }: IconProps) => (
    <svg {...iconBase} className={className}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
    </svg>
);

const PhoneIcon = ({ className }: IconProps) => (
    <svg {...iconBase} className={className}>
        <path d="M5.5 3.5h3l1.6 4.2-2 1.5a12 12 0 006.7 6.7l1.5-2 4.2 1.6v3a2 2 0 01-2.2 2A17 17 0 013.5 5.7a2 2 0 012-2.2z" />
    </svg>
);

const ArrowLeftIcon = ({ className }: IconProps) => (
    <svg {...iconBase} className={className}>
        <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
);

const ArrowRightIcon = ({ className }: IconProps) => (
    <svg {...iconBase} strokeWidth={2.5} className={className}>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

const ZoomIcon = ({ className }: IconProps) => (
    <svg {...iconBase} className={className}>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M20 20l-4.3-4.3M11 8.5v5M8.5 11h5" />
    </svg>
);

const LockIcon = ({ className }: IconProps) => (
    <svg {...iconBase} className={className}>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 018 0v3" />
    </svg>
);

/* ---------- Building blocks ---------- */

function ChoiceButton({
    label,
    hint,
    tone,
    selected,
    dimmed,
    disabled,
    onClick
}: {
    label: string;
    hint: string;
    tone: "yes" | "no";
    selected: boolean;
    dimmed: boolean;
    disabled: boolean;
    onClick: () => void;
}) {
    const isYes = tone === "yes";

    const idle = isYes
        ? "bg-white border-neutral-200 text-neutral-900 hover:border-brand-green hover:bg-brand-green/5 hover:-translate-y-0.5 hover:shadow-md"
        : "bg-white border-neutral-200 text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 hover:-translate-y-0.5 hover:shadow-md";
    const picked = isYes
        ? "bg-brand-green border-[#125a21] text-white shadow-lg shadow-brand-green/30"
        : "bg-brand-dark border-[#071a30] text-white shadow-lg shadow-brand-dark/30";

    const badgeIdle = isYes
        ? "bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white group-hover:scale-110 group-hover:-rotate-6"
        : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-800 group-hover:text-white group-hover:scale-110 group-hover:rotate-6";
    const badgePicked = isYes ? "bg-white text-brand-green animate-pop" : "bg-white text-brand-dark animate-pop";

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-pressed={selected}
            className={`group relative w-full flex flex-col items-center gap-3 rounded-2xl border-2 border-b-[6px] px-3 py-5 sm:py-6 select-none cursor-pointer transition-all duration-150 active:translate-y-1 active:border-b-2 active:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/25 disabled:cursor-default ${
                selected ? picked : idle
            } ${dimmed ? "opacity-40 scale-[0.97]" : ""}`}
        >
            <span
                className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-200 ${
                    selected ? badgePicked : badgeIdle
                }`}
            >
                {isYes ? <CheckIcon className="w-6 h-6 sm:w-7 sm:h-7" /> : <CrossIcon className="w-6 h-6 sm:w-7 sm:h-7" />}
            </span>
            <span className="text-center">
                <span className="block text-lg sm:text-xl font-bold leading-tight">{label}</span>
                <span className={`block text-xs mt-0.5 ${selected ? "text-white/80" : "text-neutral-500"}`}>{hint}</span>
            </span>
        </button>
    );
}

function StepHeading({
    icon,
    title,
    subtitle
}: {
    icon: React.ReactNode;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-green/10 text-brand-green mb-4 animate-pop">
                {icon}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug">{title}</h2>
            {subtitle && <p className="text-xs sm:text-sm text-neutral-500 mt-1.5 max-w-sm">{subtitle}</p>}
        </div>
    );
}

function BackButton({ onClick, children = "Back" }: { onClick: () => void; children?: React.ReactNode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-500 hover:text-neutral-900 mx-auto transition-colors cursor-pointer"
        >
            <ArrowLeftIcon className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            {children}
        </button>
    );
}

/* ---------- Page ---------- */

export default function CarpetCleaningQuizPage() {
    const router = useRouter();
    const [step, setStep] = useState<StepType>("business");
    const [picked, setPicked] = useState<"yes" | "no" | null>(null);
    const [loading, setLoading] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [phone, setPhone] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [phoneTouched, setPhoneTouched] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const pickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => () => {
        if (pickTimer.current) clearTimeout(pickTimer.current);
    }, []);

    const [zoomed, setZoomed] = useState<number | null>(null);
    useEffect(() => {
        if (zoomed === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setZoomed(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [zoomed]);

    const stepIndex = STEP_ORDER.indexOf(step);
    const phoneIsValid = phone.trim() !== "" && getUkPhoneErrorMessage(phone) === null;

    // Highlight the tapped answer briefly, then move on
    const choose = (answer: "yes" | "no", next: StepType) => {
        if (picked) return;
        setPicked(answer);
        pickTimer.current = setTimeout(() => {
            setPicked(null);
            setStep(next);
        }, PICK_DELAY_MS);
    };

    const handleNameContinue = (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName.trim()) {
            setNameError("Please enter your first name.");
            return;
        }
        setNameError(null);
        setStep("phone");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        const validationError = getUkPhoneErrorMessage(phone);
        if (validationError) {
            setPhoneError(validationError);
            setPhoneTouched(true);
            return;
        }

        setSubmitError(null);
        setLoading(true);

        try {
            const response = await fetch("https://hook.eu2.make.com/fgxu7pagp166o36qexkv9xnlqd9hcig3", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "carpet-cleaning-quiz",
                    country: "UK",
                    isCarpetCleaner: true,
                    hasAdBudget: true,
                    firstName: firstName.trim(),
                    phone: phone.trim(),
                    _fbp: getFbCookie("_fbp"),
                    _fbc: getFbCookie("_fbc") || getFbcFromUrl()
                })
            });

            if (response.ok) {
                router.push("/carpet-cleaning/thank-you");
                return;
            }
            setSubmitError("Something went wrong. Please try again.");
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitError("Something went wrong. Please try again.");
        }
        setLoading(false);
    };

    const inputBase =
        "w-full bg-white border-2 rounded-xl pl-12 pr-11 py-3.5 text-neutral-900 font-medium placeholder:text-neutral-400 focus:ring-4 outline-none transition-all text-base shadow-xs";

    return (
        <main className="min-h-screen bg-[#f5f4ef] flex flex-col items-center py-12 sm:py-16 md:py-20 px-4 sm:px-6">
            <section className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
                {/* Header text above card */}
                <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 px-2">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black italic tracking-tight text-neutral-900 leading-[1.15]">
                        Carpet Cleaners, We&apos;ll Book You 5 Jobs In 5 Days Free Trial, Guaranteed
                    </h1>
                </div>

                <div className="w-full max-w-lg mx-auto">
                    <div className="bg-white border border-neutral-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm overflow-hidden">
                        {/* Progress */}
                        {stepIndex >= 0 && (
                            <div className="mb-7">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-brand-green">
                                        Step {stepIndex + 1} of {STEP_ORDER.length}
                                    </span>
                                    <span className="text-[11px] font-medium text-neutral-400">Takes 30 seconds</span>
                                </div>
                                <div
                                    className="flex gap-1.5"
                                    role="progressbar"
                                    aria-valuemin={1}
                                    aria-valuemax={STEP_ORDER.length}
                                    aria-valuenow={stepIndex + 1}
                                >
                                    {STEP_ORDER.map((s, i) => (
                                        <div key={s} className="h-1.5 flex-1 rounded-full bg-neutral-200 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full bg-brand-green transition-transform duration-500 ease-out origin-left ${
                                                    i <= stepIndex ? "scale-x-100" : "scale-x-0"
                                                }`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div key={step} className="animate-step-in">
                            {/* STEP 1: Carpet cleaning business? */}
                            {step === "business" && (
                                <div className="space-y-6">
                                    <StepHeading
                                        icon={<CarpetCleanerIcon className="w-9 h-9" />}
                                        title="Do you run a carpet cleaning business?"
                                    />

                                    <div className="grid grid-cols-2 gap-3">
                                        <ChoiceButton
                                            tone="yes"
                                            label="Yes"
                                            hint="That's me"
                                            selected={picked === "yes"}
                                            dimmed={picked === "no"}
                                            disabled={picked !== null}
                                            onClick={() => choose("yes", "budget")}
                                        />
                                        <ChoiceButton
                                            tone="no"
                                            label="No"
                                            hint="Different trade"
                                            selected={picked === "no"}
                                            dimmed={picked === "yes"}
                                            disabled={picked !== null}
                                            onClick={() => choose("no", "disqualified-not-cleaner")}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* DISQUALIFIED: Not a carpet cleaner */}
                            {step === "disqualified-not-cleaner" && (
                                <div className="text-center space-y-4 py-2">
                                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight leading-tight">
                                        This offer is only for <br />
                                        <span className="text-brand-green italic font-bold">carpet cleaning businesses</span>
                                    </h2>

                                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-sm mx-auto">
                                        This 5-day trial is built specifically for carpet cleaning businesses, so we can&apos;t take on businesses outside this industry through this page.
                                    </p>

                                    <div className="pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setStep("business")}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-neutral-900 text-white hover:bg-neutral-800 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm cursor-pointer"
                                        >
                                            <ArrowLeftIcon className="w-4 h-4" />
                                            Go Back
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: Ad budget */}
                            {step === "budget" && (
                                <div className="space-y-6">
                                    <StepHeading
                                        icon={<PoundIcon className="w-7 h-7" />}
                                        title="Do you have £150 to spend on ads for the 5-day trial?"
                                        subtitle="That's £30 a day for 5 days. The trial covers our work. You cover the ad budget."
                                    />

                                    <div className="grid grid-cols-2 gap-3">
                                        <ChoiceButton
                                            tone="yes"
                                            label="Yes"
                                            hint="I've got £150"
                                            selected={picked === "yes"}
                                            dimmed={picked === "no"}
                                            disabled={picked !== null}
                                            onClick={() => choose("yes", "name")}
                                        />
                                        <ChoiceButton
                                            tone="no"
                                            label="No"
                                            hint="Not right now"
                                            selected={picked === "no"}
                                            dimmed={picked === "yes"}
                                            disabled={picked !== null}
                                            onClick={() => choose("no", "disqualified-no-budget")}
                                        />
                                    </div>

                                    <BackButton onClick={() => setStep("business")} />
                                </div>
                            )}

                            {/* DISQUALIFIED: No ad budget */}
                            {step === "disqualified-no-budget" && (
                                <div className="text-center space-y-4 py-2">
                                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight leading-tight">
                                        Ad budget is required for <br />
                                        <span className="text-brand-green italic font-bold">the 5-day free trial</span>
                                    </h2>

                                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-sm mx-auto">
                                        The 5-day trial is 100% free of management fees. We don&apos;t charge a penny for our setup or service. However, the £150 ad budget (£30/day) is paid directly to the ad platforms to run the live campaigns and book your 5 guaranteed jobs.
                                    </p>

                                    <div className="pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setStep("budget")}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-neutral-900 text-white hover:bg-neutral-800 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm cursor-pointer"
                                        >
                                            <ArrowLeftIcon className="w-4 h-4" />
                                            Back &amp; Change Answer
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Name */}
                            {step === "name" && (
                                <form onSubmit={handleNameContinue} className="space-y-6" noValidate>
                                    <StepHeading
                                        icon={<UserIcon className="w-7 h-7" />}
                                        title="You qualify. What's your first name?"
                                    />

                                    <div>
                                        <label htmlFor="firstName" className="sr-only">
                                            First name
                                        </label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                autoComplete="given-name"
                                                autoFocus
                                                placeholder="Your first name"
                                                value={firstName}
                                                onChange={(e) => {
                                                    setFirstName(e.target.value);
                                                    if (nameError) setNameError(null);
                                                }}
                                                className={`${inputBase} ${
                                                    nameError
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                                        : "border-neutral-200 focus:border-brand-green focus:ring-brand-green/10"
                                                }`}
                                            />
                                            {firstName.trim() && (
                                                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-brand-green text-white animate-pop">
                                                    <CheckIcon className="w-3.5 h-3.5" />
                                                </span>
                                            )}
                                        </div>
                                        {nameError && <p className="text-xs font-medium text-red-600 mt-1.5">{nameError}</p>}
                                    </div>

                                    <div className="space-y-3">
                                        <LiquidButton
                                            type="submit"
                                            className="w-full py-3.5 text-base font-bold shadow-lg hover:shadow-xl transition-all"
                                        >
                                            Continue
                                            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </LiquidButton>

                                        <BackButton onClick={() => setStep("budget")} />
                                    </div>
                                </form>
                            )}

                            {/* STEP 4: Phone */}
                            {step === "phone" && (
                                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                    <StepHeading
                                        icon={<PhoneIcon className="w-7 h-7" />}
                                        title={
                                            <>
                                                Last one, {firstName.trim()}. What&apos;s your phone number?
                                            </>
                                        }
                                    />

                                    <div>
                                        <label htmlFor="phone" className="sr-only">
                                            Phone number
                                        </label>
                                        <div className="relative">
                                            <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                autoComplete="tel"
                                                autoFocus
                                                placeholder="07700 123456"
                                                value={phone}
                                                onBlur={() => {
                                                    if (!phone.trim()) return;
                                                    setPhoneTouched(true);
                                                    setPhoneError(getUkPhoneErrorMessage(phone));
                                                }}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setPhone(val);
                                                    if (phoneTouched) setPhoneError(getUkPhoneErrorMessage(val));
                                                }}
                                                className={`${inputBase} ${
                                                    phoneError && phoneTouched
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50/20"
                                                        : "border-neutral-200 focus:border-brand-green focus:ring-brand-green/10"
                                                }`}
                                            />
                                            {phoneIsValid && (
                                                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-brand-green text-white animate-pop">
                                                    <CheckIcon className="w-3.5 h-3.5" />
                                                </span>
                                            )}
                                        </div>
                                        {phoneError && phoneTouched ? (
                                            <p className="text-xs font-medium text-red-600 mt-1.5 leading-tight">{phoneError}</p>
                                        ) : (
                                            <p className="text-[11px] text-neutral-500 mt-1.5">UK numbers only, e.g. 07700 123456.</p>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <LiquidButton
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-3.5 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl hover:shadow-brand-green/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                "Submitting..."
                                            ) : (
                                                <>
                                                    Claim My Free Trial
                                                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </>
                                            )}
                                        </LiquidButton>

                                        {submitError && (
                                            <p role="alert" className="text-xs font-medium text-red-600 text-center">
                                                {submitError}
                                            </p>
                                        )}

                                        <p className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
                                            <LockIcon className="w-3 h-3" />
                                            Your details stay private.
                                        </p>

                                        <BackButton onClick={() => setStep("name")} />
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Proof: client results */}
            <section className="w-full max-w-5xl mx-auto mt-16 sm:mt-24">
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
                    <h2 className="text-2xl sm:text-4xl font-black italic tracking-tight text-neutral-900 leading-tight">
                        What Carpet Cleaners Are Booking With Us
                    </h2>
                </div>

                {/* Swipeable row on mobile, grid from sm up */}
                <ul className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {RESULTS.map((result, i) => (
                        <li key={result.src} className="snap-center shrink-0 w-[72%] sm:w-auto">
                            <button
                                type="button"
                                onClick={() => setZoomed(i)}
                                aria-label={`Enlarge screenshot ${i + 1} of ${RESULTS.length}`}
                                className="group block w-full text-left bg-white border border-neutral-200/80 rounded-2xl p-2.5 shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-brand-green/40 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/25"
                            >
                                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-neutral-900">
                                    <Image
                                        src={result.src}
                                        alt={result.alt}
                                        fill
                                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 30vw, 72vw"
                                        className="object-cover"
                                    />
                                    <span className="absolute bottom-2.5 right-2.5 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-neutral-900 shadow-md transition-transform duration-200 group-hover:scale-110">
                                        <ZoomIcon className="w-4.5 h-4.5" />
                                    </span>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="text-center mt-8 sm:mt-12">
                    <LiquidButton
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="px-8 py-3.5 text-base font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                        Claim My Free Trial
                        <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </LiquidButton>
                    <p className="text-[11px] text-neutral-500 mt-3">Results vary from business to business.</p>
                </div>
            </section>

            {/* Lightbox */}
            {zoomed !== null && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Client result screenshot"
                    onClick={() => setZoomed(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 cursor-zoom-out"
                >
                    <button
                        type="button"
                        autoFocus
                        aria-label="Close"
                        onClick={() => setZoomed(null)}
                        className="absolute top-4 right-4 flex items-center justify-center w-11 h-11 rounded-full bg-white text-neutral-900 shadow-lg cursor-pointer transition-transform hover:scale-110 active:scale-95"
                    >
                        <CrossIcon className="w-5 h-5" />
                    </button>
                    <div className="relative h-full max-h-[90vh] aspect-[9/16] max-w-full animate-pop">
                        <Image
                            src={RESULTS[zoomed].src}
                            alt={RESULTS[zoomed].alt}
                            fill
                            sizes="(min-width: 640px) 50vh, 100vw"
                            className="object-contain rounded-2xl"
                        />
                    </div>
                </div>
            )}
        </main>
    );
}
