export const SECTOR_TAXONOMY = [
    'Luxury Fashion',
    'Luxury Fragrance',
    'Prestige Cosmetics',
    'Luxury Automotive',
    'Premium Spirits',
    'Luxury Watches & Jewellery',
    'Premium Tech',
    'Luxury Travel & Hospitality',
    'Financial Services (Premium)',
    'Other',
] as const;

export type SectorTaxonomyValue = (typeof SECTOR_TAXONOMY)[number];

const sectorLookup = new Map(
    SECTOR_TAXONOMY.map((sector) => [sector.toLowerCase(), sector] as const)
);

export function normalizeSector(value?: string | null): SectorTaxonomyValue {
    const normalized = value?.trim().toLowerCase();
    if (!normalized) {
        return 'Other';
    }

    return sectorLookup.get(normalized) || 'Other';
}
