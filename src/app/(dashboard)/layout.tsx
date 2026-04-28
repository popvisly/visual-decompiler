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
            const {
                data: { user },
            } = await supabaseClient.auth.getUser();

            if (!user) {
                setAgency(null);
                return;
            }

            const { data: membershipByUser } = await supabaseClient
                .from('agency_members')
                .select('agency_id')
                .eq('user_id', user.id)
                .eq('status', 'active')
                .order('created_at', { ascending: true })
                .limit(1)
                .maybeSingle();

            const membership = membershipByUser
                ? membershipByUser
                : user.email
                  ? await (async () => {
                        const { data: membershipByEmail } = await supabaseClient
                            .from('agency_members')
                            .select('agency_id')
                            .ilike('email', user.email!.toLowerCase())
                            .eq('status', 'active')
                            .order('created_at', { ascending: true })
                            .limit(1)
                            .maybeSingle();
                        return membershipByEmail;
                    })()
                  : null;

            if (!membership?.agency_id) {
                setAgency(null);
                return;
            }

            const { data } = await supabaseClient
                .from('agencies')
                .select('name, is_whitelabel_active')
                .eq('id', membership.agency_id)
                .maybeSingle();

            setAgency(data || null);
        };
        fetchAgency();
    }, []);

    const navItems = [
        { name: 'Analyze Asset', href: '/ingest', icon: Plus, group: 'Core' as const },
        { name: 'Intelligence Vault', href: '/vault', icon: Database, group: 'Intelligence' as const },
        { name: 'Intelligence Pulse', href: '/compare', icon: Activity, group: 'Intelligence' as const },
        { name: 'Mechanic Intelligence', href: '/market-pulse', icon: LineChart, group: 'Intelligence' as const },
        { name: 'Sovereign Boards', href: '/boards', icon: LayoutGrid, group: 'Intelligence' as const },
        { name: 'Agency Settings', href: '/settings', icon: Settings, group: 'Settings' as const },
        { name: 'Team & Seats', href: '/settings/team', icon: Users, group: 'Settings' as const },
    ];

    const displayBrandName = agency?.is_whitelabel_active ? (agency.name || 'Decompiler') : 'Decompiler';
    const groups = ['Core', 'Intelligence', 'Settings'] as const;

    return (
        <div className="flex min-h-screen bg-[#FBFBF6] text-[#1a1a1a]">
            <aside className="sticky top-0 z-50 hidden h-screen w-72 flex-col justify-between border-r border-black/5 bg-white px-6 py-8 md:flex">

                <div className="relative z-10">
                    {/* Logo / Brand Mark */}
                    <div className="mb-12 flex items-start justify-between gap-3">
                        <Link href="/" className="group flex items-center gap-2 min-w-0">
                            <div className="h-4 w-4 flex-shrink-0 rounded-sm bg-[#141414] transition-colors group-hover:bg-black" />
                            <span className="truncate font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-[#1a1a1a]/85 transition-opacity group-hover:opacity-100 group-hover:text-[#8B6A3D]">
                                {displayBrandName}
                            </span>
                        </Link>
                        <NotificationBell />
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-8">
                        {groups.map((group) => (
                            <div key={group} className="space-y-2">
                                <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#999]">
                                    {group}
                                </p>
                                <div className="space-y-1">
                                    {navItems
                                        .filter((item) => item.group === group)
                                        .map((item) => {
                                            const Icon = item.icon;
                                            const isActive =
                                                pathname === item.href ||
                                                (item.href !== '/' && pathname?.startsWith(item.href));

                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[10px] font-bold uppercase tracking-[0.26em] transition-all ${
                                                        isActive
                                                            ? 'bg-[#141414] text-[#FBF7EF] shadow-sm'
                                                            : 'text-[#6B6B6B] hover:bg-[#FBFBF6] hover:text-[#1a1a1a]'
                                                    }`}
                                                >
                                                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4A574]' : 'text-[#8B6A3D]/60'}`} />
                                                    <span className="min-w-0 truncate">{item.name}</span>
                                                </Link>
                                            );
                                        })}
                                </div>
                            </div>
                        ))}
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
