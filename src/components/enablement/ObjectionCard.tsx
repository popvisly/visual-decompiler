import type { EnablementObjection } from '@/lib/enablement-content';

export default function ObjectionCard({ objection }: { objection: EnablementObjection }) {
    return (
        <article
            id={objection.slug}
            className="scroll-mt-28 rounded-[1.75rem] border border-[#D8CCB5] bg-[#FCFAF5] px-6 py-6 md:px-7"
        >
            <div className="grid gap-6">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8E7450]">Objection</p>
                    <h3 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-[#141414] md:text-[30px]">
                        {objection.objection}
                    </h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <section className="rounded-[1.35rem] border border-[#E5DDCF] bg-[#FBFBF6] px-5 py-5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A7B64]">What they really mean</p>
                        <p className="mt-3 text-[15px] leading-7 text-[#4F4A43]">{objection.meaning}</p>
                    </section>

                    <section className="rounded-[1.35rem] border border-[#E5DDCF] bg-[#FBFBF6] px-5 py-5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A7B64]">20-sec response</p>
                        <p className="mt-3 text-[15px] leading-7 text-[#4F4A43]">{objection.shortResponse}</p>
                    </section>
                </div>

                <section className="rounded-[1.35rem] border border-[#D2C2A7] bg-[#F8F1E4] px-5 py-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7E6948]">60-sec response</p>
                    <p className="mt-3 text-[15px] leading-7 text-[#3F3A33]">{objection.longResponse}</p>
                </section>

                <section className="rounded-[1.35rem] border border-[#E5DDCF] bg-[#FBFBF6] px-5 py-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A7B64]">Proof points</p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                        {objection.proofPoints.map((point) => (
                            <span
                                key={point}
                                className="inline-flex rounded-full border border-[#D8CCB5] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5F574A]"
                            >
                                {point}
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </article>
    );
}
