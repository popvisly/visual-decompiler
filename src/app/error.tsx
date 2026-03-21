'use client';

import * as Sentry from "@sentry/nextjs";
import { useEffect } from 'react';

export default function RootErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        Sentry.captureException(error);
        console.error("Root error boundary caught:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#F6F1E7] flex flex-col items-center justify-center p-6 font-sans">
            <div className="bg-white p-12 rounded-[2rem] border border-red-500/30 max-w-3xl w-full text-center shadow-[0_20px_40px_rgba(255,0,0,0.05)]">
                <div className="mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                        <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-[#141414] mb-2">Something went wrong</h2>
                    <p className="text-[15px] text-[#6B6B6B] max-w-md mx-auto mb-8">
                        We've encountered an unexpected error. Our team has been notified and we're working to fix it.
                    </p>
                </div>

                {process.env.NODE_ENV === 'development' && (
                    <div className="bg-red-500/5 text-red-600 p-6 rounded-xl font-mono text-sm border border-red-500/10 mb-8 text-left whitespace-pre-wrap break-all overflow-auto max-h-96">
                        <strong>{error.name}:</strong> {error.message}
                        {error.digest && (
                            <>
                                {'\n\n'}
                                <strong>Error ID:</strong> {error.digest}
                            </>
                        )}
                    </div>
                )}

                <div className="flex gap-4 justify-center">
                    <button
                        className="px-6 py-3 bg-[#141414] text-[#FBF7EF] text-[12px] font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-all"
                        onClick={() => reset()}
                    >
                        Try again
                    </button>
                    <a
                        href="/"
                        className="px-6 py-3 bg-white text-[#141414] text-[12px] font-bold uppercase tracking-widest rounded-full border border-[#E7DED1] hover:scale-105 transition-all"
                    >
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
}
