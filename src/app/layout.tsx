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
    metadataBase: new URL('https://www.visualdecompiler.com'),
    title: {
        default: 'Visual Decompiler — Forensic Intelligence for Advertising',
        template: '%s | Visual Decompiler',
    },
    description: 'Visual Decompiler deconstructs any ad in under 60 seconds. Uncover persuasion mechanics, trigger signals, semiotic layers, and a reconstruction blueprint — forensic intelligence for creative strategists.',
    keywords: [
        'creative diagnosis tool',
        'advertising intelligence',
        'creative strategy',
        'ad deconstruction',
        'persuasion mechanics',
        'semiotic analysis',
        'competitive creative intelligence',
        'visual decompiler',
        'forensic advertising',
        'ad teardown tool',
    ],
    authors: [{ name: 'Visual Decompiler', url: 'https://www.visualdecompiler.com' }],
    creator: 'Visual Decompiler',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.visualdecompiler.com',
        siteName: 'Visual Decompiler',
        title: 'Visual Decompiler — Forensic Intelligence for Advertising',
        description: 'Drop any ad. Get the persuasion mechanics, trigger signals, and strategic blueprint behind it — in under 60 seconds.',
        images: [
            {
                url: '/analytics.png',
                width: 1200,
                height: 630,
                alt: 'Visual Decompiler — Ad Forensic Intelligence Platform',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Visual Decompiler — Forensic Intelligence for Advertising',
        description: 'Drop any ad. Get the persuasion mechanics, trigger signals, and strategic blueprint — in under 60 seconds.',
        images: ['/analytics.png'],
        creator: '@visualdecompiler',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
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
