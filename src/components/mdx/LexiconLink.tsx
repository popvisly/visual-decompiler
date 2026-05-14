'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function LexiconLink({ term, href = '/docs' }: { term: string; href?: string }) {
    return (
        <span className="inline-flex items-center gap-1 group relative">
            <Link
                href={href}
                className="font-medium text-[#8B6A3D] border-b border-[#8B6A3D]/35 group-hover:border-[#8B6A3D] group-hover:text-[#141414] transition-colors"
            >
                {term}
            </Link>
            <BookOpen className="w-3 h-3 text-black/30 group-hover:text-[#8B6A3D] transition-colors shrink-0" />

            {/* Tooltip */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[220px] bg-white text-[#515151] text-[10px] p-2 rounded-lg border border-black/10 shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none z-50 text-center leading-tight">
                View definition in the Intelligence Lexicon
            </span>
        </span>
    );
}
