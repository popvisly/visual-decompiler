type SoftwareApplicationJsonLdProps = {
    pageUrl: string;
    pageName: string;
    pageDescription: string;
    pageKeywords?: string[];
};

export default function SoftwareApplicationJsonLd({
    pageUrl,
    pageName,
    pageDescription,
    pageKeywords = [],
}: SoftwareApplicationJsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': ['SoftwareApplication', 'WebApplication'],
        name: 'Visual Decompiler',
        alternateName: pageName,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: pageUrl,
        description: pageDescription,
        image: 'https://www.visualdecompiler.com/analytics.png',
        offers: {
            '@type': 'Offer',
            price: 0,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: 'https://www.visualdecompiler.com/pricing',
        },
        creator: {
            '@type': 'Organization',
            name: 'Visual Decompiler',
            url: 'https://www.visualdecompiler.com',
        },
        provider: {
            '@type': 'Organization',
            name: 'Visual Decompiler',
            url: 'https://www.visualdecompiler.com',
        },
        featureList: [
            'Ad creative analysis',
            'Competitor ad analysis',
            'Creative intelligence workflows',
            'Client-ready dossier export',
            'Creative decision support',
        ],
        keywords: pageKeywords.join(', '),
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
