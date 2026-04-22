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
    { label: "Solar Installation", searches: 300, value: 15000 },
    { label: "Roofing", searches: 200, value: 9000 },
    { label: "Concrete & Paving", searches: 400, value: 3500 },
    { label: "Exterior Painting", searches: 400, value: 4000 },
    { label: "Fencing", searches: 500, value: 3000 },
    { label: "Water Damage Restoration", searches: 300, value: 3000 },
    { label: "Locksmith", searches: 600, value: 150 },
    { label: "Towing Services", searches: 900, value: 1500 },
    { label: "Garage Door Repair", searches: 300, value: 300 },
    { label: "Plumbing", searches: 1200, value: 350 },
    { label: "Electrician", searches: 1000, value: 350 },
    { label: "HVAC (Aircon)", searches: 400, value: 5000 },
    { label: "Pest Control", searches: 600, value: 200 },
    { label: "Tree Service / Felling", searches: 700, value: 800 },
    { label: "Landscaping", searches: 600, value: 1000 },
    { label: "Moving Company", searches: 900, value: 1500 },
    { label: "Appliance Repair", searches: 800, value: 250 },
    { label: "House Cleaning", searches: 800, value: 250 },
    { label: "Pressure Washing", searches: 500, value: 350 },
    { label: "Pool Maintenance", searches: 600, value: 150 },
    { label: "Car Detailing", searches: 500, value: 250 },
];

const SERVICES_ZA: ServiceData[] = [
    { label: "Solar Installation", searches: 300, value: 60000 },
    { label: "Roofing", searches: 200, value: 95000 },
    { label: "Concrete & Paving", searches: 400, value: 18500 },
    { label: "Exterior Painting", searches: 400, value: 35000 },
    { label: "Fencing", searches: 500, value: 22000 },
    { label: "Water Damage Restoration", searches: 300, value: 12500 },
    { label: "Locksmith", searches: 600, value: 1250 },
    { label: "Towing Services", searches: 900, value: 1500 },
    { label: "Garage Door Repair", searches: 300, value: 2400 },
    { label: "Plumbing", searches: 1200, value: 1250 },
    { label: "Electrician", searches: 1000, value: 1550 },
    { label: "HVAC (Aircon)", searches: 400, value: 12000 },
    { label: "Pest Control", searches: 600, value: 1800 },
    { label: "Tree Service / Felling", searches: 700, value: 3500 },
    { label: "Landscaping", searches: 600, value: 4500 },
    { label: "Moving Company", searches: 900, value: 6500 },
    { label: "Appliance Repair", searches: 800, value: 1850 },
    { label: "House Cleaning", searches: 800, value: 1500 },
    { label: "Pressure Washing", searches: 500, value: 2800 },
    { label: "Pool Maintenance", searches: 600, value: 1100 },
    { label: "Car Detailing", searches: 500, value: 1800 },
];

