'use client';

import { useState } from 'react';
import { FileText, Save, Loader2, CheckCircle2 } from 'lucide-react';

interface BriefIngestProps {
    boardId: string;
    initialBrief?: string | null;
}

export default function BriefIngest({ boardId, initialBrief = '' }: BriefIngestProps) {
    const [briefText, setBriefText] = useState(initialBrief || '');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/dashboard/boards/${boardId}/brief`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ briefText })
            });
            if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            }
        } catch (err) {
            console.error('Failed to save brief:', err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-[2.5rem] border border-[#E7DED1] shadow-[0_20px_50px_rgba(20,20,20,0.03)] overflow-hidden">
            <div className="p-8 border-b border-[#E7DED1] bg-[#FBF7EF]/30 flex items-center justify-between">
                <div>
                    <h3 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Strategic Context</h3>
                    <h4 className="text-xl font-light text-[#141414] uppercase tracking-tight">Client Brief Ingest</h4>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving || !briefText}
                    className="flex items-center gap-2 px-6 py-3 bg-[#141414] text-[#FBF7EF] rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl disabled:opacity-50"
                >
                    {saving ? (
                        <Loader2 className="w-4 h-4 animate-spin text-accent" />
                    ) : saved ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                        <Save className="w-4 h-4 text-accent" />
                    )}
                    {saving ? 'Archiving...' : saved ? 'Archived' : 'Lock Context'}
                </button>
            </div>
            <div className="p-8">
                <textarea
                    value={briefText}
                    onChange={(e) => setBriefText(e.target.value)}
                    placeholder="Paste the raw client brief, objectives, or strategic pillars here..."
                    className="w-full bg-[#FBF7EF]/50 border-none rounded-[1.5rem] p-8 text-sm md:text-md text-[#141414] min-h-[300px] focus:ring-1 focus:ring-accent transition-all resize-none italic leading-relaxed"
                />
                <div className="mt-6 flex items-center gap-3 text-[#6B6B6B]/40">
                    <FileText className="w-4 h-4" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">
                        Metadata: {briefText.split(/\s+/).filter(Boolean).length} Words / Intelligence Layer Active
                    </p>
                </div>
            </div>
        </div>
    );
}
