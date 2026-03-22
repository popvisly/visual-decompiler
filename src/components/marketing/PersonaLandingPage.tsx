import Link from 'next/link';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import type { PersonaPageData } from '@/lib/persona-pages';

export default function PersonaLandingPage({ page }: { page: PersonaPageData }) {
    return (
        <main className="min-h-screen bg-[#FBFBF6] text-[#141414]">
            <UnifiedSovereignHeader primaryCta={{ label: page.primaryCta.label, href: page.primaryCta.href }} />

            <section className="border-b border-[#E2D8C8] px-6 pb-14 pt-36 md:pb-20 md:pt-44">
                <div className="mx-auto max-w-7xl">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">{page.eyebrow}</p>
                    <div className="mt-6 grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-end">
                        <div>
                            <h1 className="text-[42px] font-semibold uppercase leading-[0.92] tracking-[-0.05em] text-[#141414] md:text-[72px]">
                                {page.headlineLines[0]}
                                <br />
                                {page.headlineLines[1]}
                                <br />
                                <span className="text-[#C1A67B]">{page.headlineLines[2]}</span>
                            </h1>
                            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#5E5A53] md:text-xl">
                                {page.subline}
                            </p>
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                                <Link
                                    href={page.primaryCta.href}
                                    className="inline-flex items-center justify-center rounded-full bg-[#141414] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FBF7EF] transition hover:bg-black"
                                >
                                    {page.primaryCta.label}
                                </Link>
                                <Link
                                    href={page.secondaryCta.href}
                                    className="inline-flex items-center justify-center rounded-full border border-[#D8CCB5] bg-[#FBFBF6] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6D655B] transition hover:border-[#C8B08D] hover:text-[#141414]"
                                >
                                    {page.secondaryCta.label}
                                </Link>
                            </div>
                            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8A7B64]">
                                {page.trustLine}
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-[#3C3428] bg-[#15130F] p-7 text-[#F4E9D9] shadow-[0_28px_90px_rgba(20,20,20,0.18)] md:p-8">
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D7B07A]">Proof Block</p>
                            <div className="mt-6 space-y-5">
                                {page.proofPoints.map((point, index) => (
                                    <div key={point} className="border-t border-[#342D24] pt-5 first:border-t-0 first:pt-0">
                                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#B89A70]">
                                            {String(index + 1).padStart(2, '0')}
                                        </p>
                                        <p className="text-base leading-relaxed text-[#E6D7BF]">{point}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-[#E2D8C8] bg-[#F8F3EA] px-6 py-14 md:py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">What It Enables</p>
                            <h2 className="mt-4 text-3xl font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-[#141414] md:text-5xl">
                                Four reasons this closes
                                <br />
                                <span className="text-[#C1A67B]">for creative teams.</span>
                            </h2>
                        </div>
                        <p className="max-w-xl text-base leading-relaxed text-[#5E5A53]">
                            Same engine. Different front door. This page stays focused on the moment an Art Director needs a read they can act on before the room decides the route.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {page.features.map((feature, index) => {
                            const dark = index === 1 || index === 3;
                            return (
                                <article
                                    key={feature.title}
                                    className={`rounded-[2rem] border p-7 md:p-8 ${
                                        dark
                                            ? 'border-[#3C3428] bg-[#15130F] text-[#F4E9D9]'
                                            : 'border-[#D8CCB5] bg-[#FBFBF6] text-[#141414]'
                                    }`}
                                >
                                    <p
                                        className={`text-[10px] font-bold uppercase tracking-[0.28em] ${
                                            dark ? 'text-[#D7B07A]' : 'text-[#8A7B64]'
                                        }`}
                                    >
                                        {feature.eyebrow}
                                    </p>
                                    <h3 className={`mt-4 text-2xl font-medium leading-tight ${dark ? 'text-[#F7EEDC]' : 'text-[#141414]'}`}>
                                        {feature.title}
                                    </h3>
                                    <p className={`mt-5 text-base leading-relaxed ${dark ? 'text-[#D4C4AB]' : 'text-[#5E5A53]'}`}>
                                        {feature.body}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="border-b border-[#E2D8C8] px-6 py-14 md:py-16">
                <div className="mx-auto max-w-7xl">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">Objections</p>
                    <h2 className="mt-4 text-3xl font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-[#141414] md:text-5xl">
                        Questions worth settling
                        <br />
                        <span className="text-[#C1A67B]">before the deadline hits.</span>
                    </h2>
                    <div className="mt-10 grid gap-5 lg:grid-cols-3">
                        {page.faqs.map((faq) => (
                            <article key={faq.question} className="rounded-[2rem] border border-[#D8CCB5] bg-[#FBFBF6] p-7">
                                <h3 className="text-xl font-medium leading-snug text-[#141414]">{faq.question}</h3>
                                <p className="mt-4 text-[15px] leading-7 text-[#5E5A53]">{faq.answer}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-[2.5rem] border border-[#D8CCB5] bg-[radial-gradient(circle_at_top,rgba(212,165,116,0.12),transparent_42%),#FBFBF6] px-8 py-12 md:px-14 md:py-16">
                        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-3xl">
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">{page.eyebrow}</p>
                                <h2 className="mt-4 text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.05em] text-[#141414] md:text-6xl">
                                    {page.finalCta.headline}
                                </h2>
                                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#5E5A53]">{page.finalCta.subline}</p>
                            </div>
                            <div className="w-full max-w-sm">
                                <Link
                                    href={page.finalCta.href}
                                    className="inline-flex w-full items-center justify-center rounded-full bg-[#141414] px-8 py-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FBF7EF] transition hover:bg-black"
                                >
                                    {page.finalCta.label}
                                </Link>
                                <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A7B64]">
                                    {page.finalCta.note}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-[#E2D8C8] px-4 py-6 md:flex-row">
                        <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#141414] text-sm font-bold text-[#FBF7EF]">V</div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold uppercase leading-none tracking-tight text-[#141414]">VisualDecompiler</span>
                                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8A7B64]">Advertising Intelligence</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#8A7B64]">
                            <Link href="/about" className="transition-colors hover:text-[#141414]">About</Link>
                            <Link href="/pricing" className="transition-colors hover:text-[#141414]">Pricing</Link>
                            <Link href="/vault" className="transition-colors hover:text-[#141414]">Vault</Link>
                            <Link href="/docs/user-guide" className="transition-colors hover:text-[#141414]">Help Center</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
