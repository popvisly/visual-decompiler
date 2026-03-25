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
        <div className="mb-10 md:mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B7B62]">{kicker}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#16120D] md:text-3xl">{title}</h2>
            <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-[#1A1A1A]/60 md:text-base">
                {intro}
            </p>
        </div>
    );
}
