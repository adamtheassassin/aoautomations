"use client";

import { useEffect, useState } from 'react';

export default function LocationIndicator() {
    const [location, setLocation] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                if (data.city && data.country_name) {
                    setLocation(`${data.city}, ${data.country_name}`);
                }
            } catch (error) {
                console.error("Error fetching location:", error);
            }
        };

        fetchLocation();
    }, []);

    if (!location) return null;

    return (
        <div className="flex items-center gap-2 animate-fade-in">
            <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-sm font-medium text-brand-gray/80">{location}</span>
        </div>
    );
}
