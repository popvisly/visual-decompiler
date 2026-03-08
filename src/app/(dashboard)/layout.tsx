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
        <div className="flex min-h-screen bg-[#FBFBF6] text-[#1A1A1A]">
            {/* Global Sidebar - Minimalist, 1px geometric borders */}
            <aside className="w-64 border-r border-[#E5E5E1] flex flex-col justify-between py-8 px-6 hidden md:flex bg-white/40 backdrop-blur-sm">

                <div>
                    {/* Logo / Brand Mark */}
                    <div className="mb-12">
                        <Link href="/" className="group flex items-center gap-2">
                            <div className="w-4 h-4 bg-[#8B4513] rounded-sm group-hover:bg-[#1A1A1A] transition-colors" />
                            <span className="font-sans text-[11px] font-bold tracking-[0.3em] uppercase opacity-90 group-hover:opacity-100 transition-opacity text-[#8B4513] group-hover:text-[#1A1A1A]">
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
                                    className={`flex items-center gap-4 pl-4 py-2 -ml-4 group transition-all duration-300 border-l ${isActive ? 'text-[#8B4513] border-[#8B4513] bg-[#8B4513]/5 select-none' : 'text-[#4A4A4A]/60 border-transparent hover:text-[#1A1A1A] hover:border-[#E5E5E1]'
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
            <main className="flex-1 relative overflow-y-auto">
                {/* Content Container */}
                <div className="relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
