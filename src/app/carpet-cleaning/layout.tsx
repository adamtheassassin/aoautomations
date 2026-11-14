import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Carpet Cleaners: 5 Jobs In 5 Days Free Trial - AO Automations",
    description: "UK carpet cleaners, we'll book you 5 jobs in 5 days on a free trial, or we keep working for free until we do.",
    alternates: {
        canonical: "/carpet-cleaning",
    },
};

export default function CarpetCleaningLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
