import LogoMark from '@/components/LogoMark';

export default function IntelligenceLoading() {
    return (
        <div className="min-h-screen bg-[#FBFBF6] flex items-center justify-center">
            <div className="flex flex-col items-center gap-8">
                <div className="relative h-16 w-16 animate-pulse">
                    <LogoMark size={64} strokeWidth={5} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D] animate-pulse">Accessing Intelligence...</p>
            </div>
        </div>
    );
}
