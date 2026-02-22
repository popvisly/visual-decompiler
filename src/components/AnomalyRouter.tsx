'use client';

import { useState, useEffect } from 'react';
import { Shield, Radio, Users, Bell, ChevronRight, Activity, Brain, Target, Zap, Clock } from 'lucide-react';
import { RoutingService, HANDLERS, AnomalyRoute, StrategicHandler } from '@/lib/routing_service';

export default function AnomalyRouter() {
    const [routes, setRoutes] = useState<AnomalyRoute[]>([]);
    const [selectedHandler, setSelectedHandler] = useState<StrategicHandler | null>(null);

    useEffect(() => {
        setRoutes(RoutingService.getActiveRoutes());
    }, []);

    const getHandler = (id: string) => HANDLERS.find(h => h.id === id);

    const iconMap = {
        emotional: <Activity className="w-4 h-4" />,
        intellectual: <Brain className="w-4 h-4" />,
        aggression: <Target className="w-4 h-4" />,
        production: <Zap className="w-4 h-4" />,
        general: <Shield className="w-4 h-4" />,
    };

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-[#E7DED1] pb-12">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-[#141414] text-[#FBF7EF] text-[9px] font-bold px-3 py-1 rounded uppercase tracking-[0.2em]">Operational Dispatch</span>
                        <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] flex items-center gap-2">
                            <Radio className="w-3 h-3 animate-pulse" /> Live Routing Active
                        </span>
                    </div>
                    <h2 className="text-5xl font-light text-[#141414] tracking-tightest uppercase leading-none">
                        Strategic<br />
                        <span className="text-[#6B6B6B]/30 white-space-nowrap">Anomaly Control</span>
                    </h2>
                </div>

                <div className="flex gap-4">
                    <div className="p-6 bg-white border border-[#E7DED1] rounded-3xl flex items-center gap-6 shadow-[0_20px_50px_rgba(20,20,20,0.02)]">
                        <div className="text-right border-r border-[#E7DED1] pr-6">
                            <p className="text-[24px] font-light text-[#141414]">{routes.length}</p>
                            <p className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest">Active Routes</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[24px] font-light text-[#141414]">{HANDLERS.length}</p>
                            <p className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest">Team Handlers</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Team Handlers */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[11px] font-bold text-[#141414] uppercase tracking-[0.3em] flex items-center gap-3">
                            Strategic Handlers <Users className="w-3.5 h-3.5 text-[#6B6B6B]/40" />
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {HANDLERS.map((handler) => (
                            <button
                                key={handler.id}
                                onClick={() => setSelectedHandler(handler)}
                                className={`p-6 bg-white border rounded-3xl text-left transition-all duration-500 group relative overflow-hidden ${selectedHandler?.id === handler.id
                                        ? 'border-[#141414] shadow-[0_30px_60px_rgba(20,20,20,0.05)]'
                                        : 'border-[#E7DED1] hover:border-[#141414]'
                                    }`}
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 dark:opacity-5 transition-opacity">
                                    {iconMap[handler.bias as keyof typeof iconMap]}
                                </div>

                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-[#FBF7EF] border border-[#E7DED1] rounded-2xl flex items-center justify-center group-hover:bg-[#141414] transition-colors">
                                        <span className="text-[14px] font-bold text-[#141414] group-hover:text-[#FBF7EF] tracking-tight">{handler.avatar}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-[12px] font-bold text-[#141414] uppercase tracking-widest leading-none">{handler.name}</h4>
                                        <p className="text-[9px] text-[#6B6B6B] font-medium uppercase tracking-[0.1em]">{handler.role}</p>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-[#FBF7EF] group-hover:border-[#141414]/10 transition-colors">
                                    <span className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-[0.2em] flex items-center gap-2">
                                        Focus: <span className="text-accent">{handler.bias} anomalies</span>
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Live Dispatch Feed */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[11px] font-bold text-[#141414] uppercase tracking-[0.3em] flex items-center gap-3">
                            Live Dispatch Feed <Activity className="w-3.5 h-3.5 text-accent animate-pulse" />
                        </h3>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#6B6B6B]">Auto-Scrolling</span>
                    </div>

                    <div className="bg-[#FBF7EF] border border-[#E7DED1] rounded-[3rem] p-12 space-y-8 shadow-inner">
                        {routes.length === 0 ? (
                            <div className="py-20 text-center space-y-4">
                                <div className="w-12 h-12 border-2 border-[#E7DED1] border-t-accent rounded-full animate-spin mx-auto" />
                                <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest">Awaiting Strategic Triggers...</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {routes.map((route) => {
                                    const handler = getHandler(route.handlerId);
                                    return (
                                        <div key={route.id} className="bg-white border border-[#E7DED1] p-8 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:border-[#141414] transition-all duration-500 shadow-[0_20px_60px_rgba(20,20,20,0.02)]">
                                            <div className="flex items-start gap-6">
                                                <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${route.severity === 'critical' ? 'bg-red-500 animate-pulse' :
                                                        route.severity === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                                                    }`} />
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3">
                                                        <h4 className="text-[14px] font-light text-[#141414] tracking-tight">{route.anomalyType}</h4>
                                                        <span className="text-[8px] font-bold px-2 py-0.5 border border-[#E7DED1] rounded uppercase tracking-widest text-[#6B6B6B] group-hover:text-accent transition-colors">
                                                            {route.dimension}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-[9px] font-bold text-[#6B6B6B] uppercase tracking-widest">
                                                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {new Date(route.timestamp).toLocaleTimeString()}</span>
                                                        <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> Assigned to {handler?.name}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 border-l border-[#FBF7EF] md:pl-8">
                                                <div className="text-right">
                                                    <p className={`text-[10px] font-bold uppercase tracking-widest ${route.status === 'assigned' ? 'text-accent' : 'text-[#6B6B6B]'
                                                        }`}>{route.status}</p>
                                                    <p className="text-[8px] text-[#6B6B6B]/40 uppercase tracking-widest">Dispatch Status</p>
                                                </div>
                                                <div className="w-10 h-10 bg-[#141414] rounded-xl flex items-center justify-center text-[#FBF7EF] group-hover:scale-110 transition-transform">
                                                    <ChevronRight className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div className="pt-8 mt-8 border-t border-[#E7DED1] flex items-center gap-4 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                            <Bell className="w-4 h-4 text-[#141414]" />
                            <p className="text-[9px] font-bold text-[#141414] uppercase tracking-[0.2em]">Operational logs automatically synced with team Slack channels.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
