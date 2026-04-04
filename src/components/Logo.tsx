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
    sublabel = "BUILT FOR CREATIVES",
    className = "",
    forceDark = false,
    onClick
}: LogoProps) {
    const content = (
        <div className={`flex flex-col text-left group ${className}`}>
            <h1 className={`text-[16px] lg:text-[18px] font-black uppercase tracking-[0.22em] transition-colors ${forceDark ? 'text-white group-hover:text-[#00E5FF]' : 'text-black group-hover:text-[#FF003C]'}`}>
                Visual Decompiler
            </h1>
            <p className={`mt-0.5 font-bold uppercase tracking-[0.3em] transition-colors ${forceDark ? 'text-white/40' : 'text-[#8A8A8A]'}`} style={{ fontSize: '9px' }}>
                {sublabel}
            </p>
        </div>
    );

    if (onClick) {
        return (
            <button onClick={onClick} className="focus:outline-none shrink-0">
                {content}
            </button>
        );
    }

    return (
        <Link href={href} className="focus:outline-none shrink-0">
            {content}
        </Link>
    );
}
