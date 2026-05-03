"use client";

import React from 'react';
import AnalyticWaveMap from './AnalyticWaveMap';

interface DossierGridProps {
    title: string;
    content: string;
    type: 'ACT' | 'CHANNEL';
    activeAct?: string | null;
}

const DossierGrid = ({ title, content, type, activeAct }: DossierGridProps) => {
    if (!content) return null;

    // Parsing logic
    const regex = type === 'ACT' ? /\bACT\s+[IVX]+:/i : /\bCHANNEL\s+\d+:/i;
    const parts = content.split(regex);
    const matches = content.match(new RegExp(regex, 'gi')) || [];

    // The first part is usually intro text (Overture)
    const overture = parts[0]?.trim();
    
    const normalizeShoutyText = (raw: string): string => {
        const cleaned = raw.replace(/\s+/g, ' ').trim();
        if (!cleaned) return '';
        const alpha = cleaned.replace(/[^A-Za-z]/g, '');
        if (alpha.length < 24) return cleaned;
        const upperRatio =
            alpha.length === 0
                ? 0
                : (alpha.match(/[A-Z]/g)?.length || 0) / alpha.length;

        const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
        const hasShoutySentence = sentences.some((sentence) => {
            const sentenceAlpha = sentence.replace(/[^A-Za-z]/g, '');
            if (sentenceAlpha.length < 20) return false;
            const sentenceUpperRatio =
                sentenceAlpha.length === 0
                    ? 0
                    : (sentenceAlpha.match(/[A-Z]/g)?.length || 0) / sentenceAlpha.length;
            return sentenceUpperRatio > 0.78;
        });

        if (upperRatio < 0.72 && !hasShoutySentence) return cleaned;

        const lowered = cleaned.toLowerCase();
        return lowered
            .replace(/(^|[.!?]\s+)([a-z])/g, (_m, start, ch) => `${start}${ch.toUpperCase()}`)
            .replace(/\b(chanel|vb|ad|cta|dna|hud)\b/gi, (m) => m.toUpperCase());
    };

    const blocks = parts.slice(1).map((text, i) => {
        const trimmed = text.trim();
        if (type === 'CHANNEL') {
            return {
                label: matches[i]?.replace(':', '').trim(),
                text: normalizeShoutyText(trimmed),
                title: ''
            };
        }
        return {
            label: matches[i]?.replace(':', '').trim(),
            text: trimmed.split(' — ')[1] || trimmed,
            title: trimmed.split(' — ')[0] || ''
        };
    });

    const toParagraphs = (raw: string): string[] => {
        const normalized = raw.replace(/\s+/g, ' ').trim();
        if (!normalized) return [];

        const manual = raw
            .split(/\n+/)
            .map((p) => p.trim())
            .filter(Boolean);
        if (manual.length > 1) return manual;

        const sentences = normalized.split(/(?<=[.!?])\s+/).filter(Boolean);
        if (sentences.length <= 2) return [normalized];

        const chunks: string[] = [];
        for (let i = 0; i < sentences.length; i += 2) {
            chunks.push(sentences.slice(i, i + 2).join(' ').trim());
        }
        return chunks;
    };

    return (
        <div className={`space-y-6 ${type === 'CHANNEL' ? 'mx-auto max-w-[86ch]' : ''}`}>
            {/* Semiotic Subtext Header Card */}
            {(title || overture) && (
                <div className="rounded-[1.8rem] border border-black/5 bg-[#FBFBF6] p-8 shadow-sm">
                    <div className="mb-6 flex items-center justify-between border-b border-black/5 pb-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#141414]">{title}</h3>
                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#141414]/30">Forensic Map v2.0</span>
                    </div>

                    {/* Overture */}
                    {overture && (
                        <div className="max-h-[400px] space-y-5 overflow-y-auto pr-1">
                            {toParagraphs(overture).map((paragraph, pi) => (
                                <p key={pi} className="text-[14px] font-medium leading-relaxed text-[#515151]">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Keep dossier sections vertically stacked to preserve reading width */}
            {blocks.length > 0 && (
                <div className="space-y-4">
                    {blocks.map((block, i) => (
                        <div
                            key={i}
                            id={type === 'ACT' ? block.label : undefined}
                            className={`rounded-[1.8rem] border p-8 flex flex-col transition-all ${
                                type === 'ACT'
                                    ? 'forensic-act-block min-h-[260px] scroll-mt-24'
                                    : ''
                            } ${
                                type === 'ACT' && activeAct === block.label
                                    ? 'border-[#D4A574]/30 bg-white shadow-md'
                                    : 'border-black/5 bg-[#FCFBF9] hover:bg-white hover:border-black/10'
                            }`}
                        >
                            {type === 'ACT' ? (
                                <>
                                    <div className="flex items-center gap-3 mb-6 border-b border-black/5 pb-6">
                                        <div className={`w-1.5 h-1.5 rounded-full transition-all ${activeAct === block.label ? 'bg-[#8B6A3D] animate-pulse' : 'bg-[#8B6A3D]/40'}`} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#141414]">{block.label}</span>
                                    </div>
                                    <h3 className="text-[2.2rem] font-black uppercase tracking-tight text-[#141414] md:text-[2.8rem] leading-[0.95] mb-4">
                                        {block.title}
                                    </h3>
                                    <AnalyticWaveMap index={i} isActive={activeAct === block.label} />
                                    <div className="flex-1 pt-8">
                                        <div className="max-w-[78ch] space-y-5">
                                            {toParagraphs(block.text).map((paragraph, pi) => (
                                                <p key={pi} className="text-[15px] font-medium leading-relaxed text-[#515151]">
                                                    {paragraph.trim()}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#8B6A3D]" />
                                        <span className="text-[10px] font-black text-[#141414] uppercase tracking-[0.2em]">{block.label}</span>
                                    </div>
                                    {block.title ? (
                                        <h3 className="border-b border-black/5 pb-6 text-[1.8rem] font-black uppercase tracking-tight text-[#141414] leading-tight">
                                            {block.title}
                                        </h3>
                                    ) : null}
                                    <div className={`${block.title ? 'pt-6' : 'pt-2'} max-w-[72ch] space-y-4`}>
                                        {toParagraphs(block.text).map((paragraph, pi) => (
                                            <p key={pi} className="text-[14px] font-medium leading-relaxed text-[#515151]">
                                                {paragraph.trim()}
                                            </p>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DossierGrid;
