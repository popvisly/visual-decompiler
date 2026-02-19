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
        <section id={id} className="relative bg-[#FBF7EF] text-[#141414] py-32 overflow-hidden border-t border-[#E7DED1]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="max-w-3xl mb-16">
                    <p className="text-[11px] font-semibold tracking-[0.18em] text-[#6B6B6B] uppercase mb-4">
                        {label}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-semibold leading-[1.1] tracking-[-0.02em] mb-6">
                        {title}
                    </h2>
                    <p className="text-lg text-[#141414]/75 leading-[1.6]">
                        {body}
                    </p>
                </div>

                {/* Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-16 lg:gap-24 items-start">

                    {/* Left: Ad Tile */}
                    <div className="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden border border-[#E7DED1] shadow-[0_20px_60px_rgba(20,20,20,0.08)] bg-white">
                        <img src={stageImage.src} alt={stageImage.alt} className="w-full h-full object-cover" />
                    </div>

                    {/* Right: Swiss Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cards.map((card, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-[#E7DED1] bg-[#F6F1E7]/50 p-6 flex flex-col"
                            >
                                <div className="text-[11px] font-semibold tracking-[0.18em] text-[#6B6B6B] uppercase mb-3">
                                    {card.title}
                                </div>
                                <div className="text-[14px] leading-[1.4] text-[#141414] font-medium mb-6">
                                    {card.micro}
                                </div>

                                {card.evidence && (
                                    <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-[#E7DED1]">
                                        {card.evidence.map((ev, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-1 rounded-lg bg-[#FBF7EF] text-[#6B6B6B] text-[10px] font-bold border border-[#E7DED1]"
                                            >
                                                {ev}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* CTA cell */}
                        <div className="md:col-span-2 pt-8 flex justify-end">
                            <a
                                href={cta.href}
                                className="
                                    inline-flex items-center justify-center
                                    rounded-full border border-[#E7DED1]
                                    bg-[#FBF7EF]
                                    px-6 py-2.5
                                    text-[13px] font-medium tracking-[-0.01em] text-[#141414]
                                    shadow-sm transition-all hover:-translate-y-[1px] hover:border-[#D8CCBC] hover:shadow-md
                                "
                            >
                                {cta.label} &rarr;
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