const CITY_SIZES = [
    { label: "Small Town", multiplier: 1 },
    { label: "Medium City", multiplier: 2.0 },
    { label: "Large Metro", multiplier: 2.8 },
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
    
    // Default to Plumbing if it exists
    const defaultServiceIndex = Math.max(0, SERVICES_US.findIndex(s => s.label === "Plumbing"));
    const [serviceIndex, setServiceIndex] = useState(defaultServiceIndex);

    const [citySize, setCitySize] = useState(CITY_SIZES[1]); // Default to Medium City
    const [conversionRate, setConversionRate] = useState(CONVERSION_RATES[1]); // Default to 1/3 calls
    const [jobValue, setJobValue] = useState<number>(SERVICES_US[defaultServiceIndex].value);

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
        <section id="roi-calculator" className="w-full py-12 md:py-16 px-6 bg-white relative overflow-hidden">
            {/* Background Gradient/Sheen */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-cream/50 to-transparent pointer-events-none"></div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-10 px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-black/5 rounded-lg mb-4">
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
                        <span className="text-brand-green font-serif italic font-bold">worth it?</span>
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-8 text-center">
                        <p className="text-lg text-brand-black font-medium leading-relaxed">
                            Estimate how many calls and jobs a Google Top 3 position could realistically generate.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 px-8 pb-8">
                        {/* Inputs Side */}
                        <div className="flex flex-col h-full justify-between gap-6 md:gap-4 lg:gap-6">
                            {/* Service Selection */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-brand-black">What service do you provide?</label>
                                <div className="relative">
                                    <select
                                        value={currentService.label}
                                        onChange={handleServiceChange}
                                        className="w-full bg-[#f3f4f6] rounded-xl px-4 py-4 lg:py-[1.125rem] text-brand-black outline-none appearance-none cursor-pointer border-transparent focus:border-gray-300 focus:bg-white transition-all font-medium text-base lg:text-lg"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23222222'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.25rem' }}
                                    >
                                        {services.map(s => <option key={s.label} value={s.label}>{s.label}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* City Size */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-brand-black">How big is your city?</label>
                                <div className="relative">
                                    <select
                                        value={citySize.label}
                                        onChange={(e) => setCitySize(CITY_SIZES.find(c => c.label === e.target.value) || CITY_SIZES[0])}
                                        className="w-full bg-[#f3f4f6] rounded-xl px-4 py-4 lg:py-[1.125rem] text-brand-black outline-none appearance-none cursor-pointer border-transparent focus:border-gray-300 focus:bg-white transition-all font-medium text-base lg:text-lg"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23222222'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.25rem' }}
                                    >
                                        {CITY_SIZES.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Conversion Rate */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-brand-black">Out of how many calls do you usually get a job?</label>
                                <div className="relative">
                                    <select
                                        value={conversionRate.label}
                                        onChange={(e) => setConversionRate(CONVERSION_RATES.find(c => c.label === e.target.value) || CONVERSION_RATES[0])}
                                        className="w-full bg-[#f3f4f6] rounded-xl px-4 py-4 lg:py-[1.125rem] text-brand-black outline-none appearance-none cursor-pointer border-transparent focus:border-gray-300 focus:bg-white transition-all font-medium text-base lg:text-lg"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23222222'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.25rem' }}
                                    >
                                        {CONVERSION_RATES.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Job Value */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-brand-black">What is the average value of one job? ({currencySymbol})</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={jobValue}
                                        onChange={(e) => setJobValue(Number(e.target.value))}
                                        className="w-full bg-[#f3f4f6] rounded-xl px-4 py-4 lg:py-[1.125rem] text-brand-black outline-none border-transparent focus:border-gray-300 focus:bg-white transition-all font-medium text-base lg:text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Results Side */}
                        <div className="flex flex-col h-full justify-between gap-3">
                            <div className="flex items-center justify-between bg-[#efefef] rounded-xl p-3 sm:p-4 gap-2">
                                <span className="text-brand-black font-medium text-sm sm:text-base leading-tight">Estimated Monthly Searches</span>
                                <div className="bg-brand-green text-white font-bold py-1.5 px-3 sm:py-2 sm:px-6 rounded-lg text-sm sm:text-lg min-w-[70px] sm:min-w-[100px] text-center whitespace-nowrap shrink-0">
                                    {results.searches.toLocaleString('en-US')}
                                </div>
                            </div>
                            <div className="flex items-center justify-between bg-[#efefef] rounded-xl p-3 sm:p-4 gap-2">
                                <span className="text-brand-black font-medium text-sm sm:text-base leading-tight">Estimated Monthly Clicks</span>
                                <div className="bg-brand-green text-white font-bold py-1.5 px-3 sm:py-2 sm:px-6 rounded-lg text-sm sm:text-lg min-w-[70px] sm:min-w-[100px] text-center whitespace-nowrap shrink-0">
                                    {results.clicks.toLocaleString('en-US')}
                                </div>
                            </div>
                            <div className="flex items-center justify-between bg-[#efefef] rounded-xl p-3 sm:p-4 gap-2">
                                <span className="text-brand-black font-medium text-sm sm:text-base leading-tight">Estimated Monthly Calls</span>
                                <div className="bg-brand-green text-white font-bold py-1.5 px-3 sm:py-2 sm:px-6 rounded-lg text-sm sm:text-lg min-w-[70px] sm:min-w-[100px] text-center whitespace-nowrap shrink-0">
                                    {results.calls.toLocaleString('en-US')}
                                </div>
                            </div>
                            <div className="flex items-center justify-between bg-[#efefef] rounded-xl p-3 sm:p-4 gap-2">
                                <span className="text-brand-black font-medium text-sm sm:text-base leading-tight">Estimated Monthly Jobs</span>
                                <div className="bg-brand-green text-white font-bold py-1.5 px-3 sm:py-2 sm:px-6 rounded-lg text-sm sm:text-lg min-w-[70px] sm:min-w-[100px] text-center whitespace-nowrap shrink-0">
                                    {results.jobs.toLocaleString('en-US')}
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-white border border-brand-green rounded-xl p-3 sm:p-4 gap-2">
                                <span className="text-brand-black font-medium text-sm sm:text-base leading-tight">Estimated Monthly Revenue</span>
                                <div className="bg-brand-green text-white font-bold py-1.5 px-3 sm:py-2 sm:px-6 rounded-lg text-sm sm:text-lg min-w-[70px] sm:min-w-[100px] text-center whitespace-nowrap shrink-0">
                                    {currencySymbol}{results.monthlyRevenue.toLocaleString('en-US')}
                                </div>
                            </div>
                            <div className="flex items-center justify-between bg-white border border-brand-green rounded-xl p-3 sm:p-4 gap-2">
                                <span className="text-brand-black font-medium text-sm sm:text-base leading-tight">Estimated Yearly Missed Revenue</span>
                                <div className="bg-brand-green text-white font-bold py-1.5 px-3 sm:py-2 sm:px-6 rounded-lg text-sm sm:text-lg min-w-[70px] sm:min-w-[100px] text-center whitespace-nowrap shrink-0">
                                    {currencySymbol}{results.yearlyRevenue.toLocaleString('en-US')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="px-8 pb-8 pt-4 text-center mt-auto">
                        <p className="text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed">
                            To keep this realistic we use conservative industry averages. We estimate roughly <strong className="text-gray-700">10-12% of people searching click a Google Top 3 result</strong>, around <strong className="text-gray-700">30-45% of those visitors call</strong>, and then use the job conversion rate you selected above to estimate how many calls turn into jobs. Actual results depend on competition, location and how well your business converts incoming leads.
                        </p>
                    </div>
                </div>

                {/* Bottom CTA or Extra Info */}
                <div className="mt-12 text-center">
                    <p className="text-brand-gray font-medium max-w-xl mx-auto">
                        Stop leaving money on the table. Every day you&apos;re not in the top 3, your competitors are taking these calls.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/free-analysis">
                            <LiquidButton className="w-full sm:w-auto px-8 py-3 text-lg sm:px-10 sm:py-5 sm:text-xl font-semibold shadow-xl hover:shadow-2xl hover:shadow-brand-green/20 transition-all transform hover:-translate-y-1">
                                Get The FREE Analysis
                            </LiquidButton>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
