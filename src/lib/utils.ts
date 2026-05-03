export const firstSentence = (value: string | undefined | null) => {
    if (!value) return '';
    const trimmed = value.trim();
    const match = trimmed.match(/^.*?[.!?](?:\s|$)/);
    return (match?.[0] || trimmed).trim();
};

export const normalizeProseText = (value: string | undefined | null) => {
    if (!value) return '';
    const cleaned = value.replace(/\s+/g, ' ').trim();
    if (!cleaned) return '';

    const alpha = cleaned.replace(/[^A-Za-z]/g, '');
    if (alpha.length < 24) return cleaned;

    const upperRatio = alpha.length === 0
      ? 0
      : (alpha.match(/[A-Z]/g)?.length || 0) / alpha.length;

    if (upperRatio < 0.72) return cleaned;

    const lowered = cleaned.toLowerCase();
    return lowered
      .replace(/(^|[.!?]\s+)([a-z])/g, (_m, start, ch) => `${start}${ch.toUpperCase()}`)
      .replace(/\b(chanel|vb|ad|cta|dna|hud)\b/gi, (m) => m.toUpperCase());
};

export const proseParagraphs = (value: string | undefined | null, sentenceChunkSize = 2): string[] => {
    const normalized = normalizeProseText(value);
    if (!normalized) return [];

    const manual = String(value)
        .split(/\n+/)
        .map((p) => normalizeProseText(p))
        .filter(Boolean);

    if (manual.length > 1) return manual;

    const sentences = normalized.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (sentences.length <= sentenceChunkSize) return [normalized];

    const chunks: string[] = [];
    for (let i = 0; i < sentences.length; i += sentenceChunkSize) {
        chunks.push(sentences.slice(i, i + sentenceChunkSize).join(' ').trim());
    }
    return chunks;
};

export const normalizeConfidenceScore = (value?: number | null) => {
    if (value == null) return null;
    return value <= 1 ? Math.round(value * 100) : Math.round(value);
};

export const parseDossierSections = (content: string | undefined, type: 'ACT' | 'CHANNEL') => {
    if (!content) {
        return {
            intro: '',
            sections: [] as { label: string; title: string; text: string }[],
        };
    }

    const regex = type === 'ACT' ? /\bACT\s+[IVX]+:/gi : /\bCHANNEL\s+\d+:/gi;
    const parts = content.split(regex);
    const matches = content.match(regex) || [];

    return {
        intro: parts[0]?.trim() || '',
        sections: parts.slice(1).map((text, index) => {
            const trimmed = text.trim();
            const [title, ...rest] = trimmed.split(' — ');
            return {
                label: matches[index]?.replace(':', '').trim() || `${type} ${index + 1}`,
                title: rest.length > 0 ? title.trim() : '',
                text: rest.length > 0 ? rest.join(' — ').trim() : trimmed,
            };
        }),
    };
};
