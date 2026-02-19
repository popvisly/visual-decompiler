import type { Metadata } from "next";
import "./globals.css";

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
            <body className="antialiased font-sans bg-canvas">
                {children}
            </body>
        </html>
    );
}
