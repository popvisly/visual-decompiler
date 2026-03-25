'use client';

import Link from 'next/link';
import Image from 'next/image';
import logoMark from '../../Logo/Visual_Decompiler_Logo_400px.png';

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
            <div className="flex h-8 w-8 items-center justify-center transition-transform group-hover:scale-105">
                <Image
                    src={logoMark}
                    alt="Visual Decompiler logo mark"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                    priority
                />
            </div>
            <div className="leading-none text-left">
                <h1 className="text-[13px] font-bold tracking-[-0.01em] uppercase text-[#B8A47E] transition-colors">
                    Visual Decompiler
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
