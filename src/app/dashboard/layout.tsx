import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-canvas dot-grid">
            <Header />
            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
                <Sidebar searchParams={{}} />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
