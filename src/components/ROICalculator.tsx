"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import LiquidButton from './LiquidButton';
import { useCurrency } from '@/context/CurrencyContext';

type ServiceData = {
    label: string;
    searches: number;
    value: number;
};

const SERVICES_US: ServiceData[] = [
    { label: "Solar Installation", searches: 3000, value: 15000 },
    { label: "Roofing", searches: 1500, value: 9000 },
    { label: "Concrete & Paving", searches: 1000, value: 3500 },
    { label: "Exterior Painting", searches: 1200, value: 4000 },
    { label: "Fencing", searches: 1000, value: 3000 },
    { label: "Water Damage Restoration", searches: 600, value: 3000 },
    { label: "Locksmith", searches: 2000, value: 150 },
    { label: "Towing Services", searches: 2000, value: 150 },
    { label: "Garage Door Repair", searches: 1200, value: 300 },
    { label: "Plumbing", searches: 1500, value: 350 },
    { label: "Electrician", searches: 1200, value: 350 },
    { label: "HVAC (Aircon)", searches: 2000, value: 5000 },
    { label: "Pest Control", searches: 800, value: 200 },
    { label: "Tree Service / Felling", searches: 800, value: 800 },
    { label: "Landscaping", searches: 1200, value: 1000 },
    { label: "Moving Company", searches: 1500, value: 1500 },
    { label: "Appliance Repair", searches: 1000, value: 250 },
    { label: "House Cleaning", searches: 1000, value: 250 },
    { label: "Pressure Washing", searches: 800, value: 350 },
    { label: "Pool Maintenance", searches: 800, value: 150 },
    { label: "Car Detailing", searches: 1000, value: 250 },
];

const SERVICES_ZA: ServiceData[] = [
    { label: "Solar Installation", searches: 3500, value: 115000 },
    { label: "Roofing", searches: 1000, value: 95000 },
    { label: "Concrete & Paving", searches: 800, value: 18500 },
    { label: "Exterior Painting", searches: 800, value: 35000 },
    { label: "Fencing", searches: 700, value: 22000 },
    { label: "Water Damage Restoration", searches: 400, value: 12500 },
    { label: "Locksmith", searches: 1500, value: 1250 },
    { label: "Towing Services", searches: 1500, value: 1500 },
    { label: "Garage Door Repair", searches: 800, value: 2400 },
    { label: "Plumbing", searches: 1200, value: 1250 },
    { label: "Electrician", searches: 1000, value: 1550 },
    { label: "HVAC (Aircon)", searches: 1500, value: 12000 },
    { label: "Pest Control", searches: 600, value: 1800 },
    { label: "Tree Service / Felling", searches: 600, value: 3500 },
    { label: "Landscaping", searches: 1000, value: 4500 },
    { label: "Moving Company", searches: 1200, value: 6500 },
    { label: "Appliance Repair", searches: 800, value: 1850 },
    { label: "House Cleaning", searches: 800, value: 1500 },
    { label: "Pressure Washing", searches: 500, value: 2800 },
    { label: "Pool Maintenance", searches: 600, value: 1100 },
    { label: "Car Detailing", searches: 800, value: 1800 },
];

const CITY_SIZES = [
    { label: "Small Town", multiplier: 1 },
    { label: "Medium City", multiplier: 2.5 },
    { label: "Large Metro", multiplier: 5.5 },
];

const CONVERSION_RATES = [
    { label: "1 out of 2 calls", value: 0.5 },
    { label: "1 out of 3 calls", value: 0.33 },
    { label: "1 out of 4 calls", value: 0.25 },
    { label: "1 out of 5 calls", value: 0.2 },
    { label: "1 out of 10 calls", value: 0.1 },
];

