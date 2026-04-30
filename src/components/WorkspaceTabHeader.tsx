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
        <div className="mb-8 rounded-2xl border border-black/5 bg-white/72 px-6 py-6 shadow-sm backdrop-blur md:mb-10 md:px-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#8B6A3D]/80">{kicker}</p>
                    <h2 className="mt-3 max-w-[18ch] text-[34px] font-semibold uppercase leading-[0.92] tracking-[-0.03em] text-[#141414] md:text-[44px]">
                        {title}
                    </h2>
                </div>
                <p className="max-w-[58ch] text-[14px] font-medium leading-relaxed text-[#1A1A1A]/60 md:text-[15px] lg:text-right">
                    {intro}
                </p>
            </div>
        </div>
    );
}
