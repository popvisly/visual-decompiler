import SelectionProvider from '@/components/SelectionProvider';
import Sidebar from '@/components/Sidebar';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const params = await searchParams;

    return (
        <SelectionProvider>
            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10 w-full">
                <Sidebar searchParams={params} />
                <div className="flex-1 space-y-8">
                    <div>
                        <h2 className="text-7xl font-light text-[#141414] tracking-tightest uppercase leading-[0.85]">
                            Tactical<br />
                            <span className="text-[#6B6B6B]/30">Library</span>
                        </h2>
                        <p className="text-[12px] text-[#6B6B6B] mt-6 font-bold tracking-[0.3em] uppercase">
                            Private Archive / Competitive intelligence
                        </p>
                    </div>

                    <div className="bg-white p-12 rounded-3xl border border-[#E7DED1]">
                        <h3 className="text-2xl font-bold mb-4">Sidebar Fix Test ✅</h3>
                        <p className="text-[#6B6B6B]">
                            If you see this with the sidebar, the Sidebar fix worked!
                            The error must be in AdList or another component.
                        </p>
                    </div>
                </div>
            </div>
        </SelectionProvider>
    );
}
