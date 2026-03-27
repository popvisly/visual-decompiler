"use client";

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus, Database, Activity, LayoutGrid, Settings, Users, LineChart } from 'lucide-react';
import SidebarFooter from './sidebar-footer';
import NotificationBell from '@/components/NotificationBell';
import { supabaseClient } from '@/lib/supabase-client';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [agency, setAgency] = useState<{ name: string; is_whitelabel_active: boolean } | null>(null);

    useEffect(() => {
        const fetchAgency = async () => {
            const { data } = await supabaseClient
                .from('agencies')
                .select('name, is_whitelabel_active')
                .limit(1)
                .single();
            if (data) setAgency(data);
        };
        fetchAgency();
    }, []);

    const navItems = [
        { name: 'Analyze Asset', href: '/ingest', icon: Plus },
        { name: 'Intelligence Vault', href: '/vault', icon: Database },
        { name: 'Intelligence Pulse', href: '/compare', icon: Activity },
        { name: 'Mechanic Intelligence', href: '/market-pulse', icon: LineChart },
        { name: 'Sovereign Boards', href: '/boards', icon: LayoutGrid },
        { name: 'Agency Settings', href: '/settings', icon: Settings },
        { name: 'Team & Seats', href: '/settings/team', icon: Users },
    ];

    const displayBrandName = agency?.is_whitelabel_active ? (agency.name || 'Decompiler') : 'Decompiler';

    return (
        <div className="flex min-h-screen bg-[#141414] text-[#FBFBF6]">
            {/* Global Sidebar - Minimalist, app interior aesthetic */}
            <aside className="sticky top-0 z-50 hidden h-screen w-64 flex-col justify-between border-r border-[rgba(212,165,116,0.18)] bg-[#171512] px-6 py-8 md:flex">

                <div className="relative z-10">
                    {/* Logo / Brand Mark */}
                    <div className="mb-12 flex items-start justify-between gap-3">
                        <Link href="/" className="group flex items-center gap-2 min-w-0">
                            <div className="h-4 w-4 flex-shrink-0 rounded-sm bg-[#D4A574] transition-colors group-hover:bg-[#D7B07A]" />
                            <span className="truncate font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-[#FBFBF6]/88 transition-opacity group-hover:opacity-100 group-hover:text-[#D4A574]">
                                {displayBrandName}
                            </span>
                        </Link>
                        <NotificationBell />
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-6">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`-ml-4 flex items-center gap-4 border-l pl-4 py-2 transition-all duration-300 group ${isActive ? 'select-none border-[#D4A574] bg-[#D4A574]/8 text-[#D4A574]' : 'border-transparent text-[#9A9A94] hover:border-[rgba(212,165,116,0.18)] hover:text-[#FBFBF6]'
                                        }`}
                                >
                                    <Icon className="w-4 h-4 stroke-[1px]" />
                                    <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase">
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Footer / User Session */}
                <SidebarFooter />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 relative">
                {/* Content Container */}
                <div className="relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
