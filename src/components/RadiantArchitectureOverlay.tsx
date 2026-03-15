'use client';

interface RadiantAnchor {
    x: number;
    y: number;
    label: string;
    gravity: 'high' | 'critical' | 'medium';
}

interface RadiantData {
    anchors: RadiantAnchor[];
    escape_vector: { from_x: number; from_y: number; angle: number };
}

// Fallback defaults for legacy assets without AI-driven data
const DEFAULT_DATA: RadiantData = {
    anchors: [
        { x: 20, y: 30, label: 'Primary Anchor', gravity: 'high' },
        { x: 50, y: 50, label: 'Hero Element', gravity: 'critical' },
        { x: 80, y: 60, label: 'Secondary Anchor', gravity: 'medium' },
    ],
    escape_vector: { from_x: 80, from_y: 60, angle: 135 },
};

function getStrokeForGravity(gravity: string): string {
    switch (gravity) {
        case 'critical': return '#D4A574';
        case 'high': return '#FFFFFF';
        default: return '#FFFFFF';
    }
}

function getRadiusForGravity(gravity: string): number {
    switch (gravity) {
        case 'critical': return 4;
        case 'high': return 3;
        default: return 2.5;
    }
}

export default function RadiantArchitectureOverlay({ data }: { data?: RadiantData }) {
    const d = data?.anchors?.length ? data : DEFAULT_DATA;
    const anchors = d.anchors.slice(0, 3);
    const escape = d.escape_vector;

    // Calculate escape endpoint using angle
    const escAngle = (escape.angle * Math.PI) / 180;
    const escLen = 18;
    const escEndX = escape.from_x + Math.cos(escAngle) * escLen;
    const escEndY = escape.from_y + Math.sin(escAngle) * escLen;

    // Arrow head points
    const arrowLen = 2;
    const arrowAngle1 = escAngle + (Math.PI * 5) / 6;
    const arrowAngle2 = escAngle - (Math.PI * 5) / 6;
    const arrowPts = `${escEndX},${escEndY} ${escEndX + Math.cos(arrowAngle1) * arrowLen},${escEndY + Math.sin(arrowAngle1) * arrowLen} ${escEndX + Math.cos(arrowAngle2) * arrowLen},${escEndY + Math.sin(arrowAngle2) * arrowLen}`;

    // Build the polyline path from anchors
    const vectorPoints = anchors.map(a => `${a.x},${a.y}`).join(' ');

    // Optical loop center is around the primary focal anchor (the 'critical' one, or anchor 2)
    const loopCenter = anchors.find(a => a.gravity === 'critical') || anchors[1] || anchors[0];

    return (
        <div className="absolute inset-0 z-20 pointer-events-none h-full w-full overflow-hidden transition-opacity duration-700">
            <svg 
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
            >
                <rect x="0" y="0" width="100" height="100" fill="rgba(8, 8, 7, 0.18)" />

                {/* ── Optical Loops (Attention Traps) ── */}
                <circle cx={loopCenter.x} cy={loopCenter.y} r="15" fill="none" stroke="#D4A574" strokeWidth="0.18" className="animate-[spin_20s_linear_infinite]" strokeDasharray="2 4" opacity="0.45" />
                <circle cx={loopCenter.x} cy={loopCenter.y} r="22" fill="none" stroke="#D4A574" strokeWidth="0.1" opacity="0.2" className="animate-[spin_30s_linear_infinite_reverse]" strokeDasharray="1 6" />
                {anchors.length >= 2 && (
                    <path d={`M ${anchors[0].x + 5} ${anchors[0].y + 5} C ${loopCenter.x} ${anchors[0].y - 10}, ${anchors[anchors.length - 1].x + 10} ${anchors[0].y - 10}, ${loopCenter.x + 5} ${loopCenter.y + 5}`} fill="none" stroke="#D4A574" strokeWidth="0.22" opacity="0.4" strokeDasharray="1 2" />
                )}

                {/* ── Focal Anchors (Reticles) ── */}
                {anchors.map((anchor, i) => {
                    const r = getRadiusForGravity(anchor.gravity);
                    const color = getStrokeForGravity(anchor.gravity);
                    const crossLen = r + 2;
                    const crossGap = r - 1;
                    return (
                        <g key={i} transform={`translate(${anchor.x}, ${anchor.y})`}>
                            <circle cx="0" cy="0" r={r} fill="none" stroke={color} strokeWidth={anchor.gravity === 'critical' ? 0.34 : 0.26} opacity={anchor.gravity === 'critical' ? 0.92 : 0.7} />
                            <circle cx="0" cy="0" r={anchor.gravity === 'critical' ? 0.68 : 0.44} fill={anchor.gravity === 'critical' ? '#F5F3EE' : '#D4A574'} opacity={0.9} />
                            <g stroke={color} strokeWidth={anchor.gravity === 'critical' ? 0.34 : 0.24} opacity={anchor.gravity === 'critical' ? 0.9 : 0.6}>
                                <line x1={-crossLen} y1="0" x2={-crossGap} y2="0" />
                                <line x1={crossGap} y1="0" x2={crossLen} y2="0" />
                                <line x1="0" y1={-crossLen} x2="0" y2={-crossGap} />
                                <line x1="0" y1={crossGap} x2="0" y2={crossLen} />
                            </g>
                            <text x={r + 2} y={-(r + 1)} fill="#D4A574" fontSize="3" fontFamily="monospace" letterSpacing="0.1em" opacity="0.85">
                                {String(i + 1).padStart(2, '0')}
                            </text>
                        </g>
                    );
                })}

                {/* ── Primary Vector Path (1 -> 2 -> 3) ── */}
                <polyline 
                    points={vectorPoints}
                    fill="none" 
                    stroke="#F5F3EE" 
                    strokeWidth="0.26" 
                    opacity="0.5"
                />

                {/* ── Escapement Point (Visual Leak) ── */}
                <g>
                    <line x1={escape.from_x} y1={escape.from_y} x2={escEndX} y2={escEndY} stroke="#D4A574" strokeWidth="0.28" strokeDasharray="1 2" opacity="0.7" />
                    <polygon points={arrowPts} fill="#D4A574" opacity="0.8" />
                    <text x={escEndX + 1} y={escEndY + 2} fill="#D4A574" fontSize="2.5" fontFamily="monospace" opacity="0.85">ESC</text>
                </g>

                {/* Grid Overlay */}
                <g opacity="0.12">
                    <line x1="33.3" y1="0" x2="33.3" y2="100" stroke="#D4A574" strokeWidth="0.12" />
                    <line x1="66.6" y1="0" x2="66.6" y2="100" stroke="#D4A574" strokeWidth="0.12" />
                    <line x1="0" y1="33.3" x2="100" y2="33.3" stroke="#D4A574" strokeWidth="0.12" />
                    <line x1="0" y1="66.6" x2="100" y2="66.6" stroke="#D4A574" strokeWidth="0.12" />
                </g>
                
                {/* Bounding Box Brackets */}
                <g stroke="#D4A574" strokeWidth="0.28" fill="none" opacity="0.42">
                    <path d="M 5,10 L 5,5 L 10,5" />
                    <path d="M 95,10 L 95,5 L 90,5" />
                    <path d="M 5,90 L 5,95 L 10,95" />
                    <path d="M 95,90 L 95,95 L 90,95" />
                </g>
            </svg>
        </div>
    );
}
