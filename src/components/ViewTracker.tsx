'use client';

import { useEffect } from 'react';

export default function ViewTracker({ reportId }: { reportId: string }) {
    useEffect(() => {
        // Debounce or ensure it only runs once per mount in strict mode
        const timer = setTimeout(() => {
            fetch('/api/report-view', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reportId })
            }).catch(() => { });
        }, 1000); // Wait 1s after render to confirm actual view

        return () => clearTimeout(timer);
    }, [reportId]);

    return null; // Invisible component
}
