'use client';

interface LogoMarkProps {
    className?: string;
    size?: number;
    strokeWidth?: number;
}

export default function LogoMark({ 
    className = 'text-[#8B6A3D]', 
    size = 40,
    strokeWidth = 6
}: LogoMarkProps) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className={className}
        >
            <g transform="translate(20,20)">
                <path 
                    d="M-10,-10 C-10,-15 0,-15 5,-10 C10,-5 10,5 5,10" 
                    stroke="currentColor" 
                    strokeWidth={strokeWidth} 
                    strokeLinecap="round" 
                    fill="none" 
                />
                <path 
                    d="M10,-10 C15,-10 15,0 10,5 C5,10 -5,10 -10,5" 
                    stroke="currentColor" 
                    strokeWidth={strokeWidth} 
                    strokeLinecap="round" 
                    fill="none" 
                    transform="rotate(90)" 
                />
                <path 
                    d="M10,10 C10,15 0,15 -5,10 C-10,5 -10,-5 -5,-10" 
                    stroke="currentColor" 
                    strokeWidth={strokeWidth} 
                    strokeLinecap="round" 
                    fill="none" 
                    transform="rotate(180)" 
                />
                <path 
                    d="M-10,10 C-15,10 -15,0 -10,-5 C-5,-10 5,-10 10,-5" 
                    stroke="currentColor" 
                    strokeWidth={strokeWidth} 
                    strokeLinecap="round" 
                    fill="none" 
                    transform="rotate(270)" 
                />
            </g>
        </svg>
    );
}
