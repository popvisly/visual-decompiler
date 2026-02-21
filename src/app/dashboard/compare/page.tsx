import { Suspense } from 'react';
import { getComparisonData } from '@/lib/analytics';
import { getAllBrands } from '@/lib/brands';
import { auth } from '@clerk/nextjs/server';
import CompareClient from '@/components/CompareClient';
import { BarChart3 } from 'lucide-react';

export default async function ComparePage({
    searchParams,
}: {
    searchParams: Promise<{ brandA?: string; brandB?: string }>;
}) {
    const { userId, orgId } = await auth();
    if (!userId) return null;

    const params = await searchParams;
    const allBrands = await getAllBrands(userId, orgId);

    let comparisonData = null;
    if (params.brandA && params.brandB) {
        comparisonData = await getComparisonData(params.brandA, params.brandB, userId, orgId);
    }

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-3xl font-light text-[#141414] tracking-tight uppercase">Strategic Comparison</h2>
                <p className="text-[10px] text-[#6B6B6B] mt-1 font-medium tracking-widest uppercase">Benchmarking competitive convergence</p>
            </div>

            <Suspense fallback={
                <div className="flex items-center justify-center py-20">
                    <BarChart3 className="w-8 h-8 text-[#141414] animate-pulse" />
                </div>
            }>
                <CompareClient data={comparisonData} allBrands={allBrands} />
            </Suspense>
        </div>
    );
}
