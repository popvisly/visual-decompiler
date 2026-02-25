'use client';

import { useState } from 'react';
import { FileText, Sparkles, Loader2, Download, CheckCircle2, AlertCircle, Wand2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { PrototypeService, StrategicPrototype } from '@/lib/prototype_service';
import StrategicPrototypeView from '@/components/StrategicPrototype';
import VisualMirror from '@/components/VisualMirror';
import MarketVelocity from '@/components/MarketVelocity';
import SentimentMirror from '@/components/SentimentMirror';
import { NarrativeService, StrategicWhitePaper } from '@/lib/narrative_service';
import StrategicWhitePaperView from '@/components/StrategicWhitePaper';

interface BriefGeneratorProps {
    boardId: string;
    boardName: string;
    isShared?: boolean;
    initialBrief?: any; // Can be string (legacy) or object { content: string }
    initialWhitePaper?: any;
    sampleAd?: any;
}

export default function BriefGenerator({
    boardId,
    boardName,
    isShared = false,
    initialBrief = null,
    initialWhitePaper = null,
    sampleAd = null
}: BriefGeneratorProps) {
    const [generating, setGenerating] = useState(false);
    const [competitorAd, setCompetitorAd] = useState<any>(sampleAd);

    // Extract brief from object if it's the new jsonb format
    const initialContent = typeof initialBrief === 'object' && initialBrief !== null
        ? initialBrief.content
        : initialBrief;

    const [brief, setBrief] = useState<string | null>(initialContent);
    const [visualMirrorData, setVisualMirrorData] = useState<any>(
        typeof initialBrief === 'object' && initialBrief !== null ? initialBrief.visual_mirror : null
    );
    const [forecastingData, setForecastingData] = useState<any>(
        typeof initialBrief === 'object' && initialBrief !== null ? initialBrief.forecasting : null
    );
    const [sentimentData, setSentimentData] = useState<any>(
        typeof initialBrief === 'object' && initialBrief !== null ? initialBrief.sentiment : null
    );
    const [error, setError] = useState<string | null>(null);
    const [prototype, setPrototype] = useState<StrategicPrototype | null>(null);
    const [prototyping, setPrototyping] = useState(false);
    const [viewingPrototype, setViewingPrototype] = useState(false);
    const [whitePaper, setWhitePaper] = useState<StrategicWhitePaper | null>(initialWhitePaper);
    const [generatingPaper, setGeneratingPaper] = useState(false);
    const [viewingPaper, setViewingPaper] = useState(false);

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
            setVisualMirrorData(data.visualMirror);
            setForecastingData(data.forecasting);
            setSentimentData(data.sentiment);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setGenerating(false);
        }
    };

    const generatePrototype = async () => {
        if (!brief) return;
        setPrototyping(true);
        try {
            const result = await PrototypeService.generateFromAnswer(brief, "Aggregated Collection DNA");
            setPrototype(result);
            setViewingPrototype(true);
        } catch (err: any) {
            setError("Prototype generation failed.");
        } finally {
            setPrototyping(false);
        }
    };

    const generateWhitePaper = async () => {
        if (!brief) return;
        setGeneratingPaper(true);
        try {
            const result = await NarrativeService.generate({
                boardId,
                boardName,
                strategicAnswer: brief,
                sentiment: sentimentData,
                forecasting: forecastingData,
                visualDna: "Aggregated Collection DNA" // Placeholder for actual DNA
            });
            setWhitePaper(result);
            setViewingPaper(true);
        } catch (err: any) {
            setError("White Paper synthesis failed.");
        } finally {
            setGeneratingPaper(false);
        }
    };

    return (
        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-[#E7DED1] shadow-[0_20px_50px_rgba(20,20,20,0.03)] overflow-hidden">
            <div className="p-6 md:p-8 border-b border-[#E7DED1] bg-[#FBF7EF]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-[9px] md:text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Neural Synthesis</h3>
                    <h4 className="text-lg md:text-xl font-light text-[#141414] uppercase tracking-tight">The Strategic Answer</h4>
                </div>
                {!brief && !isShared && (
                    <button
                        onClick={generateBrief}
                        disabled={generating}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#141414] text-[#FBF7EF] rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl disabled:opacity-50"
                    >
                        {generating ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : <Sparkles className="w-4 h-4 text-accent" />}
                        {generating ? 'Deconstructing...' : 'Synthesize Answer'}
                    </button>
                )}
            </div>

            <div className="p-6 md:p-8">
                {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 mb-6">
                        <AlertCircle className="w-5 h-5" />
                        <p className="text-xs font-medium">{error}</p>
                    </div>
                )}

                {viewingPaper && whitePaper ? (
                    <StrategicWhitePaperView paper={whitePaper} onClose={() => setViewingPaper(false)} />
                ) : viewingPrototype && prototype ? (
                    <StrategicPrototypeView prototype={prototype} onClose={() => setViewingPrototype(false)} />
                ) : brief ? (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {forecastingData && (
                            <MarketVelocity metrics={forecastingData} />
                        )}

                        {sentimentData && (
                            <SentimentMirror
                                metrics={sentimentData.metrics}
                                psychologicalFootprint={sentimentData.psychologicalFootprint}
                                alignmentScore={sentimentData.alignmentScore}
                            />
                        )}

                        {competitorAd && visualMirrorData && (
                            <VisualMirror
                                competitorImage={competitorAd.media_url}
                                competitorLabel={competitorAd.brand || competitorAd.digest?.meta?.brand_guess || 'Competitor Asset'}
                                directiveTitle={visualMirrorData.title}
                                directiveText={visualMirrorData.directive}
                                rationale={visualMirrorData.rationale}
                            />
                        )}
                        <div className="prose prose-sm max-w-none prose-headings:font-light prose-headings:uppercase prose-headings:tracking-tight prose-p:text-[#6B6B6B] prose-li:text-[#6B6B6B] prose-strong:text-[#141414]">
                            <ReactMarkdown>{brief}</ReactMarkdown>
                        </div>
                        {!isShared && (
                            <div className="pt-8 border-t border-[#E7DED1] flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-green-600">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Synthesis Complete</span>
                                    </div>
                                    <button
                                        onClick={generatePrototype}
                                        disabled={prototyping}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-[#141414] text-[#FBF7EF] rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg disabled:opacity-50 group"
                                    >
                                        {prototyping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />}
                                        {prototyping ? 'Prototyping...' : 'The Remix (Prototype)'}
                                    </button>
                                    <button
                                        onClick={whitePaper ? () => setViewingPaper(true) : generateWhitePaper}
                                        disabled={generatingPaper}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-[#141414] text-[#FBF7EF] rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg disabled:opacity-50"
                                    >
                                        {generatingPaper ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
                                        {generatingPaper ? 'Drafting...' : whitePaper ? 'View White Paper' : 'Strategic White Paper'}
                                    </button>
                                </div>
                                <button
                                    onClick={() => setBrief(null)}
                                    className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest hover:text-[#141414] transition-colors"
                                >
                                    Re-Synthesize
                                </button>
                            </div>
                        )}
                        {prototype && !viewingPrototype && !isShared && (
                            <div className="pt-4 text-center">
                                <button
                                    onClick={() => setViewingPrototype(true)}
                                    className="text-[10px] font-bold text-accent uppercase tracking-widest hover:brightness-110 transition-all border-b border-accent/20 pb-1"
                                >
                                    View Latest Prototype Draft
                                </button>
                            </div>
                        )}
                        {whitePaper && !viewingPaper && (
                            <div className="pt-4 text-center">
                                <button
                                    onClick={() => setViewingPaper(true)}
                                    className="text-[10px] font-bold text-[#141414] uppercase tracking-widest hover:brightness-110 transition-all border-b border-[#141414]/20 pb-1"
                                >
                                    View Latest White Paper Synthesis
                                </button>
                            </div>
                        )}
                    </div>
                ) : !generating ? (
                    <div className="py-20 text-center space-y-4">
                        <div className="w-16 h-16 bg-[#FBF7EF] rounded-3xl flex items-center justify-center mx-auto border border-[#E7DED1]">
                            <Sparkles className="w-6 h-6 text-[#6B6B6B] opacity-40" />
                        </div>
                        <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto leading-relaxed uppercase font-bold tracking-widest opacity-60">
                            Neural deconstruction active.
                        </p>
                        <p className="text-[11px] text-[#6B6B6B] max-w-xs mx-auto leading-relaxed">
                            Provide the **Client Brief** in the adjacent panel. Our engine will synthesize it against the competitive collection to find your "White Space" strategy.
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
                            Cross-Referencing Brief vs Competitors...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
