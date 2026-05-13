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
        <div className={`group flex items-center gap-4 text-left ${className}`}>
            <div className="relative h-11 w-11 shrink-0 overflow-hidden">
                <LogoMark 
                    size={44} 
                    tone={forceDark ? 'white' : 'default'}
                    className="absolute inset-0" 
                />
            </div>
            <div className="flex flex-col leading-[1.1]">
                <h1
                    className={`text-[17px] lg:text-[19px] uppercase tracking-[0.22em] ${forceDark ? 'text-white' : 'text-black'}`}
                >
                    <span className={`block font-medium transition-colors duration-500 ease-out group-hover:text-[#D4A574]`}>Visual</span>
                    <span className={`block mt-[-2px] font-black transition-colors duration-500 ease-out group-hover:text-[#8B6A3D]`}>Decompiler</span>
                </h1>
                {sublabel ? (
                    <p
                        className={`mt-1.5 font-bold uppercase tracking-[0.32em] transition-colors duration-500 ease-out ${forceDark ? 'text-white/40' : 'text-[#8A8A84]'}`}
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
