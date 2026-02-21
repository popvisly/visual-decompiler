'use client';

import { useState } from 'react';
import { FileText, Sparkles, Loader2, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BriefGeneratorProps {
    boardId: string;
    boardName: string;
}

export default function BriefGenerator({ boardId, boardName }: BriefGeneratorProps) {
    const [generating, setGenerating] = useState(false);
    const [brief, setBrief] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const generateBrief = async () => {
        setGenerating(true);
        setError(null);
        try {
            const res = await fetch('/api/brief', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boardId })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setBrief(data.brief);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="bg-white rounded-[2.5rem] border border-[#E7DED1] shadow-[0_20px_50px_rgba(20,20,20,0.03)] overflow-hidden">
            <div className="p-8 border-b border-[#E7DED1] bg-[#FBF7EF]/30 flex items-center justify-between">
                <div>
                    <h3 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Strategic Intelligence</h3>
                    <h4 className="text-xl font-light text-[#141414] uppercase tracking-tight">High-IQ Creative Brief</h4>
                </div>
                {!brief && (
                    <button
                        onClick={generateBrief}
                        disabled={generating}
                        className="flex items-center gap-2 px-6 py-3 bg-[#141414] text-[#FBF7EF] rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl disabled:opacity-50"
                    >
                        {generating ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : <Sparkles className="w-4 h-4 text-accent" />}
                        {generating ? 'Drafting Brief...' : 'Synthesize Collection'}
                    </button>
                )}
            </div>

            <div className="p-8">
                {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 mb-6">
                        <AlertCircle className="w-5 h-5" />
                        <p className="text-xs font-medium">{error}</p>
                    </div>
                )}

                {brief ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="prose prose-sm max-w-none prose-headings:font-light prose-headings:uppercase prose-headings:tracking-tight prose-p:text-[#6B6B6B] prose-li:text-[#6B6B6B]">
                            <ReactMarkdown>{brief}</ReactMarkdown>
                        </div>
                        <div className="pt-8 border-t border-[#E7DED1] flex items-center justify-between">
                            <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Brief Ready</span>
                            </div>
                            <button
                                onClick={() => setBrief(null)}
                                className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest hover:text-[#141414] transition-colors"
                            >
                                Re-generate
                            </button>
                        </div>
                    </div>
                ) : !generating ? (
                    <div className="py-20 text-center space-y-4">
                        <div className="w-16 h-16 bg-[#FBF7EF] rounded-3xl flex items-center justify-center mx-auto border border-[#E7DED1]">
                            <FileText className="w-6 h-6 text-[#6B6B6B] opacity-40" />
                        </div>
                        <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto leading-relaxed">
                            Synthesize this collection into a structured brief. Our models will account for **narrative hook architecture** and **competitor pattern shifts** detected across the board.
                        </p>
                    </div>
                ) : (
                    <div className="py-20 text-center space-y-6">
                        <div className="flex justify-center gap-1">
                            {[0, 1, 2].map(i => (
                                <div key={i} className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                            ))}
                        </div>
                        <p className="text-[10px] font-bold text-[#141414] uppercase tracking-widest animate-pulse">
                            Synthesizing Strategic Patterns...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
