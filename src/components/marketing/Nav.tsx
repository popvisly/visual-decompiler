import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Logo from '@/components/Logo';

export default function Nav() {
    return (
        <header className="fixed top-0 inset-x-0 z-50">
            <div className="mx-auto max-w-7xl px-4 md:px-12">
                <div
                    className="
                        mt-6
                        rounded-full
                        border border-[#141414]/5
                        bg-[#FBF7EF]/40
                        backdrop-blur-2xl
                        shadow-[0_4px_24px_rgba(20,20,20,0.02)]
                    "
                >
                    <div className="flex items-center justify-between px-6 py-3">
                        {/* Standardized Logo Nav */}
                        <Logo sublabel="Advertising Intelligence" />

                        {/* Links */}
                        <nav className="hidden md:flex items-center gap-10">
                            {["How it works", "Case study", "Pricing"].map((label) => (
                                <a
                                    key={label}
                                    href={label === "How it works" ? "/#how" : label === "Case study" ? "/#case-study" : "/pricing"}
                                    className="
                                            text-[11px] font-bold tracking-[0.1em] uppercase
                                            text-[#141414]/40
                                            hover:text-[#141414]
                                            transition-all
                                        "
                                >
                                    {label}
                                </a>
                            ))}
                        </nav>

                        {/* CTA cluster */}
                        <div className="flex items-center gap-6">
                            <SignedOut>
                                <SignInButton forceRedirectUrl="/app" signUpForceRedirectUrl="/app">
                                    <button
                                        className="
                                            hidden sm:inline-flex items-center justify-center
                                            text-[11px] font-bold uppercase tracking-[0.1em] text-[#141414]/40
                                            hover:text-[#141414]
                                            transition
                                        "
                                    >
                                        Inbound
                                    </button>
                                </SignInButton>
                                <a
                                    href="/app"
                                    className="
                                        inline-flex items-center justify-center
                                        rounded-full
                                        bg-[#141414] text-[#FBF7EF]
                                        px-6 py-2.5
                                        text-[12px] font-bold tracking-[0.05em] uppercase
                                        shadow-[0_20px_40px_rgba(20,20,20,0.12)]
                                        transition-all
                                        hover:-translate-y-[1px]
                                        hover:shadow-[0_24px_48px_rgba(20,20,20,0.18)]
                                        active:scale-95
                                    "
                                >
                                    Access
                                </a>
                            </SignedOut>

                            <SignedIn>
                                <a
                                    href="/app"
                                    className="
                                        inline-flex items-center justify-center
                                        rounded-full
                                        bg-[#141414] text-[#FBF7EF]
                                        px-6 py-2.5
                                        text-[12px] font-bold tracking-[0.05em] uppercase
                                        shadow-[0_20px_40px_rgba(20,20,20,0.12)]
                                        transition-all
                                        hover:-translate-y-[1px]
                                        hover:shadow-[0_24px_48px_rgba(20,20,20,0.18)]
                                    "
                                >
                                    Dashboard
                                </a>
                                <div className="ml-2 flex items-center justify-center transition-transform hover:scale-105">
                                    <UserButton />
                                </div>
                            </SignedIn>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
