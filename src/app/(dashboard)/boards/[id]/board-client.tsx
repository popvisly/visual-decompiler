'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Grid3X3, Trash2 } from 'lucide-react';
import IntelligenceArchiveDrawer from '@/components/IntelligenceArchiveDrawer';
import { Asset } from '@/lib/intelligence_service';
import { useState } from 'react';

interface BoardItem {
    id: string;
    mediaUrl: string;
    mediaKind: string;
    brand: string;
    primaryMechanic: string;
    href: string;
    itemType: 'asset' | 'ad';
}

export default function BoardClientWorkspace({
    board,
    items,
}: {
    board: {
        id: string;
        name: string;
        description?: string | null;
        created_at: string;
    };
    items: BoardItem[];
}) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [removingId, setRemovingId] = useState<string | null>(null);
    const router = useRouter();

    const handleAddAsset = async (asset: Asset) => {
        await fetch(`/api/boards/${board.id}/items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ assetId: asset.id }),
        });

        setIsDrawerOpen(false);
        router.refresh();
    };

    const handleRemoveItem = async (item: BoardItem) => {
        setRemovingId(item.id);
        try {
            await fetch(`/api/boards/${board.id}/items`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item.itemType === 'asset' ? { assetId: item.id } : { adId: item.id }),
            });
            router.refresh();
        } finally {
            setRemovingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#FBFBF6] text-[#1A1A1A] p-8 md:p-12">
            <div className="mx-auto max-w-7xl">
                <header className="mb-12 flex flex-col gap-8 border-b border-[#D4A574]/15 pb-10 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#D4A574]">Sovereign Board</p>
                        <h1 className="mt-4 text-4xl font-light uppercase tracking-tight text-[#1A1A1A]">{board.name}</h1>
                        <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">
                            {items.length} assets · created {new Date(board.created_at).toLocaleDateString()}
                        </p>
                        {board.description && (
                            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#6B6B6B]">{board.description}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row">
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="rounded-full border border-[#D4A574]/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B4513] transition-colors hover:bg-white"
                        >
                            + Add From Vault
                        </button>
                        <Link
                            href="/vault"
                            className="rounded-full bg-[#141414] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBF7EF] transition-colors hover:bg-black"
                        >
                            Return to Vault
                        </Link>
                    </div>
                </header>

                {items.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {items.map((item) => (
                            <article key={`${item.itemType}-${item.id}`} className="overflow-hidden rounded-[2rem] border border-[#E7DED1] bg-white shadow-[0_16px_50px_rgba(20,20,20,0.05)]">
                                <Link href={item.href} className="block aspect-[4/3] overflow-hidden bg-[#141414]">
                                    <img src={item.mediaUrl} alt={item.brand} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                                </Link>
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-lg font-semibold uppercase tracking-tight text-[#1A1A1A]">{item.brand}</p>
                                            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513]">{item.primaryMechanic}</p>
                                        </div>
                                        <button
                                            onClick={() => void handleRemoveItem(item)}
                                            disabled={removingId === item.id}
                                            className="rounded-full border border-[#D4A574]/20 p-2 text-[#8B4513] transition-colors hover:bg-[#D4A574]/10 disabled:opacity-50"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="flex aspect-video flex-col items-center justify-center gap-6 rounded-[2.5rem] border border-dashed border-[#D4A574]/20 bg-white text-center">
                        <Grid3X3 className="h-10 w-10 text-[#D4A574]/35" />
                        <div className="space-y-3">
                            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#8B4513]">No assets in this board yet</p>
                            <p className="max-w-md text-sm leading-relaxed text-[#6B6B6B]">
                                Add assets from your Intelligence Vault to build this collection for a client, campaign, or competitive set.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="rounded-full bg-[#141414] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBF7EF] transition-colors hover:bg-black"
                        >
                            + Add From Vault
                        </button>
                    </div>
                )}
            </div>

            <IntelligenceArchiveDrawer
                isOpen={isDrawerOpen}
                label="SOVEREIGN BOARD"
                onClose={() => setIsDrawerOpen(false)}
                onSelect={(asset) => {
                    void handleAddAsset(asset);
                }}
            />
        </div>
    );
}
