import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import NewsAggregatorFooter from '@/components/blog/NewsAggregatorFooter';

export default function IntelligenceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#101010] text-[#FBF7EF] selection:bg-accent/30 font-sans flex flex-col">
            <UnifiedSovereignHeader forceDark={true} />

            <main className="flex-1 w-full relative z-10 pt-24 pb-32">
                {children}
            </main>

            <NewsAggregatorFooter />
        </div>
    );
}
