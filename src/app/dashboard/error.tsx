'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Dashboard caught a fatal render error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#F6F1E7] flex flex-col items-center justify-center p-6 font-sans">
            <div className="bg-white p-12 rounded-[2rem] border border-red-500/30 max-w-3xl w-full text-left shadow-[0_20px_40px_rgba(255,0,0,0.05)]">
                <h2 className="text-3xl font-bold text-[#141414] mb-4">Tactical Library Crashed</h2>
                <div className="bg-red-500/5 text-red-600 p-6 rounded-xl font-mono text-sm border border-red-500/10 mb-8 whitespace-pre-wrap break-all overflow-auto max-h-96">
                    {/* Expose literal error details instead of NextJS digest */}
                    <strong>{error.name}:</strong> {error.message}
                    {'\n\n'}
                    {error.stack}
                </div>
                <button
                    className="px-6 py-3 bg-[#141414] text-[#FBF7EF]text-[12px] font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-all"
                    onClick={() => reset()}
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
