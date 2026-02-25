'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#F6F1E7] text-[#141414] font-sans relative flex flex-col">
            {/* Bone Grid Background */}
            <div className="pointer-events-none fixed inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(20,20,20,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.028)_1px,transparent_1px)] [background-size:48px_48px] z-0" />

            <header className="relative z-10 w-full px-6 py-6 flex justify-center">
                <Logo href="/" />
            </header>

            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="space-y-6 max-w-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-[#E7DED1] shadow-sm mb-4">
                        <span className="text-2xl font-bold text-[#141414]">404</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
                        Signal lost.<br />
                        <span className="text-[#6B6B6B]">Page not found.</span>
                    </h1>
                    <p className="text-[17px] text-[#6B6B6B] leading-relaxed">
                        The decompiler couldn't find a strategy at this address.
                        Let's get you back to the library.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-full bg-[#141414] text-[#FBF7EF] px-8 py-3 text-[14px] font-medium tracking-[-0.01em] shadow-[0_14px_34px_rgba(20,20,20,0.12)] transition hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(20,20,20,0.18)]"
                        >
                            Back to Intelligence Hub
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="relative z-10 w-full text-center py-8">
                <p className="text-[#6B6B6B] text-[10px] font-semibold tracking-[0.15em] uppercase">VisualDecompiler.com // Error Code 404</p>
            </footer>
        </div>
    );
}
