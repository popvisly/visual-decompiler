'use client';

import React from 'react';

type Props = {
    label: string;
    title: string;
    body: string;
    variant?: 'light' | 'dark';
};

export default function ClarifierPill({ label, title, body, variant = 'light' }: Props) {
    const [open, setOpen] = React.useState(false);

    const isDark = variant === 'dark';

    return (
        <span className="relative inline-flex">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
                }}
                className={
                    isDark
                        ? 'rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[9px] font-black uppercase tracking-[0.28em] text-white/70 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white'
                        : 'rounded-full border border-black/10 bg-[#FBFBF6] px-4 py-2 text-[9px] font-black uppercase tracking-[0.28em] text-[#6B6B6B] transition-all hover:border-[#D4A574]/25 hover:bg-white hover:text-[#141414]'
                }
                aria-expanded={open}
            >
                {label}
            </button>

            {open ? (
                <span
                    tabIndex={-1}
                    className="absolute left-0 top-full z-50 mt-3 w-[420px] max-w-[85vw] animate-in fade-in slide-in-from-top-2 duration-200"
                >
                    <span
                        className={
                            isDark
                                ? 'block rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)]'
                                : 'block rounded-2xl border border-black/5 bg-white p-6 shadow-[0_30px_90px_rgba(20,20,20,0.12)]'
                        }
                    >
                        <span className={isDark ? 'text-[9px] font-black uppercase tracking-[0.34em] text-[#D4A574]/80' : 'text-[9px] font-black uppercase tracking-[0.34em] text-[#8B6A3D]/80'}>
                            {title}
                        </span>
                        <span className={isDark ? 'mt-3 block text-[12px] font-medium leading-relaxed text-white/75' : 'mt-3 block text-[12px] font-medium leading-relaxed text-[#515151]'}>
                            {body}
                        </span>
                        <span className="mt-5 block">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className={isDark ? 'rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[9px] font-black uppercase tracking-[0.28em] text-white/60 hover:bg-white/10' : 'rounded-full border border-black/10 bg-[#FBFBF6] px-4 py-2 text-[9px] font-black uppercase tracking-[0.28em] text-[#6B6B6B] hover:bg-white'}
                            >
                                Close
                            </button>
                        </span>
                    </span>
                </span>
            ) : null}
        </span>
    );
}

