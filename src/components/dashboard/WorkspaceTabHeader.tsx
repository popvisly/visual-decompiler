import { Activity } from 'lucide-react';

type WorkspaceTabHeaderProps = {
    kicker: string;
    title: string;
    intro: string;
};

export default function WorkspaceTabHeader({
    kicker,
    title,
    intro,
}: WorkspaceTabHeaderProps) {
    return (
        <div className="relative mb-6 overflow-hidden rounded-[2.5rem] border border-black/5 bg-white px-8 py-10 shadow-sm md:mb-8 lg:px-12">
            {/* Clinical Grid Background */}
            <div 
                className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#1A1A1A_1px,transparent_1px),linear-gradient(90deg,#1A1A1A_1px,transparent_1px)] [background-size:32px_32px]" 
                aria-hidden="true"
            />
            
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B6A3D]">{kicker}</p>
                        <div className="h-px w-8 bg-black/10" />
                        <div className="flex items-center gap-1.5">
                            <Activity className="h-3 w-3 text-[#D4A574]" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/30">System Active</span>
                        </div>
                    </div>
                    <h2 className="text-[32px] font-black uppercase leading-[0.92] tracking-tight text-[#141414] md:text-[48px]">
                        {title}
                    </h2>
                </div>
                <div className="lg:text-right">
                    <p className="max-w-[48ch] text-[15px] font-medium leading-[1.65] text-[#515151]">
                        {intro}
                    </p>
                </div>
            </div>
        </div>
    );
}

