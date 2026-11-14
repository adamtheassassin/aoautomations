import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Thank You - AO Automations",
    description: "We've got your details. Expect a call from us soon to go over your 5-day trial.",
    alternates: {
        canonical: "/carpet-cleaning/thank-you",
    },
    robots: {
        index: false,
    },
};

export default function CarpetCleaningThankYouLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
