import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Nav() {
    return (
        <header className="fixed top-0 inset-x-0 z-50">
            <div className="mx-auto max-w-6xl px-6">
                <div
                    className="
                        mt-4
                        rounded-full
                        border border-[#E7DED1]
                        bg-[#FBF7EF]/80
                        backdrop-blur-xl
                        shadow-[0_10px_30px_rgba(20,20,20,0.06)]
                    "
                >
                    <div className="flex items-center justify-between px-4 py-2.5 md:px-6">
                        {/* Brand block */}
                        <a href="/" className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full border border-[#E7DED1] bg-[#F2EBDD]" />
                            <div className="leading-none">
                                <div className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#141414]">
                                    Decompiler
                                </div>
                                <div className="mt-0.5 text-[11px] tracking-[0.18em] uppercase text-[#6B6B6B]">
                                    Advertising Intelligence
                                </div>
                            </div>
                        </a>

                        {/* Links */}
                        <nav className="hidden md:flex items-center gap-6">
                            {["How it works", "Case study", "Pricing"].map((label) => (
                                <a
                                    key={label}
                                    href={label === "How it works" ? "#how" : label === "Case study" ? "#case-study" : "/pricing"}
                                    className="
                                        text-[13px] font-medium tracking-[-0.01em]
                                        text-[#141414]/70
                                        hover:text-[#141414]
                                        transition
                                    "
                                >
                                    {label}
                                </a>
                            ))}
                        </nav>

                        {/* CTA cluster */}
                        <div className="flex items-center gap-2">
                            <SignedOut>
                                <SignInButton forceRedirectUrl="/app" signUpForceRedirectUrl="/app">
                                    <button
                                        className="
                                            hidden sm:inline-flex items-center justify-center
                                            rounded-full px-4 py-2
                                            text-[13px] font-medium text-[#141414]/70
                                            hover:text-[#141414]
                                            transition
                                        "
                                    >
                                        Sign in
                                    </button>
                                </SignInButton>
                                <a
                                    href="/app"
                                    className="
                                        inline-flex items-center justify-center
                                        rounded-full
                                        bg-[#141414] text-[#FBF7EF]
                                        px-5 py-2.5
                                        text-[13px] font-medium tracking-[-0.01em]
                                        shadow-[0_14px_34px_rgba(20,20,20,0.18)]
                                        transition
                                        hover:-translate-y-[1px]
                                        hover:shadow-[0_18px_44px_rgba(20,20,20,0.22)]
                                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]/25
                                    "
                                >
                                    Start now
                                </a>
                            </SignedOut>

                            <SignedIn>
                                <a
                                    href="/app"
                                    className="
                                        inline-flex items-center justify-center
                                        rounded-full
                                        bg-[#141414] text-[#FBF7EF]
                                        px-5 py-2.5
                                        text-[13px] font-medium tracking-[-0.01em]
                                        shadow-[0_14px_34px_rgba(20,20,20,0.18)]
                                        transition
                                        hover:-translate-y-[1px]
                                        hover:shadow-[0_18px_44px_rgba(20,20,20,0.22)]
                                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]/25
                                    "
                                >
                                    Dashboard
                                </a>
                                <div className="ml-2 flex items-center justify-center">
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
