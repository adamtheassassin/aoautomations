"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidButton from "@/components/LiquidButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getFbCookie, getFbcFromUrl } from "@/utils/facebook";

type StepType =
    | "step1"
    | "step2"
    | "step3"
    | "step4"
    | "step5"
    | "step6"
    | "disqualified-not-detailer"
    | "disqualified-no-budget";

export default function CarDetailingQuizPage() {
    const router = useRouter();
    const [step, setStep] = useState<StepType>("step1");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        isCarDetailer: true,
        avgJobValue: "",
        setupType: "",
        hasAdBudget: true,
        firstName: "",
        phone: "",
        location: "",
        websiteOrSocial: ""
    });

    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [phoneTouched, setPhoneTouched] = useState(false);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const getPhoneErrorMessage = (phoneStr: string): string | null => {
        const trimmed = phoneStr.trim();
        if (!trimmed) return "WhatsApp / phone number is required.";

        const cleaned = trimmed.replace(/[\s\-\(\)\.]/g, "");

        // Must only contain digits and optional leading +
        if (!/^\+?\d+$/.test(cleaned)) {
            return "Phone number must only contain numbers.";
        }

        // UK national format starting with 0
        if (cleaned.startsWith("0")) {
            // UK Mobile (07xxx) - exactly 11 digits
            if (cleaned.startsWith("07")) {
                if (cleaned.length < 11) {
                    return `Missing digits (${cleaned.length}/11 digits). UK mobile numbers must have exactly 11 digits (e.g. 07123 456789).`;
                }
                if (cleaned.length > 11) {
                    return `Too many digits (${cleaned.length}/11 digits). Please check your UK mobile number.`;
                }
                return null;
            }

            // UK Landline (01, 02, 03, 08) - 10 or 11 digits
            if (/^0[1238]/.test(cleaned)) {
                if (cleaned.length < 10) {
                    return `Missing digits (${cleaned.length} digits). UK phone numbers must be 10 or 11 digits.`;
                }
                if (cleaned.length > 11) {
                    return `Too many digits (${cleaned.length}/11 digits).`;
                }
                return null;
            }

            return "UK phone numbers must start with 07 (mobile) or 01/02/03 (landline).";
        }

        // UK international format starting with +44, 0044, or 44
        if (cleaned.startsWith("+44") || cleaned.startsWith("0044") || cleaned.startsWith("44")) {
            let nationalPart = cleaned;
            if (nationalPart.startsWith("+44")) nationalPart = nationalPart.slice(3);
            else if (nationalPart.startsWith("0044")) nationalPart = nationalPart.slice(4);
            else if (nationalPart.startsWith("44")) nationalPart = nationalPart.slice(2);

            // Strip leading 0 if someone entered +44 07...
            if (nationalPart.startsWith("0")) {
                nationalPart = nationalPart.slice(1);
            }

            if (nationalPart.startsWith("7")) {
                if (nationalPart.length < 10) {
                    return `Missing digits after +44 (${nationalPart.length}/10 digits). UK mobile numbers require 10 digits after +44 (e.g. +44 7123 456789).`;
                }
                if (nationalPart.length > 10) {
                    return `Too many digits after +44 for a UK mobile number.`;
                }
                return null;
            }

            if (/^[1238]/.test(nationalPart)) {
                if (nationalPart.length < 9) {
                    return `Missing digits after +44 for a UK number.`;
                }
                if (nationalPart.length > 10) {
                    return `Too many digits after +44 for a UK number.`;
                }
                return null;
            }

            return "Invalid UK number format after +44.";
        }

        return "Only UK phone numbers are accepted (e.g. 07123 456789 or +44 7123 456789).";
    };

    const avgJobOptions = [
        { value: "Under £60", label: "Under £60" },
        { value: "£60–£100", label: "£60–£100" },
        { value: "£100–£150", label: "£100–£150" },
        { value: "£150+", label: "£150+" }
    ];

    const setupOptions = [
        {
            value: "I travel to customers",
            title: "I travel to customers",
            description: "We clean and detail vehicles at customer homes or businesses."
        },
        {
            value: "Customers bring vehicles to me",
            title: "Customers bring vehicles to me",
            description: "We detail and valet vehicles at our own premises, unit, or studio."
        },
        {
            value: "Both",
            title: "Both",
            description: "We visit customers and work from our own premises/unit."
        }
    ];

    const handleStep1 = (answer: boolean) => {
        setFormData((prev) => ({ ...prev, isCarDetailer: answer }));
        if (answer) {
            setStep("step2");
        } else {
            setStep("disqualified-not-detailer");
        }
    };

    const handleStep4 = (answer: boolean) => {
        setFormData((prev) => ({ ...prev, hasAdBudget: answer }));
        if (answer) {
            setStep("step5");
        } else {
            setStep("disqualified-no-budget");
        }
    };

    const handleStep5Continue = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: { [key: string]: string } = {};

        if (!formData.firstName.trim()) {
            errors.firstName = "Please enter your first name.";
        }

        const phoneValidationErr = getPhoneErrorMessage(formData.phone);
        if (phoneValidationErr) {
            errors.phone = phoneValidationErr;
            setPhoneError(phoneValidationErr);
            setPhoneTouched(true);
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        setStep("step6");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors: { [key: string]: string } = {};

        if (!formData.location.trim()) {
            errors.location = "Please enter your town or city.";
        }

        if (!formData.websiteOrSocial.trim()) {
            errors.websiteOrSocial = "Please enter your website or social profile.";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("https://hook.eu2.make.com/fgxu7pagp166o36qexkv9xnlqd9hcig3", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "car-detailing-quiz",
                    country: "UK",
                    isCarDetailer: true,
                    avgJobValue: formData.avgJobValue,
                    setupType: formData.setupType,
                    hasAdBudget: true,
                    firstName: formData.firstName.trim(),
                    phone: formData.phone.trim(),
                    location: formData.location.trim(),
                    websiteOrSocial: formData.websiteOrSocial.trim(),
                    _fbp: getFbCookie("_fbp"),
                    _fbc: getFbCookie("_fbc") || getFbcFromUrl()
                })
            });

            if (response.ok) {
                router.push("/thank-you");
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f5f4ef] flex flex-col justify-between">
            <Navbar />

            <section className="pt-24 pb-12 px-4 sm:px-6 md:pt-32 md:pb-16 flex-1 flex flex-col items-center justify-center">
                {/* Header text above card */}
                <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 px-2">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black italic tracking-tight text-neutral-900 leading-[1.15]">
                        Car Detailers, We&apos;ll Book You 5 Jobs In 5 Days Free Trial, Guaranteed
                    </h1>
                    <p className="text-base sm:text-xl font-medium text-neutral-700 mt-3 sm:mt-4">
                        Or We&apos;ll Continue Working For Free Until We Do
                    </p>
                </div>

                <div className="w-full max-w-lg mx-auto">
                    {/* Card Container */}
                    <div className="bg-white border border-neutral-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm backdrop-blur-md transition-all duration-300">
                        {/* STEP 1: Qualification */}
                        {step === "step1" && (
                            <div className="space-y-6">
                                <h2 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                                    Do you run a car detailing or valeting business in the UK?
                                </h2>

                                <div className="grid grid-cols-2 gap-3 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => handleStep1(true)}
                                        className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 border border-neutral-200 hover:border-brand-green hover:bg-brand-green/5 rounded-xl font-semibold text-sm sm:text-base text-neutral-900 transition-all group shadow-xs cursor-pointer"
                                    >
                                        <span>Yes</span>
                                        <span className="text-neutral-700 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all">→</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleStep1(false)}
                                        className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 rounded-xl font-semibold text-sm sm:text-base text-neutral-900 transition-all group shadow-xs cursor-pointer"
                                    >
                                        <span>No</span>
                                        <span className="text-neutral-700 group-hover:translate-x-0.5 transition-transform">→</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* DISQUALIFIED: Not a car detailer */}
                        {step === "disqualified-not-detailer" && (
                            <div className="text-center space-y-4 py-2">
                                <div className="inline-block px-3 py-1 bg-amber-500/10 rounded-full">
                                    <span className="text-xs font-bold uppercase tracking-widest text-amber-700">Notice</span>
                                </div>

                                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight leading-tight">
                                    We only work with <br />
                                    <span className="text-brand-green italic font-bold">UK car detailers &amp; valeters</span>
                                </h2>

                                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-sm mx-auto">
                                    Our client acquisition systems are specifically built for car detailing and valeting businesses in the UK. Because of this focus, we cannot take on businesses outside this industry at this time.
                                </p>

                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setStep("step1")}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-neutral-900 text-white hover:bg-neutral-800 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm cursor-pointer"
                                    >
                                        ← Go Back
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Average Job Value */}
                        {step === "step2" && (
                            <div className="space-y-5">
                                <h2 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                                    What is the average value of one job?
                                </h2>

                                <div className="space-y-2.5 pt-1">
                                    {avgJobOptions.map((opt) => {
                                        const isSelected = formData.avgJobValue === opt.value;
                                        return (
                                            <button
                                                type="button"
                                                key={opt.value}
                                                onClick={() => setFormData({ ...formData, avgJobValue: opt.value })}
                                                className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 border flex items-center gap-3.5 cursor-pointer ${
                                                    isSelected
                                                        ? "border-brand-green bg-brand-green/10 ring-1 ring-brand-green"
                                                        : "border-neutral-200 hover:border-brand-green/40 hover:bg-brand-green/5 bg-white"
                                                }`}
                                            >
                                                <div
                                                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                                        isSelected
                                                            ? "border-brand-green bg-brand-green"
                                                            : "border-neutral-300 bg-white"
                                                    }`}
                                                >
                                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                </div>
                                                <span className="text-sm sm:text-base font-semibold text-neutral-900">
                                                    {opt.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="pt-2 space-y-3">
                                    <LiquidButton
                                        type="button"
                                        onClick={() => {
                                            if (!formData.avgJobValue) {
                                                alert("Please select your average job value.");
                                                return;
                                            }
                                            setStep("step3");
                                        }}
                                        className="w-full py-3.5 text-base font-bold shadow-lg hover:shadow-xl transition-all"
                                    >
                                        Continue →
                                    </LiquidButton>

                                    <button
                                        type="button"
                                        onClick={() => setStep("step1")}
                                        className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-500 hover:text-neutral-900 mx-auto transition-colors cursor-pointer"
                                    >
                                        ← Back
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Setup Type */}
                        {step === "step3" && (
                            <div className="space-y-5">
                                <h2 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                                    How is your business set up?
                                </h2>

                                <div className="space-y-2.5 pt-1">
                                    {setupOptions.map((opt) => {
                                        const isSelected = formData.setupType === opt.value;
                                        return (
                                            <button
                                                type="button"
                                                key={opt.value}
                                                onClick={() => setFormData({ ...formData, setupType: opt.value })}
                                                className={`w-full text-left p-3.5 sm:p-4 rounded-xl transition-all duration-200 border flex items-start gap-3.5 cursor-pointer ${
                                                    isSelected
                                                        ? "border-brand-green bg-brand-green/10 ring-1 ring-brand-green"
                                                        : "border-neutral-200 hover:border-brand-green/40 hover:bg-brand-green/5 bg-white"
                                                }`}
                                            >
                                                <div
                                                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                                        isSelected
                                                            ? "border-brand-green bg-brand-green"
                                                            : "border-neutral-300 bg-white"
                                                    }`}
                                                >
                                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                </div>
                                                <div>
                                                    <div className="text-sm sm:text-base font-semibold text-neutral-900">
                                                        {opt.title}
                                                    </div>
                                                    <div className="text-xs sm:text-sm text-neutral-500 mt-0.5 leading-snug">
                                                        {opt.description}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="pt-2 space-y-3">
                                    <LiquidButton
                                        type="button"
                                        onClick={() => {
                                            if (!formData.setupType) {
                                                alert("Please select how your business is set up.");
                                                return;
                                            }
                                            setStep("step4");
                                        }}
                                        className="w-full py-3.5 text-base font-bold shadow-lg hover:shadow-xl transition-all"
                                    >
                                        Continue →
                                    </LiquidButton>

                                    <button
                                        type="button"
                                        onClick={() => setStep("step2")}
                                        className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-500 hover:text-neutral-900 mx-auto transition-colors cursor-pointer"
                                    >
                                        ← Back
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: Ad Budget */}
                        {step === "step4" && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                                        Do you have £150 to invest in ads (£30 a day for 5 days)?
                                    </h2>
                                    <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                                        The trial covers our work. You cover the ad budget.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => handleStep4(true)}
                                        className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 border border-neutral-200 hover:border-brand-green hover:bg-brand-green/5 rounded-xl font-semibold text-sm sm:text-base text-neutral-900 transition-all group shadow-xs cursor-pointer"
                                    >
                                        <span>Yes</span>
                                        <span className="text-neutral-700 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all">→</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleStep4(false)}
                                        className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 rounded-xl font-semibold text-sm sm:text-base text-neutral-900 transition-all group shadow-xs cursor-pointer"
                                    >
                                        <span>No</span>
                                        <span className="text-neutral-700 group-hover:translate-x-0.5 transition-transform">→</span>
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setStep("step3")}
                                    className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-500 hover:text-neutral-900 mx-auto transition-colors pt-2 cursor-pointer"
                                >
                                    ← Back
                                </button>
                            </div>
                        )}

                        {/* DISQUALIFIED: No Ad Budget */}
                        {step === "disqualified-no-budget" && (
                            <div className="text-center space-y-4 py-2">
                                <div className="inline-block px-3 py-1 bg-amber-500/10 rounded-full">
                                    <span className="text-xs font-bold uppercase tracking-widest text-amber-700">Notice</span>
                                </div>

                                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight leading-tight">
                                    Ad budget is required for <br />
                                    <span className="text-brand-green italic font-bold">the 5-day free trial</span>
                                </h2>

                                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-sm mx-auto">
                                    The 5-day trial is 100% free of management fees—we don&apos;t charge a penny for our setup or service. However, the £150 ad budget (£30/day) is paid directly to the ad platforms to run the live campaigns and book your 5 guaranteed jobs.
                                </p>

                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setStep("step4")}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-neutral-900 text-white hover:bg-neutral-800 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm cursor-pointer"
                                    >
                                        ← Back &amp; Change Answer
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 5: Contact Details */}
                        {step === "step5" && (
                            <form onSubmit={handleStep5Continue} className="space-y-5">
                                <h2 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                                    Where can we reach you?
                                </h2>

                                <div className="space-y-4 pt-1">
                                    {/* First Name */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="firstName" className="block text-xs font-semibold text-neutral-700">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            placeholder="Your first name"
                                            required
                                            value={formData.firstName}
                                            onChange={(e) => {
                                                setFormData({ ...formData, firstName: e.target.value });
                                                if (formErrors.firstName) {
                                                    setFormErrors({ ...formErrors, firstName: "" });
                                                }
                                            }}
                                            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 font-medium placeholder:text-neutral-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none transition-all text-sm sm:text-base shadow-xs"
                                        />
                                        {formErrors.firstName && (
                                            <p className="text-xs font-medium text-red-600 mt-1">
                                                {formErrors.firstName}
                                            </p>
                                        )}
                                    </div>

                                    {/* WhatsApp Number */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="phone" className="block text-xs font-semibold text-neutral-700">
                                            WhatsApp number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            autoComplete="tel"
                                            placeholder="07700123456"
                                            required
                                            value={formData.phone}
                                            onBlur={() => {
                                                setPhoneTouched(true);
                                                setPhoneError(getPhoneErrorMessage(formData.phone));
                                            }}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setFormData({ ...formData, phone: val });
                                                if (phoneTouched) {
                                                    setPhoneError(getPhoneErrorMessage(val));
                                                }
                                                if (formErrors.phone) {
                                                    setFormErrors({ ...formErrors, phone: "" });
                                                }
                                            }}
                                            className={`w-full bg-white border rounded-xl px-4 py-3 font-medium placeholder:text-neutral-400 focus:ring-4 outline-none transition-all text-sm sm:text-base shadow-xs ${
                                                phoneError && phoneTouched
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20 text-neutral-900 bg-red-50/20"
                                                    : "border-neutral-300 text-neutral-900 focus:border-brand-green focus:ring-brand-green/10"
                                            }`}
                                        />
                                        {phoneError && phoneTouched ? (
                                            <p className="text-xs font-medium text-red-600 flex items-start gap-1.5 mt-1 leading-tight">
                                                <span className="shrink-0 text-red-500">⚠️</span>
                                                <span>{phoneError}</span>
                                            </p>
                                        ) : (
                                            <p className="text-[11px] text-neutral-500 mt-1">
                                                Digits only, at least 10.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-2 space-y-3">
                                    <LiquidButton
                                        type="submit"
                                        className="w-full py-3.5 text-base font-bold shadow-lg hover:shadow-xl transition-all"
                                    >
                                        Continue →
                                    </LiquidButton>

                                    <button
                                        type="button"
                                        onClick={() => setStep("step4")}
                                        className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-500 hover:text-neutral-900 mx-auto transition-colors cursor-pointer"
                                    >
                                        ← Back
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* STEP 6: Town / City and Website (Last page) */}
                        {step === "step6" && (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <h2 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                                    Where is your business located?
                                </h2>

                                <div className="space-y-4 pt-1">
                                    {/* Town / City */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="location" className="block text-xs font-semibold text-neutral-700">
                                            Town / City
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            placeholder="e.g. Manchester, Birmingham, Leeds"
                                            required
                                            value={formData.location}
                                            onChange={(e) => {
                                                setFormData({ ...formData, location: e.target.value });
                                                if (formErrors.location) {
                                                    setFormErrors({ ...formErrors, location: "" });
                                                }
                                            }}
                                            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 font-medium placeholder:text-neutral-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none transition-all text-sm sm:text-base shadow-xs"
                                        />
                                        {formErrors.location && (
                                            <p className="text-xs font-medium text-red-600 mt-1">
                                                {formErrors.location}
                                            </p>
                                        )}
                                    </div>

                                    {/* Website */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="websiteOrSocial" className="block text-xs font-semibold text-neutral-700">
                                            Website
                                        </label>
                                        <input
                                            type="text"
                                            id="websiteOrSocial"
                                            placeholder="e.g. https://yourbusiness.co.uk or Instagram link"
                                            required
                                            value={formData.websiteOrSocial}
                                            onChange={(e) => {
                                                setFormData({ ...formData, websiteOrSocial: e.target.value });
                                                if (formErrors.websiteOrSocial) {
                                                    setFormErrors({ ...formErrors, websiteOrSocial: "" });
                                                }
                                            }}
                                            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 font-medium placeholder:text-neutral-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none transition-all text-sm sm:text-base shadow-xs"
                                        />
                                        {formErrors.websiteOrSocial && (
                                            <p className="text-xs font-medium text-red-600 mt-1">
                                                {formErrors.websiteOrSocial}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-2 space-y-3">
                                    <LiquidButton
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3.5 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl hover:shadow-brand-green/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Submitting..." : "Submit Details →"}
                                    </LiquidButton>

                                    <button
                                        type="button"
                                        onClick={() => setStep("step5")}
                                        className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-500 hover:text-neutral-900 mx-auto transition-colors cursor-pointer"
                                    >
                                        ← Back
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
