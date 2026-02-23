import Header from '@/components/Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#F6F1E7] text-[#141414] font-sans relative">
            {/* Bone Grid Background */}
            <div className="pointer-events-none fixed inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(20,20,20,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.028)_1px,transparent_1px)] [background-size:48px_48px] z-0" />
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_60%)] z-0" />

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 w-full relative z-20">
                    {children}
                </main>
            </div>
        </div>
    );
}
