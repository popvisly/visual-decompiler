import { CaseCard, LinkCta, StageImage } from '@/types/homepage';

type Props = {
    id: string;
    label: string;
    title: string;
    body: string;
    stageImage: StageImage;
    cards: CaseCard[];
    cta: LinkCta;
};

export default function CaseStudyFashion({ id, label, title, body, stageImage, cards, cta }: Props) {
    return (
        <section id={id} className="relative bg-[#FBF7EF] text-[#141414] py-32 md:py-48 overflow-hidden border-t border-[#E7DED1]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="max-w-5xl mb-24 md:mb-32">
                    <p className="text-luxury-label mb-8">
                        {label}
                    </p>
                    <h2 className="text-[10vw] md:text-[84px] lg:text-[110px] font-semibold leading-[0.95] tracking-[-0.03em] mb-10">
                        {(() => {
                            // Prefer a two-beat editorial break if the title contains two sentences.
                            const parts = title.split(/\.\s+/);
                            if (parts.length >= 2) {
                                const first = parts[0] + '.';
                                const rest = parts.slice(1).join('. ');
                                return (
                                    <>
                                        {first}<br />
                                        <span className="text-[#6B6B6B]/45">{rest}</span>
                                    </>
                                );
                            }
                            return title;
                        })()}
                    </h2>
                    <p className="text-[19px] md:text-[24px] text-[#141414]/70 leading-[1.3] max-w-3xl font-medium tracking-tight">
                        {body}
                    </p>
                </div>

                {/* Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_600px] gap-16 lg:gap-32 items-start">

                    {/* Left: Swiss Cards (Aggressive Type) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {cards.map((card, idx) => (
                            <div
                                key={idx}
                                className="group/card flex flex-col border-t border-[#141414]/5 pt-8"
                            >
                                <div className="text-[10px] font-bold tracking-[0.3em] text-[#6B6B6B]/60 uppercase mb-4 transition-colors group-hover/card:text-[#141414]">
                                    {card.title}
                                </div>
                                <div className="text-[22px] md:text-[28px] leading-[1.1] text-[#141414] font-semibold tracking-tight mb-8 uppercase">
                                    {card.micro}
                                </div>

                                {card.evidence && (
                                    <div className="flex flex-col gap-2">
                                        {card.evidence.map((ev, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 text-[11px] md:text-[12px] font-bold tracking-[0.05em] text-[#141414]/40 group-hover/card:text-[#141414] transition-colors uppercase"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#141414]/10 group-hover/card:bg-[#141414] transition-colors" />
                                                {ev}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* CTA link cell */}
                        <div className="md:col-span-2 pt-12">
                            <a
                                href={cta.href}
                                className="
                                    inline-flex items-center gap-4
                                    text-[14px] font-bold text-[#141414] transition-all
                                    uppercase tracking-[0.2em] group
                                "
                            >
                                {cta.label}
                                <span className="transition-transform group-hover:translate-x-2">&rarr;</span>
                            </a>
                        </div>
                    </div>

                    {/* Right: Massive Ad Feature */}
                    <div className="relative sticky top-32 w-full aspect-[4/5] rounded-[32px] overflow-hidden border border-[#E7DED1] shadow-[0_40px_120px_rgba(20,20,20,0.12)] bg-[#FBF7EF]">
                        <img src={stageImage.src} alt={stageImage.alt} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/10 to-transparent" />
                    </div>

                </div>

            </div>
        </section>
    );
}
