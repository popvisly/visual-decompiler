'use client';

import Link from 'next/link';
import Image from 'next/image';

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
                  ? 'group-hover:text-[#C1A674]'
                  : 'group-hover:text-[#FF003C]';

    const content = (
        <div className={`group flex items-center gap-3 text-left ${className}`}>
            <Image
                src="/vd_mini_logo.png"
                alt="Visual Decompiler mark"
                width={38}
                height={38}
                className="h-9 w-9 rounded-full object-cover"
                priority
            />
            <div className="flex flex-col leading-[0.9]">
                <h1
                    className={`text-[16px] lg:text-[18px] font-black uppercase tracking-[0.22em] transition-colors ${forceDark ? 'text-white' : 'text-black'} ${hoverClass}`}
                >
                    <span className="block">Visual</span>
                    <span className="block mt-0.5">Decompiler</span>
                </h1>
                {sublabel ? (
                    <p
                        className={`mt-1 font-bold uppercase tracking-[0.3em] transition-colors ${forceDark ? 'text-white/40' : 'text-[#8A8A8A]'}`}
                        style={{ fontSize: '9px' }}
                    >
                        {sublabel}
                    </p>
                ) : null}
            </div>
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
