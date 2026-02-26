'use client';

import { useSelection } from './SelectionProvider';
import DossierMultiExport from './DossierMultiExport';
import { Shield, LayoutGrid, X } from 'lucide-react';
import Link from 'next/link';

export default function ExecutiveCommandBar({ isExecutiveView }: { isExecutiveView: boolean }) {
    const { count, clearAll } = useSelection();

    return (
        <div className="flex items-center gap-3 flex-wrap">
            {/* Selection counter — appears when items are selected */}
            {count > 0 && (
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 animate-in fade-in slide-in-from-left-2">
                    <span className="text-[10px] font-bold text-[#141414] uppercase tracking-[0.1em]">
                        {count} Asset{count !== 1 ? 's' : ''} Selected
                    </span>
                    <button
                        onClick={clearAll}
                        className="p-0.5 rounded-full hover:bg-accent/20 transition-colors"
                        aria-label="Clear selection"
                    >
                        <X className="w-3 h-3 text-[#6B6B6B]" />
                    </button>
                </div>
            )}

            {/* Executive Command / Operational View toggle */}
            <Link
                href={isExecutiveView ? '/dashboard' : '/dashboard?v=executive'}
                className={`flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${isExecutiveView
                    ? 'bg-accent text-[#141414] border-accent'
                    : 'bg-white text-[#6B6B6B] border-[#E7DED1] hover:border-accent'
                    }`}
            >
                {isExecutiveView ? (
                    <>
                        <LayoutGrid className="w-4 h-4" />
                        Operational View
                    </>
                ) : (
                    <>
                        <Shield className="w-4 h-4" />
                        Executive Command
                        {count > 0 && (
                            <span className="ml-1 px-2 py-0.5 rounded-full bg-[#141414] text-[#FBF7EF] text-[9px]">
                                {count}
                            </span>
                        )}
                    </>
                )}
            </Link>

            {/* Dossier export — when 2+ selected */}
            {count >= 2 && <DossierMultiExport />}
        </div>
    );
}
