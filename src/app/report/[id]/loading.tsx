import LogoMark from '@/components/LogoMark';

export default function ReportLoading() {
    return (
        <div className="min-h-screen bg-[#FBFBF6] flex items-center justify-center">
            <div className="flex flex-col items-center gap-8">
                <div className="relative h-24 w-24 animate-pulse">
                    <LogoMark size={96} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D] animate-pulse">Decompiling Report...</p>
            </div>
        </div>
    );
}
