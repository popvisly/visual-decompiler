import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';

export default function IntelligenceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#FBFBF6] text-[#141414] selection:bg-black/10 font-sans flex flex-col">
            <UnifiedSovereignHeader />

            <main className="flex-1 w-full relative z-10 pt-30 pb-32 lg:pt-36">
                {children}
            </main>
        </div>
    );
}
