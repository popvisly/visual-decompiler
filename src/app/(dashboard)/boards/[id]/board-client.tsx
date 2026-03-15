'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Grid3X3, Loader2, PencilLine, Trash2, Archive, FileDown } from 'lucide-react';
import IntelligenceArchiveDrawer from '@/components/IntelligenceArchiveDrawer';
import { Asset } from '@/lib/intelligence_service';
import { useMemo, useState } from 'react';
import ShareBoard from '@/components/ShareBoard';

interface BoardItem {
    id: string;
    mediaUrl: string;
    mediaKind: string;
    brand: string;
    sector: string;
    primaryMechanic: string;
    confidenceScore: number;
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
        archived_at?: string | null;
    };
    items: BoardItem[];
}) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [removingId, setRemovingId] = useState<string | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [name, setName] = useState(board.name);
    const [description, setDescription] = useState(board.description || '');
    const [isSavingSettings, setIsSavingSettings] = useState(false);
    const [settingsError, setSettingsError] = useState<string | null>(null);
    const [isArchiving, setIsArchiving] = useState(false);
    const router = useRouter();

    const averageConfidence = useMemo(() => {
        if (!items.length) return 0;
        const total = items.reduce((sum, item) => sum + (item.confidenceScore || 0), 0);
        return Math.round(total / items.length);
    }, [items]);

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

    const handleSaveSettings = async () => {
        setIsSavingSettings(true);
        setSettingsError(null);

        try {
            const response = await fetch(`/api/boards/${board.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    description,
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(typeof data?.error === 'string' ? data.error : 'Failed to update board');
            }

            setIsSettingsOpen(false);
            router.refresh();
        } catch (error) {
            setSettingsError(error instanceof Error ? error.message : 'Failed to update board');
        } finally {
            setIsSavingSettings(false);
        }
    };

    const handleArchiveBoard = async () => {
        setIsArchiving(true);
        setSettingsError(null);

        try {
            const response = await fetch(`/api/boards/${board.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ archive: true }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(typeof data?.error === 'string' ? data.error : 'Failed to archive board');
            }

            router.push('/boards');
            router.refresh();
        } catch (error) {
            setSettingsError(error instanceof Error ? error.message : 'Failed to archive board');
            setIsArchiving(false);
        }
    };

    const handleExportBoardDossier = () => {
        window.print();
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
                            onClick={() => setIsSettingsOpen(true)}
                            className="rounded-full border border-[#D4A574]/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B4513] transition-colors hover:bg-white"
                        >
                            <span className="inline-flex items-center gap-2">
                                <PencilLine className="h-4 w-4" />
                                Board Settings
                            </span>
                        </button>
                        <button
                            onClick={handleExportBoardDossier}
                            className="rounded-full border border-[#D4A574]/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B4513] transition-colors hover:bg-white"
                        >
                            <span className="inline-flex items-center gap-2">
                                <FileDown className="h-4 w-4" />
                                Export Board Dossier
                            </span>
                        </button>
                        <ShareBoard boardId={board.id} boardName={board.name} />
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

            {isSettingsOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-6 backdrop-blur-sm">
                    <div className="w-full max-w-2xl rounded-[2rem] border border-[#D4A574]/15 bg-[#FBFBF6] p-8 shadow-[0_28px_80px_rgba(20,20,20,0.18)]">
                        <div className="flex items-start justify-between gap-6 border-b border-[#D4A574]/12 pb-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Board Settings</p>
                                <h2 className="mt-3 text-3xl font-light uppercase tracking-tight text-[#1A1A1A]">Control this board</h2>
                                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#6B6B6B]">
                                    Rename the board, refine the description, generate a client-safe share link, or archive it out of the main boards index.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsSettingsOpen(false)}
                                className="rounded-full border border-[#D4A574]/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8B4513] transition-colors hover:bg-white"
                            >
                                Close
                            </button>
                        </div>

                        <div className="mt-6 grid gap-6">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.22em] text-[#8B4513]">Board Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className="mt-3 w-full rounded-[1.25rem] border border-[#D4A574]/18 bg-white px-5 py-4 text-sm text-[#1A1A1A] outline-none transition-colors focus:border-[#D4A574]"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.22em] text-[#8B4513]">Board Description</label>
                                <textarea
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    rows={4}
                                    className="mt-3 w-full resize-none rounded-[1.25rem] border border-[#D4A574]/18 bg-white px-5 py-4 text-sm text-[#1A1A1A] outline-none transition-colors focus:border-[#D4A574]"
                                />
                            </div>

                            <div className="rounded-[1.5rem] border border-[#D4A574]/12 bg-white/70 p-5">
                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B4513]">Client Share Link</p>
                                <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
                                    Generate a clean board link you can send to clients or internal teams without opening the full vault interface.
                                </p>
                                <div className="mt-4">
                                    <ShareBoard boardId={board.id} boardName={board.name} />
                                </div>
                            </div>

                            <div className="rounded-[1.5rem] border border-[#D4A574]/12 bg-white/70 p-5">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B4513]">Archive Board</p>
                                        <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
                                            Archived boards are removed from the main boards index but remain preserved for future retrieval or export.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => void handleArchiveBoard()}
                                        disabled={isArchiving}
                                        className="rounded-full border border-[#D4A574]/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8B4513] transition-colors hover:bg-white disabled:opacity-50"
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            {isArchiving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Archive className="h-4 w-4" />}
                                            {isArchiving ? 'Archiving...' : 'Archive Board'}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {settingsError && (
                                <p className="text-[11px] uppercase tracking-[0.16em] text-[#8B4513]">{settingsError}</p>
                            )}
                        </div>

                        <div className="mt-8 flex flex-col gap-3 md:flex-row md:justify-end">
                            <button
                                onClick={() => setIsSettingsOpen(false)}
                                className="rounded-full border border-[#D4A574]/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8B4513] transition-colors hover:bg-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => void handleSaveSettings()}
                                disabled={isSavingSettings}
                                className="rounded-full bg-[#141414] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#FBF7EF] transition-colors hover:bg-black disabled:opacity-50"
                            >
                                <span className="inline-flex items-center gap-2">
                                    {isSavingSettings && <Loader2 className="h-4 w-4 animate-spin" />}
                                    {isSavingSettings ? 'Saving...' : 'Save Board Settings'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <IntelligenceArchiveDrawer
                isOpen={isDrawerOpen}
                label="SOVEREIGN BOARD"
                onClose={() => setIsDrawerOpen(false)}
                onSelect={(asset) => {
                    void handleAddAsset(asset);
                }}
            />

            <div className="board-dossier-print">
                <section className="board-dossier-page board-dossier-cover">
                    <div className="board-dossier-cover-inner">
                        <p className="board-dossier-kicker">Sovereign Board Dossier</p>
                        <h1 className="board-dossier-title">{board.name}</h1>
                        <p className="board-dossier-subtitle">
                            {board.description || 'Curated intelligence collection for client, campaign, or competitor review.'}
                        </p>
                        <div className="board-dossier-meta">
                            <span>{items.length} Assets</span>
                            <span>{averageConfidence}% Avg Confidence</span>
                            <span>{new Date(board.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </section>

                <section className="board-dossier-page">
                    <div className="board-dossier-section-header">
                        <span className="board-dossier-section-number">01</span>
                        <div>
                            <p className="board-dossier-section-kicker">Board Overview</p>
                            <h2 className="board-dossier-section-title">Collection Snapshot</h2>
                        </div>
                    </div>

                    <div className="board-dossier-stats">
                        <div className="board-dossier-stat-card">
                            <span className="board-dossier-stat-value">{items.length}</span>
                            <span className="board-dossier-stat-label">Assets</span>
                        </div>
                        <div className="board-dossier-stat-card">
                            <span className="board-dossier-stat-value">{averageConfidence}%</span>
                            <span className="board-dossier-stat-label">Average Confidence</span>
                        </div>
                        <div className="board-dossier-stat-card">
                            <span className="board-dossier-stat-value">{new Set(items.map((item) => item.sector)).size}</span>
                            <span className="board-dossier-stat-label">Sectors Represented</span>
                        </div>
                    </div>

                    <div className="board-dossier-summary-grid">
                        {items.map((item, index) => (
                            <div key={`${item.itemType}-${item.id}`} className="board-dossier-summary-card">
                                <p className="board-dossier-item-index">{String(index + 1).padStart(2, '0')}</p>
                                <h3>{item.brand}</h3>
                                <p>{item.sector}</p>
                                <span>{item.primaryMechanic}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {items.map((item, index) => (
                    <section key={`print-${item.itemType}-${item.id}`} className="board-dossier-page">
                        <div className="board-dossier-section-header">
                            <span className="board-dossier-section-number">{String(index + 2).padStart(2, '0')}</span>
                            <div>
                                <p className="board-dossier-section-kicker">Asset Profile</p>
                                <h2 className="board-dossier-section-title">{item.brand}</h2>
                            </div>
                        </div>

                        <div className="board-dossier-item-grid">
                            <div className="board-dossier-image-frame">
                                <img src={item.mediaUrl} alt={item.brand} className="h-full w-full object-cover" />
                            </div>
                            <div className="board-dossier-copy">
                                <p className="board-dossier-copy-label">Sector</p>
                                <p className="board-dossier-copy-value">{item.sector}</p>

                                <p className="board-dossier-copy-label">Primary Mechanic</p>
                                <p className="board-dossier-copy-value">{item.primaryMechanic}</p>

                                <p className="board-dossier-copy-label">Confidence</p>
                                <p className="board-dossier-copy-value">{item.confidenceScore}%</p>

                                <p className="board-dossier-copy-label">Board Role</p>
                                <p className="board-dossier-copy-body">
                                    This asset sits inside the collection as part of a curated comparative set, preserving the creative mechanic for internal review, client conversation, or strategic reference.
                                </p>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            <style jsx global>{`
                .board-dossier-print {
                    display: none;
                }

                @media print {
                    @page {
                        size: A4;
                        margin: 18mm;
                    }

                    body * {
                        visibility: hidden !important;
                    }

                    .board-dossier-print,
                    .board-dossier-print * {
                        visibility: visible !important;
                    }

                    .board-dossier-print {
                        display: block !important;
                        position: absolute;
                        inset: 0;
                        background: #f8f6ef;
                        color: #1a1a1a;
                    }

                    .board-dossier-page {
                        min-height: calc(297mm - 36mm);
                        page-break-after: always;
                        padding: 0;
                    }

                    .board-dossier-cover {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #f3efe5;
                        border: 1px solid #dccaa9;
                    }

                    .board-dossier-cover-inner {
                        max-width: 150mm;
                        text-align: center;
                    }

                    .board-dossier-kicker,
                    .board-dossier-section-kicker,
                    .board-dossier-copy-label,
                    .board-dossier-stat-label,
                    .board-dossier-item-index {
                        font-size: 9pt;
                        font-weight: 700;
                        letter-spacing: 0.28em;
                        text-transform: uppercase;
                        color: #8b6a36;
                    }

                    .board-dossier-title,
                    .board-dossier-section-title {
                        margin-top: 12pt;
                        font-size: 28pt;
                        font-weight: 300;
                        letter-spacing: 0.02em;
                        text-transform: uppercase;
                    }

                    .board-dossier-subtitle {
                        margin-top: 16pt;
                        font-size: 12pt;
                        line-height: 1.8;
                        color: #5d5d57;
                    }

                    .board-dossier-meta {
                        display: flex;
                        justify-content: center;
                        gap: 18pt;
                        margin-top: 22pt;
                        font-size: 9pt;
                        letter-spacing: 0.18em;
                        text-transform: uppercase;
                        color: #6d6b64;
                    }

                    .board-dossier-section-header {
                        display: flex;
                        align-items: baseline;
                        gap: 14pt;
                        padding-bottom: 12pt;
                        border-bottom: 1px solid #dccaa9;
                    }

                    .board-dossier-section-number {
                        font-size: 26pt;
                        font-weight: 300;
                        color: #c1a67b;
                    }

                    .board-dossier-stats {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 12pt;
                        margin-top: 24pt;
                    }

                    .board-dossier-stat-card,
                    .board-dossier-summary-card {
                        border: 1px solid #dccaa9;
                        background: white;
                        padding: 14pt;
                        border-radius: 14pt;
                    }

                    .board-dossier-stat-value {
                        display: block;
                        font-size: 24pt;
                        font-weight: 300;
                        color: #1a1a1a;
                    }

                    .board-dossier-summary-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 12pt;
                        margin-top: 24pt;
                    }

                    .board-dossier-summary-card h3,
                    .board-dossier-copy-value {
                        margin-top: 10pt;
                        font-size: 15pt;
                        font-weight: 500;
                        text-transform: uppercase;
                    }

                    .board-dossier-summary-card p,
                    .board-dossier-copy-body {
                        margin-top: 8pt;
                        font-size: 11pt;
                        line-height: 1.7;
                        color: #5d5d57;
                    }

                    .board-dossier-summary-card span {
                        display: block;
                        margin-top: 12pt;
                        font-size: 10pt;
                        line-height: 1.5;
                    }

                    .board-dossier-item-grid {
                        display: grid;
                        grid-template-columns: 1.1fr 1fr;
                        gap: 18pt;
                        margin-top: 24pt;
                    }

                    .board-dossier-image-frame {
                        overflow: hidden;
                        border-radius: 18pt;
                        border: 1px solid #dccaa9;
                        background: white;
                        aspect-ratio: 4 / 5;
                    }

                    .board-dossier-copy {
                        display: grid;
                        align-content: start;
                        gap: 10pt;
                    }
                }
            `}</style>
        </div>
    );
}
