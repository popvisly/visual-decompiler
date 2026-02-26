'use client';

import React, { useEffect, useState } from 'react';

type DataPoint = {
    label: string;
    value: number; // raw value
};

type Props = {
    data: DataPoint[];
};

export default function RadarChart({ data }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // We need at least 3 points for a radar; if fewer, pad it.
    const safeData = data.length >= 3 ? data : [...data, ...Array(3 - data.length).fill({ label: '', value: 0 })];
    // Take top 6 points to avoid overcrowding
    const chartData = safeData.slice(0, 6);

    const size = 200;
    const center = size / 2;
    const radius = size * 0.35; // Leave room for labels
    const maxValue = Math.max(...chartData.map((d) => d.value), 1); // Avoid div by 0

    const getCoordinates = (value: number, index: number, total: number) => {
        const angle = (Math.PI * 2 * index) / total - Math.PI / 2; // Start from top
        const ratio = value / maxValue;
        // if not mounted, draw at center for expand animation
        const activeRadius = mounted ? radius * ratio : 0;
        return {
            x: center + Math.cos(angle) * activeRadius,
            y: center + Math.sin(angle) * activeRadius,
        };
    };

    // Calculate generic web polygons for background grid
    const totalPoints = chartData.length;
    const gridLevels = [0.25, 0.5, 0.75, 1];

    const generateGridPolygon = (level: number) => {
        const points = chartData.map((_, i) => {
            const angle = (Math.PI * 2 * i) / totalPoints - Math.PI / 2;
            const r = radius * level;
            return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`;
        });
        return points.join(' ');
    };

    const dataPolygon = chartData.map((d, i) => {
        const { x, y } = getCoordinates(d.value, i, totalPoints);
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="relative w-full aspect-square flex items-center justify-center pointer-events-none">
            <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
                {/* Draw Web Grid */}
                {gridLevels.map((level) => (
                    <polygon
                        key={level}
                        points={generateGridPolygon(level)}
                        fill="transparent"
                        stroke="#2A2A2A"
                        strokeWidth="1"
                    />
                ))}

                {/* Draw Axes lines */}
                {chartData.map((_, i) => {
                    const angle = (Math.PI * 2 * i) / totalPoints - Math.PI / 2;
                    return (
                        <line
                            key={`axis-${i}`}
                            x1={center}
                            y1={center}
                            x2={center + Math.cos(angle) * radius}
                            y2={center + Math.sin(angle) * radius}
                            stroke="#2A2A2A"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Draw Data Polygon */}
                <polygon
                    points={dataPolygon}
                    fill="rgba(187, 158, 123, 0.2)"
                    stroke="#BB9E7B"
                    strokeWidth="1.5"
                    className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />

                {/* Draw Data Points */}
                {chartData.map((d, i) => {
                    const { x, y } = getCoordinates(d.value, i, totalPoints);
                    return (
                        <circle
                            key={`point-${i}`}
                            cx={x}
                            cy={y}
                            r={3}
                            fill="#FBF7EF"
                            className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                    );
                })}

                {/* Draw Labels */}
                {chartData.map((d, i) => {
                    const angle = (Math.PI * 2 * i) / totalPoints - Math.PI / 2;
                    // Push labels out a bit further than the radius
                    const labelRadius = radius * 1.35;
                    const x = center + Math.cos(angle) * labelRadius;
                    const y = center + Math.sin(angle) * labelRadius;

                    // Simple text anchor logic based on x position
                    let textAnchor: 'middle' | 'end' | 'start' = 'middle';
                    if (x < center - 10) textAnchor = 'end';
                    else if (x > center + 10) textAnchor = 'start';

                    return (
                        <text
                            key={`label-${i}`}
                            x={x}
                            y={y}
                            fill="#6B6B6B"
                            fontSize="8"
                            fontWeight="bold"
                            textAnchor={textAnchor}
                            alignmentBaseline="middle"
                            className="uppercase tracking-widest"
                        >
                            {d.label.replace(/_/g, ' ')}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
}
