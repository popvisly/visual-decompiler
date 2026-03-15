import Link from 'next/link';
import { ArrowUpRight, LayoutGrid } from 'lucide-react';

interface BoardPreview {
    id: string;
    name: string;
    description?: string | null;
    created_at: string;
    previewAssets: {
        id: string;
        imageUrl: string;
    }[];
    itemCount: number;
}

export default function BoardCard({ board }: { board: BoardPreview }) {
    const hasPreview = board.previewAssets.length > 0;

    return (
        <Link
            href={`/boards/${board.id}`}
            className="group block overflow-hidden rounded-[2rem] border border-[#E7DED1] bg-white shadow-[0_12px_40px_rgba(20,20,20,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A574]/40"
        >
            <div className="aspect-[4/3] border-b border-[#E7DED1] bg-[#F3EEE4] p-4">
                {hasPreview ? (
                    <div className="grid h-full grid-cols-2 gap-3">
                        {board.previewAssets.slice(0, 4).map((asset) => (
                            <div key={asset.id} className="overflow-hidden rounded-[1.2rem] bg-[#141414]">
                                <img src={asset.imageUrl} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[#D4A574]/25 bg-white text-center">
                        <LayoutGrid className="h-8 w-8 text-[#D4A574]/40" />
                        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#6B6B6B]">No Assets Yet</p>
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold uppercase tracking-tight text-[#1A1A1A]">{board.name || 'Untitled Board'}</h3>
                        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513]">
                            {board.itemCount} assets · {new Date(board.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[#8B4513]/50 transition-colors group-hover:text-[#8B4513]" />
                </div>

                {board.description && (
                    <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-[#6B6B6B]">
                        {board.description}
                    </p>
                )}
            </div>
        </Link>
    );
}
