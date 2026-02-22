'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import ExecutiveSummaryView from '@/components/ExecutiveSummaryView';

interface Props {
    boardName: string;
    strategicAnswer: string | null;
    stats: any[];
    sentiment: any;
}

export default function BoardPresentationTrigger({ boardName, strategicAnswer, stats, sentiment }: Props) {
    const [showPresentation, setShowPresentation] = useState(false);

    if (!strategicAnswer) return null;

    return (
        <>
            <button
                onClick={() => setShowPresentation(true)}
                className="flex items-center gap-3 px-8 py-4 bg-[#141414] text-[#FBF7EF] rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-2xl shadow-black/10 active:scale-95 group"
            >
                <Play className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                Presentation
            </button>

            {showPresentation && (
                <ExecutiveSummaryView
                    boardName={boardName}
                    strategicAnswer={strategicAnswer}
                    stats={stats}
                    sentiment={sentiment}
                    onClose={() => setShowPresentation(false)}
                />
            )}
        </>
    );
}
