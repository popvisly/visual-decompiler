"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus, Database, Activity, Settings } from 'lucide-react';
import SidebarFooter from './sidebar-footer';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { name: 'New Ingestion', href: '/ingest', icon: Plus },
        { name: 'The Intelligence Vault', href: '/vault', icon: Database },
        { name: 'Differential Diagnostics', href: '/compare', icon: Activity },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-black text-white">
            {/* Global Sidebar - Minimalist, 1px geometric borders */}
            <aside className="w-64 border-r border-neutral-800 flex flex-col justify-between py-8 px-6 hidden md:flex">

                <div>
                    {/* Logo / Brand Mark */}
                    <div className="mb-12">
                        <Link href="/" className="group flex items-center gap-2">
                            <div className="w-4 h-4 bg-white rounded-sm group-hover:bg-neutral-300 transition-colors" />
                            <span className="font-sans text-[11px] font-bold tracking-[0.3em] uppercase opacity-90 group-hover:opacity-100 transition-opacity">
                                Decompiler
                            </span>
                        </Link>
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
                                    className={`flex items-center gap-4 pl-4 py-2 -ml-4 group transition-all duration-300 border-l ${isActive ? 'text-white border-white bg-white/5 shadow-[inset_1px_0_10px_rgba(255,255,255,0.05)] select-none' : 'text-neutral-500 border-transparent hover:text-white hover:border-neutral-800'
                                        }`}
                                >
                                    <Icon className="w-4 h-4 stroke-[1.5px]" />
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
            <main className="flex-1 h-screen overflow-y-auto bg-black">
                {children}
            </main>
        </div>
    );
}
