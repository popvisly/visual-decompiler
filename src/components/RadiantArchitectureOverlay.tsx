'use client';

export default function RadiantArchitectureOverlay() {
    return (
        <div className="absolute inset-0 z-20 pointer-events-none w-full h-full overflow-hidden mix-blend-difference transition-opacity duration-1000">
            <svg 
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
            >
                <defs>
                    <filter id="tan-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="0.8" floodColor="#D4A574" floodOpacity="0.8"/>
                    </filter>
                </defs>

                {/* ── Optical Loops (Attention Traps) ── */}
                <circle cx="50" cy="50" r="15" fill="none" stroke="#D4A574" strokeWidth="0.2" className="animate-[spin_20s_linear_infinite]" strokeDasharray="2 4" opacity="0.8" />
                <circle cx="50" cy="50" r="22" fill="none" stroke="#FFFFFF" strokeWidth="0.1" opacity="0.6" className="animate-[spin_30s_linear_infinite_reverse]" strokeDasharray="1 6" />
                <path d="M 45 45 C 50 30, 70 30, 55 55" fill="none" stroke="#D4A574" strokeWidth="0.3" opacity="0.8" strokeDasharray="1 2" />

                {/* ── Focal Anchors (Reticles) ── */}
                {/* Anchor 1: Top Left (Logo/Headline area) */}
                <g transform="translate(20, 30)" filter="url(#tan-glow)">
                    <circle cx="0" cy="0" r="3" fill="none" stroke="#000000" strokeWidth="0.55" />
                    <circle cx="0" cy="0" r="3" fill="none" stroke="#FFFFFF" strokeWidth="0.3" />
                    <circle cx="0" cy="0" r="0.75" fill="#000000" />
                    <circle cx="0" cy="0" r="0.5" fill="#D4A574" />
                    
                    <g stroke="#000000" strokeWidth="0.55">
                        <line x1="-5" y1="0" x2="-2" y2="0" />
                        <line x1="2" y1="0" x2="5" y2="0" />
                        <line x1="0" y1="-5" x2="0" y2="-2" />
                        <line x1="0" y1="2" x2="0" y2="5" />
                    </g>
                    <g stroke="#FFFFFF" strokeWidth="0.3">
                        <line x1="-5" y1="0" x2="-2" y2="0" />
                        <line x1="2" y1="0" x2="5" y2="0" />
                        <line x1="0" y1="-5" x2="0" y2="-2" />
                        <line x1="0" y1="2" x2="0" y2="5" />
                    </g>
                    <text x="4" y="-4" fill="#D4A574" fontSize="3" fontFamily="monospace" letterSpacing="0.1em" style={{ textShadow: '0px 0px 2px #000' }}>01</text>
                </g>

                {/* Anchor 2: Center (Hero Product) */}
                <g transform="translate(50, 50)" filter="url(#tan-glow)">
                    <circle cx="0" cy="0" r="4" fill="none" stroke="#000000" strokeWidth="0.65" />
                    <circle cx="0" cy="0" r="4" fill="none" stroke="#D4A574" strokeWidth="0.4" />
                    <circle cx="0" cy="0" r="1.05" fill="#000000" />
                    <circle cx="0" cy="0" r="0.8" fill="#FFFFFF" />
                    
                    <g stroke="#000000" strokeWidth="0.65">
                        <line x1="-6" y1="0" x2="-3" y2="0" />
                        <line x1="3" y1="0" x2="6" y2="0" />
                        <line x1="0" y1="-6" x2="0" y2="-3" />
                        <line x1="0" y1="3" x2="0" y2="6" />
                    </g>
                    <g stroke="#D4A574" strokeWidth="0.4">
                        <line x1="-6" y1="0" x2="-3" y2="0" />
                        <line x1="3" y1="0" x2="6" y2="0" />
                        <line x1="0" y1="-6" x2="0" y2="-3" />
                        <line x1="0" y1="3" x2="0" y2="6" />
                    </g>
                    <text x="5" y="-5" fill="#FFFFFF" fontSize="3" fontFamily="monospace" letterSpacing="0.1em" style={{ textShadow: '0px 0px 2px #000' }}>02</text>
                </g>

                {/* Anchor 3: Bottom Right (CTA / Key Model) */}
                <g transform="translate(80, 60)" filter="url(#tan-glow)">
                    <circle cx="0" cy="0" r="3" fill="none" stroke="#000000" strokeWidth="0.55" />
                    <circle cx="0" cy="0" r="3" fill="none" stroke="#FFFFFF" strokeWidth="0.3" />
                    <circle cx="0" cy="0" r="0.75" fill="#000000" />
                    <circle cx="0" cy="0" r="0.5" fill="#D4A574" />
                    
                    <g stroke="#000000" strokeWidth="0.55">
                        <line x1="-5" y1="0" x2="-2" y2="0" />
                        <line x1="2" y1="0" x2="5" y2="0" />
                        <line x1="0" y1="-5" x2="0" y2="-2" />
                        <line x1="0" y1="2" x2="0" y2="5" />
                    </g>
                    <g stroke="#FFFFFF" strokeWidth="0.3">
                        <line x1="-5" y1="0" x2="-2" y2="0" />
                        <line x1="2" y1="0" x2="5" y2="0" />
                        <line x1="0" y1="-5" x2="0" y2="-2" />
                        <line x1="0" y1="2" x2="0" y2="5" />
                    </g>
                    <text x="4" y="-4" fill="#D4A574" fontSize="3" fontFamily="monospace" letterSpacing="0.1em" style={{ textShadow: '0px 0px 2px #000' }}>03</text>
                </g>

                {/* ── Primary Vector Path (1 -> 2 -> 3) ── */}
                <g filter="url(#tan-glow)">
                    <polyline 
                        points="20,30 50,50 80,60" 
                        fill="none" 
                        stroke="#000000" 
                        strokeWidth="0.55" 
                        opacity="0.9"
                    />
                    <polyline 
                        points="20,30 50,50 80,60" 
                        fill="none" 
                        stroke="#FFFFFF" 
                        strokeWidth="0.3" 
                        opacity="0.9"
                    />
                </g>

                {/* ── Escapement Point (Visual Leak) ── */}
                <g transform="translate(80, 60)">
                    {/* Double Stroke */}
                    <line x1="0" y1="0" x2="15" y2="25" stroke="#000000" strokeWidth="0.65" strokeDasharray="1 2" />
                    <line x1="0" y1="0" x2="15" y2="25" stroke="#D4A574" strokeWidth="0.4" strokeDasharray="1 2" />
                    
                    {/* Arrow head with shadow base */}
                    <polygon points="15.5,25.5 11.5,25.5 14.5,22.5" fill="#000000" />
                    <polygon points="15,25 12,25 14,23" fill="#D4A574" />
                    <text x="16" y="27" fill="#D4A574" fontSize="2.5" fontFamily="monospace" opacity="0.9" style={{ textShadow: '0px 0px 2px #000' }}>ESCAPE_VELOCITY</text>
                </g>

                {/* Grid Overlay */}
                <g opacity="0.1">
                    <line x1="33.3" y1="0" x2="33.3" y2="100" stroke="#FFFFFF" strokeWidth="0.2" />
                    <line x1="66.6" y1="0" x2="66.6" y2="100" stroke="#FFFFFF" strokeWidth="0.2" />
                    <line x1="0" y1="33.3" x2="100" y2="33.3" stroke="#FFFFFF" strokeWidth="0.2" />
                    <line x1="0" y1="66.6" x2="100" y2="66.6" stroke="#FFFFFF" strokeWidth="0.2" />
                </g>
                
                {/* Bounding Box Brackets */}
                <g stroke="#D4A574" strokeWidth="0.5" fill="none" opacity="0.6">
                    {/* Top Left */}
                    <path d="M 5,10 L 5,5 L 10,5" />
                    {/* Top Right */}
                    <path d="M 95,10 L 95,5 L 90,5" />
                    {/* Bottom Left */}
                    <path d="M 5,90 L 5,95 L 10,95" />
                    {/* Bottom Right */}
                    <path d="M 95,90 L 95,95 L 90,95" />
                </g>
            </svg>
        </div>
    );
}
