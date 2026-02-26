'use client';

import { useSelection, AdSummary } from './SelectionProvider';
import { Check } from 'lucide-react';

type Props = {
    ad: AdSummary;
    children: React.ReactNode;
};

export default function AdCardSelectable({ ad, children }: Props) {
    const { selectedIds, isSelecting, toggle } = useSelection();
    const isSelected = selectedIds.has(ad.id);

    const handleSelect = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(ad.id, ad);
    };

    return (
        <div className="relative group/select">
            {/* Checkbox overlay */}
            <button
                onClick={handleSelect}
                className={`
                    absolute top-3 right-3 z-30
                    w-6 h-6 rounded-lg border-2
                    flex items-center justify-center
                    transition-all duration-200
                    ${isSelected
                        ? 'bg-accent border-accent text-[#141414] scale-100 opacity-100'
                        : isSelecting
                            ? 'bg-white/80 backdrop-blur-sm border-[#E7DED1] text-transparent opacity-100 hover:border-accent/50'
                            : 'bg-white/80 backdrop-blur-sm border-[#E7DED1] text-transparent opacity-0 group-hover/select:opacity-100'
                    }
                    shadow-sm cursor-pointer
                `}
                aria-label={isSelected ? 'Deselect' : 'Select'}
            >
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
            </button>

            {/* Selected glow ring */}
            <div className={`
                absolute inset-0 rounded-xl pointer-events-none z-20
                transition-all duration-300
                ${isSelected
                    ? 'ring-2 ring-accent ring-offset-2 ring-offset-[#F6F1E7]'
                    : ''
                }
            `} />

            {children}
        </div>
    );
}
