import Image from 'next/image';

interface LogoMarkProps {
    className?: string;
    size?: number;
    tone?: 'default' | 'white' | 'yellow';
}

export default function LogoMark({ 
    className = '', 
    size = 40,
    tone = 'default'
}: LogoMarkProps) {
    const src = 
        tone === 'white' 
            ? '/vd_mini_logo_white.png' 
            : tone === 'yellow'
                ? '/vd_mini_logo_yellow.png'
                : '/vd_mini_logo.png';

    return (
        <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
            <Image
                src={src}
                alt="Visual Decompiler Mark"
                width={size}
                height={size}
                className="object-contain"
                priority
            />
        </div>
    );
}
