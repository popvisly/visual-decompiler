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
        default: 'Visual Decompiler — Visual Judgment for Working Creatives',
        template: '%s | Visual Decompiler',
    },
    description: 'Visual Decompiler decompiles any ad into a sharper read of hierarchy, tension, identity pull, and what to do next. Built for working creatives.',
    keywords: [
        'visual judgment tool',
        'creative direction',
        'working creatives',
        'ad deconstruction',
        'creative review tool',
        'persuasion mechanics',
        'visual reading',
        'creative discernment',
        'visual decompiler',
        'ad teardown tool',
    ],
    authors: [{ name: 'Visual Decompiler', url: 'https://www.visualdecompiler.com' }],
    creator: 'Visual Decompiler',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.visualdecompiler.com',
        siteName: 'Visual Decompiler',
        title: 'Visual Decompiler — Visual Judgment for Working Creatives',
        description: 'Decompile any ad into a sharper read of hierarchy, tension, identity pull, and what to do next.',
        images: [
            {
                url: '/analytics.png',
                width: 1200,
                height: 630,
                alt: 'Visual Decompiler — visual judgment for working creatives',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Visual Decompiler — Visual Judgment for Working Creatives',
        description: 'Decompile any ad into a sharper read of hierarchy, tension, identity pull, and what to do next.',
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
