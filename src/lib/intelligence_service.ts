import { supabaseClient } from './supabase-client';

export interface Asset {
    id: string;
    file_url: string;
    type: string;
    brand: { name: string };
    extractions?: {
        primary_mechanic: string;
    };
}

/**
 * Fetches all forensic assets for the Intelligence Pulse / Archive Drawer.
 * Synchronized with the Vault data (19+ extractions).
 */
export async function getAssets(): Promise<Asset[]> {
    const { data, error } = await supabaseClient
        .from('assets')
        .select(`
            id,
            file_url,
            type,
            brand:brands(name),
            extractions:extractions(primary_mechanic)
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[Intelligence Service] Failed to fetch forensic footprint:', error);
        return [];
    }

    // Flatten extractions and return formatted assets
    return (data || []).map((item: any) => ({
        ...item,
        brand: item.brand || { name: 'Unknown' },
        extractions: item.extractions?.[0] || item.extractions
    })) as Asset[];
}
