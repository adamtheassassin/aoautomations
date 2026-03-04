import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: {
        canonical: "/free-analysis",
    },
};

export default function FreeAnalysisLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
