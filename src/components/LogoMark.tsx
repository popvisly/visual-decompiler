import Image from 'next/image';

interface LogoMarkProps {
    className?: string;
    size?: number;
    tone?: 'default' | 'white';
}

export default function LogoMark({ 
    className = '', 
    size = 40,
    tone = 'default'
}: LogoMarkProps) {
    const src = 
        tone === 'white' 
            ? '/vd_mini_logo_white.png' 
            : '/vd_mini_logo.png';

    return (
        <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
            <Image
                src={src}
                alt="Visual Decompiler Mark"
                fill
                sizes={`${size}px`}
                className="object-contain"
                priority
            />
        </div>
    );
}
