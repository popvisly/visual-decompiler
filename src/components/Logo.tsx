'use client';

import Link from 'next/link';

interface LogoProps {
    href?: string;
    sublabel?: string;
    className?: string;
    onClick?: () => void;
}

export default function Logo({
    href = "/",
    sublabel = "Advertising Intelligence",
    className = "",
    onClick
}: LogoProps) {
    const content = (
        <div className={`flex items-center gap-3 group ${className}`}>
            <div className="w-8 h-8 rounded-lg bg-[#141414] flex items-center justify-center text-[#FBF7EF] font-black text-sm group-hover:scale-105 transition-transform shadow-sm">
                V
            </div>
            <div className="leading-none text-left">
                <h1 className="text-[13px] font-bold text-[#141414] tracking-[-0.01em] uppercase">
                    VisualDecompiler.com
                </h1>
                <p className="mt-0.5 text-[#6B6B6B] uppercase tracking-[0.2em]" style={{ fontSize: '8px' }}>
                    {sublabel}
                </p>
            </div>
        </div>
    );

    if (onClick) {
        return (
            <button onClick={onClick} className="focus:outline-none">
                {content}
            </button>
        );
    }

    return (
        <Link href={href} className="focus:outline-none">
            {content}
        </Link>
    );
}
