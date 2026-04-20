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
    const visualHoverClass =
        hoverColor === 'cyan'
            ? 'group-hover:text-[#00E5FF]'
            : hoverColor === 'red'
              ? 'group-hover:text-[#FF003C]'
              : 'group-hover:text-[#FFD600]';

    const decompilerHoverClass =
        hoverColor === 'cyan'
            ? 'group-hover:text-[#7CF5FF]'
            : hoverColor === 'red'
              ? 'group-hover:text-[#FF4C70]'
              : 'group-hover:text-[#F28C28]';

    const content = (
        <div className={`group flex items-center gap-3 text-left ${className}`}>
            <span className="relative h-9 w-9 overflow-hidden rounded-full">
                <Image
                    src="/vd_mini_logo.png"
                    alt="Visual Decompiler mark"
                    width={38}
                    height={38}
                    className="absolute inset-0 h-9 w-9 rounded-full object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
                    priority
                />
                <Image
                    src="/vd_mini_logo_yellow_orange.png"
                    alt="Visual Decompiler mark hover"
                    width={38}
                    height={38}
                    className="absolute inset-0 h-9 w-9 rounded-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                    priority
                />
            </span>
            <div className="flex flex-col leading-[0.9]">
                <h1
                    className={`text-[16px] lg:text-[18px] font-black uppercase tracking-[0.22em] ${forceDark ? 'text-white' : 'text-black'}`}
                >
                    <span className={`block transition-colors duration-500 ease-out ${visualHoverClass}`}>Visual</span>
                    <span className={`block mt-0.5 transition-colors duration-500 ease-out ${decompilerHoverClass}`}>Decompiler</span>
                </h1>
                {sublabel ? (
                    <p
                        className={`mt-1 font-bold uppercase tracking-[0.3em] transition-colors duration-500 ease-out ${forceDark ? 'text-white/40' : 'text-[#8A8A8A]'}`}
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
