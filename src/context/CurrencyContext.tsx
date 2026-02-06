"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Currency = "USD" | "ZAR";

interface CurrencyContextType {
    currency: Currency;
    symbol: string;
    isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType>({
    currency: "USD",
    symbol: "$",
    isLoading: true,
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
    const [currency, setCurrency] = useState<Currency>("USD");
    const [symbol, setSymbol] = useState("$");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch("https://ipapi.co/json/");
                const data = await response.json();

                // Check if country is South Africa (ZA)
                if (data.country_code === "ZA") {
                    setCurrency("ZAR");
                    setSymbol("R");
                } else {
                    setCurrency("USD");
                    setSymbol("$");
                }
            } catch (error) {
                console.error("Failed to fetch location for currency:", error);
                // Default to USD on error
                setCurrency("USD");
                setSymbol("$");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLocation();
    }, []);

    return (
        <CurrencyContext.Provider value={{ currency, symbol, isLoading }}>
            {children}
        </CurrencyContext.Provider>
    );
};
