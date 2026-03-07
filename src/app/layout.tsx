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
            <body className={`${inter.className} bg-[#FBF7EF] text-[#141414] antialiased selection:bg-[#141414] selection:text-[#FBF7EF]`}>
                {children}
            </body>
        </html>
    );
}
