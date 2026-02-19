import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Visual Decompiler | Advertising Intelligence",
    description: "Automated psychological & visual ad deconstruction.",
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
