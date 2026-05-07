type JsonParseOutcome =
    | { ok: true; value: any; usedFixup: boolean; usedModelRepair: boolean; candidate: string }
    | { ok: false; error: Error; candidate: string };

const stripCodeFences = (input: string) => {
    let text = input.trim();

    if (text.includes('```json')) {
        text = text.split('```json')[1] ?? text;
        if (text.includes('```')) text = text.split('```')[0] ?? text;
    } else if (text.includes('```')) {
        text = text.split('```')[1] ?? text;
        if (text.includes('```')) text = text.split('```')[0] ?? text;
    }

    return text.trim();
};

const extractFirstJsonCandidate = (input: string) => {
    const text = input.trim();
    const start = text.search(/[{\[]/);
    if (start === -1) return text;

    const open = text[start];
    const close = open === '{' ? '}' : ']';

    let depth = 0;
    let inString = false;
    let escaped = false;

    for (let i = start; i < text.length; i++) {
        const ch = text[i];

        if (inString) {
            if (escaped) {
                escaped = false;
                continue;
            }
            if (ch === '\\') {
                escaped = true;
                continue;
            }
            if (ch === '"') {
                inString = false;
            }
            continue;
        }

        if (ch === '"') {
            inString = true;
            continue;
        }

        if (ch === open) depth++;
        if (ch === close) {
            depth--;
            if (depth === 0) return text.slice(start, i + 1).trim();
        }
    }

    return text.slice(start).trim();
};

const tryFixupJsonString = (input: string) => {
    // Heuristics for common model-output glitches.
    let text = input;

    // Convert “smart quotes” to plain quotes.
    text = text
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2018\u2019]/g, "'");

    // Remove trailing commas before } or ].
    text = text.replace(/,\s*([}\]])/g, '$1');

    // Remove ASCII control characters (except tab/newline/carriage return).
    text = text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');

    return text.trim();
};

const extractJsonErrorPosition = (message: string) => {
    // Example: "... in JSON at position 2363 (line 35 column 99)"
    const match = message.match(/position\s+(\d+)/i);
    if (!match) return null;
    const position = Number(match[1]);
    return Number.isFinite(position) ? position : null;
};

export async function safeJsonParseWithOptionalModelRepair(options: {
    text: string;
    // Optional repair hook if strict parsing fails.
    repair?: (args: { candidate: string; errorMessage: string }) => Promise<string>;
    logPrefix?: string;
}): Promise<JsonParseOutcome> {
    const logPrefix = options.logPrefix ? `[${options.logPrefix}] ` : '';
    const stripped = stripCodeFences(options.text);
    const candidate = extractFirstJsonCandidate(stripped);

    try {
        return { ok: true, value: JSON.parse(candidate), usedFixup: false, usedModelRepair: false, candidate };
    } catch (err1) {
        const error1 = err1 instanceof Error ? err1 : new Error(String(err1));
        const fixed = tryFixupJsonString(candidate);
        const usedFixup = fixed !== candidate;

        try {
            return { ok: true, value: JSON.parse(fixed), usedFixup, usedModelRepair: false, candidate: fixed };
        } catch (err2) {
            const error2 = err2 instanceof Error ? err2 : new Error(String(err2));

            const position = extractJsonErrorPosition(error2.message) ?? extractJsonErrorPosition(error1.message);
            if (position != null) {
                const windowStart = Math.max(0, position - 120);
                const windowEnd = Math.min(candidate.length, position + 120);
                console.error(`${logPrefix}JSON Parse Error near position ${position}:`, candidate.slice(windowStart, windowEnd));
            } else {
                console.error(`${logPrefix}JSON Parse Error. Tail:`, candidate.slice(-160));
            }

            if (!options.repair) return { ok: false, error: error2, candidate };

            try {
                const repairedText = await options.repair({
                    candidate,
                    errorMessage: error2.message || error1.message,
                });

                const repairedCandidate = extractFirstJsonCandidate(stripCodeFences(repairedText));
                const repairedFixed = tryFixupJsonString(repairedCandidate);
                return {
                    ok: true,
                    value: JSON.parse(repairedFixed),
                    usedFixup: repairedFixed !== repairedCandidate,
                    usedModelRepair: true,
                    candidate: repairedFixed,
                };
            } catch (repairErr) {
                const repairError = repairErr instanceof Error ? repairErr : new Error(String(repairErr));
                console.error(`${logPrefix}JSON Repair Attempt Failed:`, repairError);
                return { ok: false, error: error2, candidate };
            }
        }
    }
}

