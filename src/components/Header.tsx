import Link from 'next/link';
import IngestForm from './IngestForm';

export default function Header({ activeTab }: { activeTab?: 'dashboard' | 'analytics' }) {
    return (
        <header className="glass-dark sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-surface font-black text-sm group-hover:scale-110 transition-transform">
                            V
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-txt-on-dark tracking-tight">Visual Decompiler</h1>
                            <p className="spec-label-dark" style={{ fontSize: '8px' }}>Advertising Intelligence</p>
                        </div>
                    </Link>

                    <nav className="flex items-center gap-1">
                        <Link
                            href="/dashboard"
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${activeTab === 'dashboard'
                                    ? 'bg-accent text-surface'
                                    : 'text-txt-on-dark-muted hover:text-txt-on-dark hover:bg-white/5'
                                }`}
                        >
                            Library
                        </Link>
                        <Link
                            href="/dashboard/analytics"
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${activeTab === 'analytics'
                                    ? 'bg-accent text-surface'
                                    : 'text-txt-on-dark-muted hover:text-txt-on-dark hover:bg-white/5'
                                }`}
                        >
                            Analytics
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="/api/export"
                        className="text-[9px] font-bold text-txt-on-dark-muted uppercase tracking-[0.15em] hover:text-accent border border-white/10 hover:border-accent/30 rounded-lg px-3 py-2 transition-all"
                        download
                    >
                        Export CSV
                    </a>
                    <IngestForm />
                </div>
            </div>
        </header>
    );
}
