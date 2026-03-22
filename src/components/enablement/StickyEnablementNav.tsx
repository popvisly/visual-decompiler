type EnablementNavItem = {
    id: string;
    label: string;
};

export default function StickyEnablementNav({ items }: { items: readonly EnablementNavItem[] }) {
    return (
        <>
            <div className="md:hidden">
                <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                    {items.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="whitespace-nowrap rounded-full border border-[#D8CCB5] bg-[#FBFBF6] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7E6948] transition hover:border-[#B89462] hover:text-[#5F4724]"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>

            <aside className="hidden md:block">
                <div className="sticky top-28 rounded-[1.6rem] border border-[#D8CCB5] bg-[#FCFAF5] px-4 py-4">
                    <p className="px-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8E7450]">Enablement</p>
                    <nav className="mt-4 space-y-1.5">
                        {items.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className="block rounded-[1rem] border border-transparent px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6C6459] transition hover:border-[#D8CCB5] hover:bg-[#FBFBF6] hover:text-[#141414]"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
}