export default function ROICalculator() {
    const { currency, symbol: currencySymbol } = useCurrency();
    const isZA = currency === 'ZAR';

    const [services, setServices] = useState<ServiceData[]>(SERVICES_US);
    const [serviceIndex, setServiceIndex] = useState(0);

    const [citySize, setCitySize] = useState(CITY_SIZES[1]); // Default to Medium City
    const [conversionRate, setConversionRate] = useState(CONVERSION_RATES[1]); // Default to 1/3 calls
    const [jobValue, setJobValue] = useState<number>(SERVICES_US[0].value);

    // Update services when location/currency is determined by context
    useEffect(() => {
        const currentServices = isZA ? SERVICES_ZA : SERVICES_US;
        setServices(currentServices);

        // Keep the same selected service by index and update value
        setServiceIndex(prevIndex => {
            setJobValue(currentServices[prevIndex].value);
            return prevIndex;
        });
    }, [isZA]);

    const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index = services.findIndex(s => s.label === e.target.value);
        if (index >= 0) {
            setServiceIndex(index);
            setJobValue(services[index].value);
        }
    };

    const currentService = services[serviceIndex] || services[0];

    const results = useMemo(() => {
        const searches = Math.round(currentService.searches * citySize.multiplier);
        const clicks = Math.round(searches * 0.12); // 12% CTR for top 3
        const calls = Math.round(clicks * 0.45); // 45% Call rate (upper end of conservative range)
        const jobs = Math.round(calls * conversionRate.value);
        const monthlyRevenue = jobs * jobValue;
        const yearlyRevenue = monthlyRevenue * 12;

        return {
            searches,
            clicks,
            calls,
            jobs,
            monthlyRevenue,
            yearlyRevenue
        };
    }, [currentService, citySize, conversionRate, jobValue]);

    return (
        <section id="roi-calculator" className="w-full py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center mb-16 px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-black/5 rounded-lg mb-6">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                        </svg>
                        <span className="text-base font-medium text-brand-black">The Advantage</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-black tracking-tight leading-[1.1]">
                        But, is this even{" "}
                        <span className="text-brand-red font-serif italic font-medium">worth it?</span>
                    </h2>
                </div>

                <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-[0_40px_90px_rgba(0,0,0,0.12)] border border-brand-black/5 overflow-hidden transition-all duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.18)]">
                    <div className="w-full py-12 px-8 text-center border-b border-brand-black/5">
                        <p className="text-lg md:text-xl text-brand-black font-medium max-w-2xl mx-auto leading-relaxed">
                            Estimate how many calls and jobs a Google Top 3 position could realistically generate.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-0">

                        {/* Inputs Side */}
                        <div className="p-8 md:p-16 lg:border-r border-brand-black/5 bg-[#FAFAFA]">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-1.5 h-8 bg-brand-red rounded-full"></div>
                                <h3 className="text-2xl font-bold text-brand-black">About Your Business</h3>
                            </div>

                            <div className="space-y-8">
                                {/* Service Selection */}
                                <div className="group/input">
                                    <label className="block text-xs font-black text-brand-gray uppercase tracking-widest mb-3 px-1 group-focus-within/input:text-brand-red transition-colors">What do you do?</label>
                                    <div className="relative">
                                        <select
                                            value={currentService.label}
                                            onChange={handleServiceChange}
                                            className="w-full bg-white border-2 border-brand-black/5 rounded-2xl px-6 py-5 text-brand-black font-semibold text-lg focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red outline-none transition-all appearance-none cursor-pointer shadow-sm"
                                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23222222'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.5rem center', backgroundSize: '1.5rem' }}
                                        >
                                            {services.map(s => <option key={s.label} value={s.label}>{s.label}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* City Size */}
                                <div className="group/input">
                                    <label className="block text-xs font-black text-brand-gray uppercase tracking-widest mb-3 px-1 group-focus-within/input:text-brand-red transition-colors">Where do you work?</label>
                                    <div className="relative">
                                        <select
                                            value={citySize.label}
                                            onChange={(e) => setCitySize(CITY_SIZES.find(c => c.label === e.target.value) || CITY_SIZES[0])}
                                            className="w-full bg-white border-2 border-brand-black/5 rounded-2xl px-6 py-5 text-brand-black font-semibold text-lg focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red outline-none transition-all appearance-none cursor-pointer shadow-sm"
                                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23222222'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.5rem center', backgroundSize: '1.5rem' }}
                                        >
                                            {CITY_SIZES.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Conversion Rate */}
                                <div className="group/input">
                                    <label className="block text-xs font-black text-brand-gray uppercase tracking-widest mb-3 px-1 group-focus-within/input:text-brand-red transition-colors">How many calls become a job?</label>
                                    <div className="relative">
                                        <select
                                            value={conversionRate.label}
                                            onChange={(e) => setConversionRate(CONVERSION_RATES.find(c => c.label === e.target.value) || CONVERSION_RATES[0])}
                                            className="w-full bg-white border-2 border-brand-black/5 rounded-2xl px-6 py-5 text-brand-black font-semibold text-lg focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red outline-none transition-all appearance-none cursor-pointer shadow-sm"
                                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23222222'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.5rem center', backgroundSize: '1.5rem' }}
                                        >
                                            {CONVERSION_RATES.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Job Value */}
                                <div className="group/input">
                                    <label className="block text-xs font-black text-brand-gray uppercase tracking-widest mb-3 px-1 group-focus-within/input:text-brand-red transition-colors">Value of one job ({currencySymbol})</label>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-brand-black">{currencySymbol}</span>
                                        <input
                                            type="number"
                                            value={jobValue}
                                            onChange={(e) => setJobValue(Number(e.target.value))}
                                            className="w-full bg-white border-2 border-brand-black/5 rounded-2xl pl-12 pr-6 py-5 text-brand-black font-semibold text-2xl focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Side */}
                        <div className="p-8 md:p-16 flex flex-col justify-between bg-white relative">
                            {/* Animated Background Mesh */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
                                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                </svg>
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-10">
                                    <div className="w-8 h-1.5 bg-brand-red rounded-full"></div>
                                    <h3 className="text-2xl font-bold text-brand-black">Your New Future</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-12">
                                    <div className="p-1 group/stat">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-brand-gray uppercase tracking-[0.2em] mb-2 group-hover/stat:text-brand-red transition-colors">People Seeing You</span>
                                            <span className="text-3xl md:text-4xl font-black text-brand-black transition-all">
                                                {results.searches.toLocaleString('en-US')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-1 group/stat">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-brand-gray uppercase tracking-[0.2em] mb-2 group-hover/stat:text-brand-red transition-colors">New Visitors</span>
                                            <span className="text-3xl md:text-4xl font-black text-brand-black">
                                                {results.clicks.toLocaleString('en-US')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-1 group/stat">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-brand-gray uppercase tracking-[0.2em] mb-2 group-hover/stat:text-brand-red transition-colors">Phone Calls</span>
                                            <span className="text-3xl md:text-4xl font-black text-brand-black">
                                                {results.calls.toLocaleString('en-US')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-1 group/stat">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-brand-gray uppercase tracking-[0.2em] mb-2 group-hover/stat:text-brand-red transition-colors">Extra Jobs</span>
                                            <span className="text-3xl md:text-4xl font-black text-brand-black">
                                                {results.jobs.toLocaleString('en-US')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 mb-12">
                                    <div className="relative group/result bg-[#FAFAFA] hover:bg-white border-2 border-transparent hover:border-brand-red/10 rounded-[2rem] p-8 transition-all duration-300 shadow-sm hover:shadow-xl">
                                        <div className="flex items-center justify-between gap-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
                                                    <p className="text-xs font-black text-brand-red uppercase tracking-widest leading-none">Monthly Money Growth</p>
                                                </div>
                                                <p className="text-5xl md:text-6xl font-black text-brand-black tracking-tighter">{currencySymbol}{results.monthlyRevenue.toLocaleString('en-US')}</p>
                                            </div>
                                            <div className="hidden sm:flex w-16 h-16 bg-brand-red text-white items-center justify-center rounded-[1.25rem] shadow-2xl shadow-brand-red/40 group-hover/result:rotate-6 transition-all">
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative group/result bg-brand-black hover:bg-[#111111] rounded-[2rem] p-8 transition-all duration-300 shadow-2xl">
                                        <div className="flex items-center justify-between gap-6">
                                            <div className="flex-1 text-white">
                                                <p className="text-xs font-black text-white/50 uppercase tracking-widest mb-2 px-0">What You Lose Every Year</p>
                                                <p className="text-5xl md:text-6xl font-black text-white tracking-tighter">{currencySymbol}{results.yearlyRevenue.toLocaleString('en-US')}</p>
                                            </div>
                                            <div className="hidden sm:flex w-16 h-16 bg-white/10 text-white items-center justify-center rounded-[1.25rem] backdrop-blur-md group-hover/result:-rotate-6 transition-all border border-white/10">
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 px-2">
                                <p className="text-[10px] leading-relaxed text-brand-gray font-medium opacity-60">
                                    To keep this realistic we use conservative industry averages. We estimate roughly 10-12% of people searching click a Google Top 3 result, around 30-45% of those visitors call, and then use the job conversion rate you selected above to estimate how many calls turn into jobs. Actual results depend on competition, location and how well your business converts incoming leads.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA or Extra Info */}
                <div className="mt-12 text-center">
                    <p className="text-brand-gray font-medium max-w-xl mx-auto">
                        Stop leaving money on the table. Every day you&apos;re not in the top 3, your competitors are taking these calls.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/free-analysis">
                            <LiquidButton className="w-full sm:w-auto px-8 py-3 text-lg sm:px-10 sm:py-5 sm:text-xl font-semibold shadow-xl hover:shadow-2xl hover:shadow-brand-red/20 transition-all transform hover:-translate-y-1">
                                Get The FREE Analysis
                            </LiquidButton>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
