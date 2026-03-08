import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { CSPostHogProvider } from './providers';
import "./globals.css";

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Decompiler — Drop an ad. See the invisible.",
    description: "AI-powered psychological deep analysis of any advertisement. Uncover trigger mechanics, semiotic subtext, and hidden persuasion strategies in seconds.",
    openGraph: {
        title: "Decompiler — Advertising Intelligence",
        description: "Drop an ad. Get a full psychological X-ray. Trigger mechanics, semiotic subtext, evidence anchors — powered by AI.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#FBFBF6] text-[#1A1A1A] antialiased selection:bg-[#1A1A1A] selection:text-[#FBFBF6] relative`}>
                {/* Global Geometric Grid - Subtle 2.5% opacity */}
                <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.025] [background-image:linear-gradient(rgba(26,26,26,1)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,1)_1px,transparent_1px)] [background-size:48px_48px]" />
                <div className="relative z-10 w-full min-h-screen">
                    {children}
                </div>
            </body>
        </html>
    );
}
