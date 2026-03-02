'use client';

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
    error,
}: {
    error: Error & { digest?: string };
}) {
    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="flex flex-col items-center justify-center min-h-screen bg-[#F6F1E7] p-6 text-center">
                    <h2 className="text-2xl font-bold text-[#141414] mb-4 uppercase tracking-tighter">
                        Something went wrong
                    </h2>
                    <p className="text-sm text-[#6B6B6B] mb-8 max-w-md uppercase tracking-widest leading-loose">
                        A critical error occurred in the application. Our engineers have been notified.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-4 bg-[#141414] text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
