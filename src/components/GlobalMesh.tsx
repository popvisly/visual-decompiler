'use client';

import { useState, useEffect } from 'react';
import { Globe, Users, Zap, ShieldAlert, ArrowUpRight, Network, Sparkles, AlertCircle } from 'lucide-react';
import { MacroCluster } from '@/lib/mesh_service';

export default function GlobalMesh() {
    const [data, setData] = useState<{ clusters: MacroCluster[], boardConnections: any[] } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMesh() {
            try {
                const res = await fetch('/api/mesh');
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error("Failed to load global mesh", err);
            } finally {
                setLoading(false);
            }
        }
        fetchMesh();
    }, []);

    if (loading) return (
        <div className="h-[400px] flex flex-col items-center justify-center space-y-4 bg-[#141414] rounded-[3rem] border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(#FBF7EF_1px,transparent_1px),linear-gradient(90deg,#FBF7EF_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin relative z-10" />
            <p className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] relative z-10 animate-pulse">Syncing Intelligence Mesh...</p>
        </div>
    );

    if (!data || !data.clusters || data.clusters.length === 0) return (
        <div className="p-16 bg-[#141414] rounded-[3rem] border border-white/5 relative overflow-hidden flex items-center justify-between group">
            <div className="absolute inset-0 opacity-5 [background-image:linear-gradient(#FBF7EF_1px,transparent_1px),linear-gradient(90deg,#FBF7EF_1px,transparent_1px)] [background-size:64px_64px]" />
            <div className="relative z-10">
                <h3 className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                    <Network className="w-3.5 h-3.5" /> Intelligence Mesh
                </h3>
                <h2 className="text-3xl font-light text-[#FBF7EF] tracking-tightest uppercase mb-4">Awaiting Signal Synchronization</h2>
                <p className="text-[12px] text-[#FBF7EF]/40 max-w-sm uppercase tracking-widest font-bold">Cross-board strategic cross-pollination will occur once significant pattern clusters are detected.</p>
            </div>
            <div className="relative z-10 opacity-20 group-hover:opacity-40 transition-opacity">
                <Globe className="w-32 h-32 text-[#FBF7EF]" />
            </div>
        </div>
    );

    return (
        <div className="space-y-12 animate-in fade-in duration-1000">
            {/* Mesh Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Global Cluster Feed */}
                <div className="lg:col-span-2 bg-[#141414] rounded-[3rem] p-12 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Network className="w-64 h-64 text-accent" />
                    </div>

                    <header className="relative z-10 flex items-center justify-between mb-16">
                        <div>
                            <h3 className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5" /> Macro clusters detected
                            </h3>
                            <h2 className="text-4xl font-light text-[#FBF7EF] tracking-tightest uppercase">Global Intelligence Mesh</h2>
                        </div>
                        <div className="flex -space-x-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#141414] bg-[#FBF7EF]/10 flex items-center justify-center overflow-hidden">
                                    <Globe className="w-5 h-5 text-[#FBF7EF]/20" />
                                </div>
                            ))}
                        </div>
                    </header>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {data.clusters.map(cluster => (
                            <div key={cluster.id} className="p-8 bg-white/5 border border-white/10 rounded-[2rem] space-y-6 hover:border-accent/40 transition-all group">
                                <div className="flex items-center justify-between">
                                    <span className="bg-accent/10 text-accent text-[8px] font-bold px-3 py-1 rounded uppercase tracking-[0.2em]">Macro Shift</span>
                                    <span className={`text-[8px] font-bold uppercase tracking-widest ${cluster.impactLevel === 'high' ? 'text-red-400' : 'text-blue-400'}`}>
                                        {cluster.impactLevel} Impact
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-[14px] font-bold text-[#FBF7EF] uppercase tracking-widest mb-2 group-hover:text-accent transition-colors">{cluster.title}</h4>
                                    <p className="text-[13px] text-[#FBF7EF]/50 font-light leading-relaxed">{cluster.description}</p>
                                </div>
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-3 h-3 text-[#FBF7EF]/40" />
                                        <span className="text-[9px] font-bold text-[#FBF7EF]/40 uppercase tracking-widest">{cluster.boardsInvolved.length} Boards In-Sync</span>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-[#FBF7EF]/20 group-hover:text-accent transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Real-time System Status */}
                <div className="space-y-8">
                    <div className="bg-[#FBF7EF] border border-[#E7DED1] rounded-[2.5rem] p-10 space-y-8">
                        <h4 className="text-[10px] font-bold text-[#141414] uppercase tracking-[0.3em] flex items-center gap-3">
                            Mesh Health <Zap className="w-3.5 h-3.5 text-accent" />
                        </h4>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold uppercase tracking-widest text-[#141414]">Live Connections</span>
                                <span className="text-[11px] font-mono text-accent">{data.boardConnections.length} Active</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#141414]/5 rounded-full overflow-hidden">
                                <div className="h-full bg-accent animate-pulse" style={{ width: '85%' }} />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-[#E7DED1] space-y-4">
                            <div className="flex items-start gap-4">
                                <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                <p className="text-[11px] text-[#141414]/60 leading-relaxed font-bold uppercase tracking-tight">
                                    High cross-pollination detected in <span className="text-[#141414]">Aesthetic Logic</span> pipelines across the organization.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-accent rounded-[2.5rem] p-10 text-[#FBF7EF]">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 opacity-60">Collective Intel Alert</p>
                        <h3 className="text-xl font-light tracking-tight leading-tight italic">
                            "Your agency's total strategic moat is currently expanding by 12% weekly due to mesh synchronization."
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
