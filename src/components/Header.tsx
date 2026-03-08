import Link from 'next/link';
import IngestForm from './SovereignIngestFormV2';
import Logo from './Logo';

export default function Header({ activeTab }: { activeTab?: 'dashboard' | 'analytics' | 'boards' | 'pulse' }) {
    return (
        <header className="sticky top-8 z-50 w-full px-8 flex justify-center pointer-events-none">
            <div className="pointer-events-auto flex items-center justify-between px-8 py-4 rounded-full bg-white/90 backdrop-blur-xl border border-[#D4A574]/20 shadow-[0_12px_48px_rgba(212,165,116,0.12)] w-full max-w-7xl">
                <div className="flex items-center gap-8">
                    <Logo href="/" sublabel="Strategic Library" />

                    <nav className="flex items-center gap-2">
                        <Link
                            href="/vault"
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${activeTab === 'dashboard'
                                ? 'bg-[#FBF7EF] text-[#141414] shadow-sm border border-[#E7DED1]'
                                : 'text-[#6B6B6B] hover:text-[#141414] hover:bg-white/50'
                                }`}
                        >
                            Library
                        </Link>
                        <Link
                            href="/boards"
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${activeTab === 'boards'
                                ? 'bg-[#FBF7EF] text-[#141414] shadow-sm border border-[#E7DED1]'
                                : 'text-[#6B6B6B] hover:text-[#141414] hover:bg-white/50'
                                }`}
                        >
                            Boards
                        </Link>
                        <Link
                            href="/compare"
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${activeTab === 'analytics'
                                ? 'bg-[#FBF7EF] text-[#141414] shadow-sm border border-[#E7DED1]'
                                : 'text-[#6B6B6B] hover:text-[#141414] hover:bg-white/50'
                                }`}
                        >
                            Analytics
                        </Link>
                        <Link
                            href="/app"
                            className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B] hover:text-[#141414] hover:bg-white/50 transition-all"
                        >
                            Analyze
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <IngestForm />
                </div>
            </div>
        </header>
    );
}
