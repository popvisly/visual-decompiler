import Link from 'next/link';
import IngestForm from './IngestForm';

export default function Header({ activeTab }: { activeTab?: 'dashboard' | 'analytics' }) {
    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div>
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-xl hover:scale-105 transition-transform">V</div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Visual Decompiler</h1>
                            <p className="text-xs text-slate-500 font-medium">Advertising Intelligence Dashboard</p>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center gap-6">
                    <nav className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className={`text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'dashboard' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Library
                        </Link>
                        <Link
                            href="/dashboard/analytics"
                            className={`text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'analytics' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Analytics
                        </Link>
                    </nav>
                    <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                        <a
                            href="/api/export"
                            className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 border border-slate-200 hover:border-slate-400 rounded-lg px-3 py-2 transition-all"
                            download
                        >
                            Export CSV
                        </a>
                        <IngestForm />
                    </div>
                </div>
            </div>
        </header>
    );
}
