import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Thank You - AO Automations",
    description: "Thank you for your request.",
    alternates: {
        canonical: "/thank-you",
    },
};

export default function ThankYouLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
