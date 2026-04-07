     1|'use client';
     2|
     3|import { useState, useEffect } from 'react';
     4|import Link from 'next/link';
     5|import { usePathname } from 'next/navigation';
     6|import { Menu, X } from 'lucide-react';
     7|import Logo from '@/components/Logo';
     8|import { supabaseClient } from '@/lib/supabase-client';
     9|
    10|type HeaderCta = {
    11|    href: string;
    12|    label: string;
    13|};
    14|
    15|export default function UnifiedSovereignHeader({
    16|    forceDark = false,
    17|    primaryCta,
    18|}: {
    19|    forceDark?: boolean;
    20|    primaryCta?: HeaderCta;
    21|} = {}) {
    22|    const pathname = usePathname();
    23|    const [mobileOpen, setMobileOpen] = useState(false);
    24|    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    25|    const [isScrolled, setIsScrolled] = useState(false);
    26|
    27|    useEffect(() => {
    28|        const checkSession = async () => {
    29|            try {
    30|                const { data } = await supabaseClient.auth.getSession();
    31|                setIsAuthenticated(!!data.session);
    32|            } catch {
    33|                setIsAuthenticated(false);
    34|            }
    35|        };
    36|        checkSession();
    37|
    38|        const { data: authListener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
    39|            setIsAuthenticated(!!session);
    40|        });
    41|
    42|        return () => {
    43|            authListener.subscription.unsubscribe();
    44|        };
    45|    }, []);
    46|
    47|    useEffect(() => {
    48|        const syncScroll = () => {
    49|            setIsScrolled(window.scrollY > 40);
    50|        };
    51|
    52|        syncScroll();
    53|        window.addEventListener('scroll', syncScroll, { passive: true });
    54|
    55|        return () => {
    56|            window.removeEventListener('scroll', syncScroll);
    57|        };
    58|    }, []);
    59|
    60|    const navItems = isAuthenticated
    61|        ? [
    62|            { key: 'product', label: 'Product', href: '/product' },
    63|            { key: 'pricing', label: 'Pricing', href: '/pricing' },
    64|            { key: 'vault', label: 'Vault', href: '/vault' },
    65|            { key: 'about', label: 'About', href: '/about' },
    66|            { key: 'help', label: 'Help Center', href: '/docs/user-guide' },
    67|        ]
    68|        : [
    69|            { key: 'product', label: 'Product', href: '/product' },
    70|            { key: 'pricing', label: 'Pricing', href: '/pricing' },
    71|            { key: 'method', label: 'Method', href: '/trust-method' },
    72|            { key: 'reading', label: 'Sample Read', href: '/share/sample-dossier' },
    73|            { key: 'about', label: 'About', href: '/about' },
    74|            { key: 'help', label: 'Help Center', href: '/docs/user-guide' },
    75|        ];
    76|
    77|    return (
    78|        <header className={`fixed inset-x-0 z-50 pointer-events-none transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'top-0' : 'top-6'}`}>
    79|            <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
    80|                <div
    81|                    className={`
    82|                        pointer-events-auto
    83|                        flex items-center justify-between
    84|                        transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]
    85|                        ${isScrolled
    86|                            ? forceDark
    87|                                ? 'py-2.5 lg:py-3 px-5 lg:px-8 bg-[#050505]/60 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
    88|                                : 'py-2.5 lg:py-3 px-5 lg:px-8 bg-white/60 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
    89|                            : forceDark
    90|                                ? 'py-2.5 lg:py-3 px-5 backdrop-blur-xl rounded-full border border-white/10 bg-[#050505]/30'
    91|                                : 'py-2.5 lg:py-3 px-5 backdrop-blur-xl rounded-full border border-white/10 bg-white/30'
    92|                        }
    93|                    `}
    94|                >
    95|
    96|                    {/* ── Left: Logo ── */}
    97|                    <div className="flex flex-1 items-center py-1">
    98|                        <Logo href="/" sublabel="BUILT FOR CREATIVES" forceDark={forceDark} className="origin-left scale-90 lg:scale-100 transition-transform" />
    99|                    </div>
   100|
   101|                    {/* ── Center: Desktop Pillars ── */}
   102|                    <nav className="hidden lg:flex flex-[2] justify-center items-center gap-10">
   103|                        {isAuthenticated === null ? (
   104|                            <div className="flex items-center gap-10 opacity-30" aria-hidden="true">
   105|                                {[0, 1, 2].map((i) => <div key={i} className={`h-1 w-8 ${forceDark ? 'bg-white/20' : 'bg-black/20'}`} />)}
   106|                            </div>
   107|                        ) : (
   108|                            <>
   109|                                {navItems.map((p) => {
   110|                                    const active = p.href === '/' ? pathname === '/' : pathname.startsWith(p.href);
   111|                                    return (
   112|                                        <Link
   113|                                            key={p.key}
   114|                                            href={p.href}
   115|                                            className={`
   116|                                                relative px-2 py-2 text-[10px] font-black uppercase tracking-[0.25em]
   117|                                                transition-colors duration-500
   118|                                                ${active
   119|                                                    ? forceDark ? 'text-white' : 'text-[#F6F1E7]'
   120|                                                    : forceDark ? 'text-white/40 hover:text-black' : 'text-[#9a9a94] hover:text-[#F6F1E7]'
   121|                                                }
   122|                                            `}
   123|                                        >
   124|                                            {p.label}
   125|                                            {active && (
   126|                                                <span className={`absolute -bottom-1 left-1/2 h-px w-4 -translate-x-1/2 ${forceDark ? 'bg-white' : 'bg-[#141414]'}`} />
   127|                                            )}
   128|                                        </Link>
   129|                                    );
   130|                                })}
   131|                            </>
   132|                        )}
   133|                    </nav>
   134|
   135|                    {/* ── Right: Utility Bar ── */}
   136|                    <div className="flex flex-1 items-center justify-end gap-4">
   137|                        <div className="hidden lg:flex items-center">
   138|                            {primaryCta ? (
   139|                                <Link
   140|                                    href={primaryCta.href}
   141|                                    className={`group relative overflow-hidden px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.28em] transition-colors duration-500 ${
   142|                                        forceDark 
   143|                                        ? 'bg-white/5 text-white hover:bg-white hover:text-black border border-white/10' 
   144|                                        : 'bg-black/5 text-black hover:bg-white hover:text-black border border-white/10'
   145|                                    }`}
   146|                                >
   147|                                    {primaryCta.label}
   148|                                </Link>
   149|                            ) : isAuthenticated === null ? (
   150|                                <div className={`h-[40px] w-[140px] border ${forceDark ? 'border-white/10' : 'border-white/10'}`} />
   151|                            ) : isAuthenticated ? (
   152|                                <Link
   153|                                    href="/ingest"
   154|                                    className={`group relative overflow-hidden px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.28em] transition-colors duration-500 ${
   155|                                        forceDark 
   156|                                        ? 'bg-white/5 text-white hover:bg-[#00E5FF] hover:text-black hover:border-transparent border border-white/10' 
   157|                                        : 'bg-black/5 text-black hover:bg-white hover:text-black border border-white/10'
   158|                                    }`}
   159|                                >
   160|                                    Bring In The Work
   161|                                </Link>
   162|                            ) : (
   163|                                <Link
   164|                                    href="/login"
   165|                                    className={`px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
   166|                                        forceDark ? 'text-white/60 hover:text-black' : 'text-black/60 hover:text-black'
   167|                                    }`}
   168|                                >
   169|                                    Login
   170|                                </Link>
   171|                            )}
   172|                        </div>
   173|
   174|                        {/* Mobile hamburger */}
   175|                        <button
   176|                            onClick={() => setMobileOpen(!mobileOpen)}
   177|                            className={`lg:hidden p-2 transition-colors ${forceDark ? 'text-white' : 'text-black'}`}
   178|                            aria-label="Toggle menu"
   179|                        >
   180|                            {mobileOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
   181|                        </button>
   182|                    </div>
   183|                </div>
   184|
   185|                {/* ── Mobile Menu ── */}
   186|                {mobileOpen && (
   187|                    <div className={`pointer-events-auto lg:hidden fixed inset-0 z-40 flex flex-col justify-center px-8 ${forceDark ? 'bg-[#050505] text-white' : 'bg-[#0B0B0B] text-[#F6F1E7]'} animate-in fade-in zoom-in-95 duration-500`}>
   188|                        <button onClick={() => setMobileOpen(false)} className="absolute top-8 right-8 p-4">
   189|                            <X size={32} strokeWidth={1} />
   190|                        </button>
   191|                        
   192|                        <div className="flex flex-col gap-8 text-center">
   193|                            {navItems.map((p) => (
   194|                                <Link
   195|                                    key={p.key}
   196|                                    href={p.href}
   197|                                    onClick={() => setMobileOpen(false)}
   198|                                    className={`text-[20px] font-black uppercase tracking-[0.2em] transition-colors ${
   199|                                        forceDark ? 'hover:text-[#00E5FF]' : 'hover:text-[#00E5FF]'
   200|                                    }`}
   201|                                >
   202|                                    {p.label}
   203|                                </Link>
   204|                            ))}
   205|
   206|                            <div className="mt-12 flex flex-col items-center gap-6">
   207|                                {primaryCta ? (
   208|                                    <Link
   209|                                        href={primaryCta.href}
   210|                                        onClick={() => setMobileOpen(false)}
   211|                                        className={`px-10 py-5 text-[12px] font-black uppercase tracking-[0.2em] ${
   212|                                            forceDark ? 'bg-white text-black' : 'bg-black text-white'
   213|                                        }`}
   214|                                    >
   215|                                        {primaryCta.label}
   216|                                    </Link>
   217|                                ) : isAuthenticated ? (
   218|                                    <Link
   219|                                        href="/ingest"
   220|                                        onClick={() => setMobileOpen(false)}
   221|                                        className={`px-10 py-5 text-[12px] font-black uppercase tracking-[0.2em] ${
   222|                                            forceDark ? 'bg-[#00E5FF] text-black' : 'bg-black text-white'
   223|                                        }`}
   224|                                    >
   225|                                        Bring In The Work
   226|                                    </Link>
   227|                                ) : (
   228|                                    <Link
   229|                                        href="/login"
   230|                                        onClick={() => setMobileOpen(false)}
   231|                                        className="text-[12px] font-black uppercase tracking-[0.2em] underline underline-offset-8"
   232|                                    >
   233|                                        Login
   234|                                    </Link>
   235|                                )}
   236|                            </div>
   237|                        </div>
   238|                    </div>
   239|                )}
   240|            </div>
   241|            
   242|            {/* Extremely subtle hairline bottom border when scrolled */}
   243|            <div className={`absolute bottom-0 inset-x-0 h-px transition-opacity duration-[1s] ${isScrolled ? 'opacity-100' : 'opacity-0'} ${forceDark ? 'bg-white/[0.04]' : 'bg-black/[0.04]'}`} />
   244|        </header>
   245|    );
   246|}
   247|