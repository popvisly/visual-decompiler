"use client";

import { useRouter } from 'next/navigation';

export default function GatekeeperIntercept({
    isVisible,
    onClose
}: {
    isVisible: boolean;
    onClose?: () => void
}) {
    const router = useRouter();

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            {/* Click outside to close (optional, but good UX if they want to back out) */}
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative z-10 bg-black border border-neutral-700 p-8 md:p-16 max-w-xl w-full flex flex-col items-center text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">

                {/* Stark Typography */}
                <h2 className="text-xl md:text-2xl font-sans tracking-[0.2em] uppercase text-red-500 mb-6 font-bold">
                    Unauthorized
                </h2>

                <p className="text-sm md:text-base font-mono tracking-widest uppercase text-neutral-400 mb-12 leading-relaxed">
                    Agency Sovereignty Tier Required <br className="hidden md:block" />
                    to execute this neural parameter.
                </p>

                {/* Minimalist Action Button */}
                <button
                    onClick={() => router.push('/pricing')}
                    className="w-full bg-white text-black px-6 py-4 font-sans text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-neutral-300 transition-colors"
                >
                    View Deployment Tiers
                </button>

                {/* Optional dismiss text */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="mt-6 text-[9px] font-mono tracking-widest text-neutral-600 uppercase hover:text-white transition-colors"
                    >
                        [ Dismiss Action ]
                    </button>
                )}
            </div>
        </div>
    );
}
