import { CaseCard, LinkCta, StageImage } from '@/types/homepage';

type Props = {
    id: string;
    label: string;
    title: string;
    body: string;
    stageImage: StageImage;
    cards: CaseCard[];
};

export default function CaseStudyFashion({ id, label, title, body, stageImage, cards }: Props) {
    return (
        <section id={id} className="relative bg-[#FBF7EF] text-[#141414] py-32 md:py-48 overflow-hidden border-t border-[#E7DED1]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="text-center w-full mx-auto mb-20 lg:mb-32 px-4 overflow-visible">
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#C1A67B]">
                            {label}
                        </span>
                        <h2 className="text-4xl md:text-7xl font-semibold text-[#141414] tracking-tightest uppercase leading-[0.9]">
                            {(() => {
                                // Split title into two lines based on the period
                                const parts = title.split(/\.\s+/);
                                if (parts.length >= 2) {
                                    const first = parts[0] + '.';
                                    const rest = parts.slice(1).join('. ');
                                    return (
                                        <>
                                            {first}<br />
                                            <span className="text-[#C1A67B]">{rest}</span>
                                        </>
                                    );
                                }
                                return title;
                            })()}
                        </h2>
                    </div>
                </div>

                {/* Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_380px] gap-16 lg:gap-20 xl:gap-24 items-center max-w-5xl mx-auto">

                    {/* Left: Swiss Cards (Aggressive Type) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
                        {cards.map((card, idx) => (
                            <div
                                key={idx}
                                className="group/card flex flex-col border-t border-[#141414]/10 pt-6"
                            >
                                <div className="text-[9px] font-bold tracking-[0.3em] text-[#C1A67B] uppercase mb-4 transition-colors">
                                    {card.title}
                                </div>
                                <div className="text-[20px] md:text-[24px] leading-[1.1] text-[#141414] font-semibold tracking-tight mb-8 uppercase pr-4">
                                    {card.micro}
                                </div>

                                {card.evidence && (
                                    <div className="flex flex-col gap-2.5 mt-auto">
                                        {card.evidence.map((ev, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 text-[10px] md:text-[11px] font-bold tracking-[0.1em] text-[#141414]/40 group-hover/card:text-[#141414]/80 transition-colors uppercase"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#C1A67B]/40 group-hover/card:bg-[#C1A67B] transition-colors" />
                                                {ev}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right: Massive Ad Feature */}
                    <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden border-[8px] md:border-[12px] border-white shadow-[0_40px_100px_rgba(20,20,20,0.12)] bg-white rotate-1 hover:rotate-0 transition-transform duration-700">
                        <img src={stageImage.src} alt={stageImage.alt} className="w-full h-full object-cover rounded-[12px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/5 to-transparent rounded-[12px]" />
                    </div>

                </div>

            </div>
        </section>
    );
}
