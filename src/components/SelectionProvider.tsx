'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AdDigest } from '@/types/digest';

export type AdSummary = {
    id: string;
    brand: string;
    mediaUrl: string;
    mediaKind: string;
    digest: AdDigest;
};

type SelectionContextType = {
    selectedIds: Set<string>;
    selectedAds: Map<string, AdSummary>;
    isSelecting: boolean;
    toggle: (id: string, ad: AdSummary) => void;
    clearAll: () => void;
    count: number;
};

const SelectionContext = createContext<SelectionContextType>({
    selectedIds: new Set(),
    selectedAds: new Map(),
    isSelecting: false,
    toggle: () => { },
    clearAll: () => { },
    count: 0,
});

export function useSelection() {
    return useContext(SelectionContext);
}

export default function SelectionProvider({ children }: { children: ReactNode }) {
    const [selectedAds, setSelectedAds] = useState<Map<string, AdSummary>>(new Map());

    const toggle = useCallback((id: string, ad: AdSummary) => {
        setSelectedAds(prev => {
            const next = new Map(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.set(id, ad);
            }
            return next;
        });
    }, []);

    const clearAll = useCallback(() => {
        setSelectedAds(new Map());
    }, []);

    const selectedIds = new Set(selectedAds.keys());
    const count = selectedAds.size;
    const isSelecting = count > 0;

    return (
        <SelectionContext.Provider value={{ selectedIds, selectedAds, isSelecting, toggle, clearAll, count }}>
            {children}
        </SelectionContext.Provider>
    );
}
