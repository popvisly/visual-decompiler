const DECISION_STAGES = [
    {
        stage: 'Arrival',
        audienceQuestion: 'Do brands like this belong to people like me?',
        whatToDesign: 'Signal fit, tone, and worldview before persuasion.',
        systemRead: 'Attention Path',
    },
    {
        stage: 'First Impression',
        audienceQuestion: 'Why should I stay?',
        whatToDesign: 'Lead with credibility cues and immediate clarity.',
        systemRead: 'Structural Signals',
    },
    {
        stage: 'Curiosity',
        audienceQuestion: 'Should I engage with this?',
        whatToDesign: 'Create momentum that rewards the next click, scroll, or look.',
        systemRead: 'Attention Path',
    },
    {
        stage: 'Commitment',
        audienceQuestion: 'Can I see this working for me?',
        whatToDesign: 'Help people visualize ownership before price pressure.',
        systemRead: 'Strategic Read',
    },
    {
        stage: 'Reality',
        audienceQuestion: 'Does this actually deliver?',
        whatToDesign: 'Match promise and execution to protect trust.',
        systemRead: 'Confidence Index',
    },
    {
        stage: 'Advocacy',
        audienceQuestion: 'Does sharing this make me look smart?',
        whatToDesign: 'Create outcomes people want to stand behind publicly.',
        systemRead: 'Primary Scores',
    },
];

interface DecisionReadinessFrameworkProps {
    tone?: 'dark' | 'light';
}

export default function DecisionReadinessFramework({ tone = 'dark' }: DecisionReadinessFrameworkProps) {
    const isDark = tone === 'dark';

    return (
        <section
            className={`relative overflow-hidden py-24 lg:py-32 ${isDark ? 'bg-[#0B0B0B] text-[#F6F1E7]' : 'bg-[#F6F2E8] text-[#171717]'}`}
            data-presence-tone={isDark ? 'dark' : 'light'}
        >
            <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12">
                <div className="max-w-[980px]">
                    <p className={`text-[10px] font-semibold uppercase tracking-[0.36em] ${isDark ? 'text-[#C1A674]' : 'text-[#B58C4B]'}`}>
                        Decision Readiness Framework
                    </p>
                    <h2
                        className={`mt-6 text-[11vw] font-semibold uppercase leading-[0.9] tracking-[-0.04em] sm:text-[7vw] lg:text-[66px] ${
                            isDark ? 'text-[#F6F1E7]' : 'text-[#171717]'
                        }`}
                    >
                        Design decisions, not just content.
                    </h2>
                    <p className={`mt-7 max-w-[820px] text-[18px] leading-[1.8] ${isDark ? 'text-[#F6F1E7]/72' : 'text-[#171717]/72'}`}>
                        Every ad is judged through moments of readiness. Visual Decompiler makes each moment readable so teams align faster,
                        defend decisions clearly, and get work approved with less back-and-forth.
                    </p>
                </div>

                <div className={`mt-12 rounded-[28px] border ${isDark ? 'border-white/12 bg-white/[0.02]' : 'border-[#D8CCB9] bg-[#FBF8F1]'} p-5 sm:p-7`}>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {DECISION_STAGES.map((item) => (
                            <article key={item.stage} className={`rounded-[20px] border p-5 ${isDark ? 'border-white/12 bg-[#121212]' : 'border-[#DED4C3] bg-[#F7F2E8]'}`}>
                                <p className={`text-[10px] font-semibold uppercase tracking-[0.26em] ${isDark ? 'text-[#C1A674]' : 'text-[#B58C4B]'}`}>{item.stage}</p>
                                <p className={`mt-4 text-[16px] font-medium leading-[1.55] ${isDark ? 'text-[#F6F1E7]/92' : 'text-[#181818]/92'}`}>
                                    {item.audienceQuestion}
                                </p>
                                <p className={`mt-4 text-[14px] leading-[1.65] ${isDark ? 'text-[#F6F1E7]/68' : 'text-[#1B1B1B]/68'}`}>{item.whatToDesign}</p>
                                <div className={`mt-5 rounded-xl border px-3 py-2 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-[#D8CCB9] bg-[#F3ECDF]'}`}>
                                    <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-[#C1A674]' : 'text-[#B58C4B]'}`}>System Read</p>
                                    <p className={`mt-1 text-[13px] font-medium ${isDark ? 'text-[#F6F1E7]/86' : 'text-[#171717]/86'}`}>{item.systemRead}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <p className={`mt-10 text-[13px] font-medium uppercase tracking-[0.2em] ${isDark ? 'text-[#C1A674]' : 'text-[#B58C4B]'}`}>
                    Less back-and-forth. Faster approvals. Stronger outcomes.
                </p>
            </div>
        </section>
    );
}
