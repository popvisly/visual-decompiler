'use client';

import Link from 'next/link';

interface LogoProps {
    href?: string;
    sublabel?: string;
    className?: string;
    forceDark?: boolean;
    hoverColor?: 'default' | 'yellow' | 'cyan' | 'red';
    onClick?: () => void;
}

export default function Logo({
    href = '/',
    sublabel = 'BUILT FOR CREATIVES',
    className = '',
    forceDark = false,
    hoverColor = 'default',
    onClick,
}: LogoProps) {
    const hoverClass =
        hoverColor === 'yellow'
            ? 'group-hover:text-[#C1A674]'
            : hoverColor === 'cyan'
              ? 'group-hover:text-[#00E5FF]'
              : hoverColor === 'red'
                ? 'group-hover:text-[#FF003C]'
                : forceDark
                  ? 'group-hover:text-[#00E5FF]'
                  : 'group-hover:text-[#FF003C]';

    const content = (
        <div className={`group flex flex-col text-left ${className}`}>
            <h1
                className={`text-[16px] lg:text-[18px] font-black uppercase tracking-[0.22em] transition-colors ${forceDark ? 'text-white' : 'text-black'} ${hoverClass}`}
            >
                Visual Decompiler
            </h1>
            <p
                className={`mt-0.5 font-bold uppercase tracking-[0.3em] transition-colors ${forceDark ? 'text-white/40' : 'text-[#8A8A8A]'}`}
                style={{ fontSize: '9px' }}
            >
                {sublabel}
            </p>
        </div>
    );

    if (onClick) {
        return (
            <button onClick={onClick} className="shrink-0 focus:outline-none">
                {content}
            </button>
        );
    }

    return (
        <Link href={href} className="shrink-0 focus:outline-none">
            {content}
        </Link>
    );
}
