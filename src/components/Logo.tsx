'use client';

import Link from 'next/link';

interface LogoProps {
    href?: string;
    sublabel?: string;
    className?: string;
    forceDark?: boolean;
    onClick?: () => void;
}

export default function Logo({
    href = "/",
    sublabel = "Advertising Intelligence",
    className = "",
    forceDark = false,
    onClick
}: LogoProps) {
    const content = (
        <div className={`flex items-center gap-3 group ${className}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm group-hover:scale-105 transition-transform shadow-sm ${forceDark ? 'bg-white text-[#141414]' : 'bg-[#141414] text-[#FBF7EF]'}`}>
                V
            </div>
            <div className="leading-none text-left">
                <h1 className={`text-[13px] font-bold tracking-[-0.01em] uppercase transition-colors ${forceDark ? 'text-[#FBF7EF]' : 'text-[#141414]'}`}>
                    VisualDecompiler.com
                </h1>
                <p className={`mt-0.5 uppercase tracking-[0.2em] transition-colors ${forceDark ? 'text-white/60' : 'text-[#6B6B6B]'}`} style={{ fontSize: '8px' }}>
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
