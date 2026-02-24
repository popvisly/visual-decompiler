import Link from 'next/link';
import IngestForm from './IngestForm';
import Logo from './Logo';
import { UserButton } from '@clerk/nextjs';

export default function Header({ activeTab }: { activeTab?: 'dashboard' | 'analytics' | 'boards' | 'pulse' }) {
    return (
        <header className="sticky top-6 z-50 w-full px-6 flex justify-center pointer-events-none">
            <div className="pointer-events-auto flex items-center justify-between px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E7DED1] shadow-[0_8px_32px_rgba(20,20,20,0.06)] w-full max-w-7xl">
                <div className="flex items-center gap-8">
                    <Logo href="/" sublabel="Strategic Library" />

                    <nav className="flex items-center gap-2">
                        <Link
                            href="/dashboard"
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${activeTab === 'dashboard'
                                ? 'bg-[#FBF7EF] text-[#141414] shadow-sm border border-[#E7DED1]'
                                : 'text-[#6B6B6B] hover:text-[#141414] hover:bg-white/50'
                                }`}
                        >
                            Library
                        </Link>
                        <Link
                            href="/dashboard/boards"
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${activeTab === 'boards'
                                ? 'bg-[#FBF7EF] text-[#141414] shadow-sm border border-[#E7DED1]'
                                : 'text-[#6B6B6B] hover:text-[#141414] hover:bg-white/50'
                                }`}
                        >
                            Boards
                        </Link>
                        <Link
                            href="/dashboard/analytics"
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${activeTab === 'analytics'
                                ? 'bg-[#FBF7EF] text-[#141414] shadow-sm border border-[#E7DED1]'
                                : 'text-[#6B6B6B] hover:text-[#141414] hover:bg-white/50'
                                }`}
                        >
                            Analytics
                        </Link>
                        <Link
                            href="/dashboard/processing/new"
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${activeTab === undefined
                                ? 'text-[#6B6B6B] hover:text-[#141414] hover:bg-white/50'
                                : 'text-[#6B6B6B] hover:text-[#141414] hover:bg-white/50'
                                }`}
                        >
                            Analyze
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="/api/export"
                        className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.15em] hover:text-[#141414] border border-[#E7DED1] bg-[#FBF7EF]/50 hover:bg-[#FBF7EF] hover:border-[#D8CCBC] rounded-xl px-4 py-2 transition-all shadow-sm"
                        download
                    >
                        Export CSV
                    </a>
                    <IngestForm />
                    <div className="h-6 w-px bg-[#E7DED1]" />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </header>
    );
}
