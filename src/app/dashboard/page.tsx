export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const params = await searchParams;

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
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
                    <h3 className="text-2xl font-bold mb-4">Dashboard Loading...</h3>
                    <p className="text-[#6B6B6B]">
                        This is a simplified dashboard page for debugging.
                        If you see this, the basic dashboard route works!
                    </p>
                    <p className="mt-4 text-sm text-[#6B6B6B]">
                        Check params: {JSON.stringify(params)}
                    </p>
                </div>
            </div>
        </div>
    );
}
