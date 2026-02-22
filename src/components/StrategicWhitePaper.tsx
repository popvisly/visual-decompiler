'use client';

import ReactMarkdown from 'react-markdown';
import { StrategicWhitePaper } from '@/lib/narrative_service';
import { FileText, ArrowLeft, Download, Bookmark, Share2 } from 'lucide-react';

interface Props {
    paper: StrategicWhitePaper;
    onClose: () => void;
}

export default function StrategicWhitePaperView({ paper, onClose }: Props) {
    return (
        <div className="fixed inset-0 bg-white z-[100] overflow-y-auto animate-in fade-in duration-500">
            {/* Header / Navigation */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-[#E7DED1] z-10 px-6 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest hover:text-[#141414] transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Return to Board
                    </button>
                    <div className="flex items-center gap-6">
                        <button className="text-[#6B6B6B] hover:text-[#141414] transition-colors">
                            <Download className="w-4 h-4" />
                        </button>
                        <button className="text-[#6B6B6B] hover:text-[#141414] transition-colors">
                            <Bookmark className="w-4 h-4" />
                        </button>
                        <button className="text-[#6B6B6B] hover:text-[#141414] transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Document Content */}
            <article className="max-w-3xl mx-auto px-6 py-24 space-y-24">
                {/* Title & Metadata */}
                <header className="space-y-8">
                    <div className="flex items-center gap-3">
                        <span className="bg-[#141414] text-[#FBF7EF] text-[9px] font-bold px-3 py-1 rounded uppercase tracking-[0.2em]">White Paper</span>
                        <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.2em]">Deconstruction No. {Math.floor(Math.random() * 900) + 100}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-light text-[#141414] leading-[0.95] tracking-tightest uppercase">
                        {paper.title}
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-[#6B6B6B] leading-relaxed max-w-2xl border-l-2 border-accent pl-8 py-2">
                        {paper.description}
                    </p>
                    <div className="flex items-center gap-8 pt-4">
                        <div>
                            <p className="text-[8px] font-bold text-[#141414]/40 uppercase tracking-widest mb-1">Generated</p>
                            <p className="text-[11px] font-bold text-[#141414] uppercase">{new Date(paper.generatedAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-[8px] font-bold text-[#141414]/40 uppercase tracking-widest mb-1">Classification</p>
                            <p className="text-[11px] font-bold text-[#141414] uppercase">Strategic Intelligence</p>
                        </div>
                    </div>
                </header>

                {/* Sections */}
                <div className="space-y-32">
                    {paper.sections.map((section, idx) => (
                        <section key={idx} className="space-y-12">
                            <div className="flex items-center gap-4">
                                <div className="h-[1px] flex-1 bg-[#E7DED1]" />
                                <h2 className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] whitespace-nowrap">
                                    {section.title}
                                </h2>
                                <div className="h-[1px] flex-1 bg-[#E7DED1]" />
                            </div>

                            <div className="prose prose-lg max-w-none prose-headings:font-light prose-headings:uppercase prose-headings:tracking-widest prose-p:text-[#6B6B6B] prose-p:leading-[1.8] prose-p:font-light prose-strong:font-bold prose-strong:text-[#141414] prose-li:text-[#6B6B6B]">
                                <ReactMarkdown>{section.content}</ReactMarkdown>
                            </div>

                            {section.type === 'evidence' && (
                                <div className="p-8 bg-[#FBF7EF] rounded-3xl border border-[#E7DED1] flex items-start gap-6 group hover:bg-white transition-all">
                                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-all">
                                        <FileText className="w-6 h-6 text-accent" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Evidentiary Note</p>
                                        <p className="text-sm text-[#141414] font-medium italic">
                                            The logical anchors identified above correlate with high-velocity mechanics observed across the core competitive collection.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {/* Footer / Legal */}
                <footer className="pt-24 border-t border-[#E7DED1] space-y-8">
                    <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em] text-center">
                        Villains at Large • Proprietary Intelligence Protocol
                    </p>
                    <div className="flex justify-center flex-col items-center gap-4 opacity-50">
                        <div className="w-12 h-12 border border-[#E7DED1] rounded-full flex items-center justify-center">
                            <span className="text-[10px] font-bold">V.</span>
                        </div>
                        <p className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest">Confidential Strategic Deconstruction</p>
                    </div>
                </footer>
            </article>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    .fixed, .sticky, button { display: none !important; }
                    article { margin: 0 !important; width: 100% !important; max-width: 100% !important; padding: 2cm !important; }
                    section { page-break-after: always; padding-top: 2cm !important; }
                    h1 { font-size: 36pt !important; }
                    p { font-size: 11pt !important; }
                }
            `}</style>
        </div>
    );
}
