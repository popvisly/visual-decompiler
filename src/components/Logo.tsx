'use client';

import Link from 'next/link';
import LogoMark from './LogoMark';

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
            ? 'group-hover:text-[#D4A574]'
            : hoverColor === 'red'
              ? 'group-hover:text-[#8B6A3D]'
              : 'group-hover:text-[#D4A574]';

    const decompilerHoverClass =
        hoverColor === 'cyan'
            ? 'group-hover:text-[#E0B882]'
            : hoverColor === 'red'
              ? 'group-hover:text-[#D4A574]'
              : 'group-hover:text-[#8B6A3D]';

    const content = (
        <div className={`group flex items-center gap-3 text-left ${className}`}>
            <span className="relative h-9 w-9 flex items-center justify-center">
                <LogoMark 
                    size={34} 
                    strokeWidth={6} 
                    className={`transition-colors duration-500 ease-out ${forceDark ? 'text-white' : 'text-black'} ${visualHoverClass}`} 
                />
            </span>
            <div className="flex flex-col leading-[0.9]">
                <h1
                    className={`text-[16px] lg:text-[18px] uppercase tracking-[0.22em] ${forceDark ? 'text-white' : 'text-black'}`}
                >
                    <span className={`block font-medium transition-colors duration-500 ease-out ${visualHoverClass}`}>Visual</span>
                    <span className={`block mt-0.5 font-black transition-colors duration-500 ease-out ${decompilerHoverClass}`}>Decompiler</span>
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
