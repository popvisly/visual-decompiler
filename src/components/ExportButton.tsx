'use client';

import { Printer } from 'lucide-react';

export default function ExportButton() {
    return (
        <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-[#141414] text-accent rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95 no-print"
        >
            <Printer className="w-3.5 h-3.5" />
            <span>Export PDF</span>
        </button>
    );
}
