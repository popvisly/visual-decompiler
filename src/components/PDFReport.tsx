'use client';

import { FileDown, Printer } from 'lucide-react';

export default function PDFReport() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="no-print">
            <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-[#6B6B6B] hover:text-[#141414] uppercase tracking-[0.15em] border border-[#E7DED1] rounded-xl hover:bg-[#FBF7EF] transition-all"
            >
                <FileDown className="w-3.5 h-3.5" />
                Export Strategic Dossier
            </button>

            <style jsx global>{`
                @media print {
                    /* ━━━ GALLERY AESTHETIC INVERSION ━━━ */
                    .no-print { display: none !important; }

                    body {
                        background: #FFFFFF !important;
                        color: #141414 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    /* Hide navigation and interactive elements */
                    .max-w-7xl { max-width: 100% !important; padding: 0 !important; }
                    .max-w-5xl { max-width: 100% !important; }
                    aside { display: none !important; }
                    header { display: none !important; }
                    main { width: 100% !important; margin: 0 !important; padding: 0 !important; }

                    /* Light theme surfaces */
                    .bg-surface { background: #FBF7EF !important; border: 1px solid #E7DED1 !important; }
                    .rounded-2xl { border-radius: 12px !important; }
                    .p-10 { padding: 20px !important; }

                    /* Force grid on print */
                    .grid { display: grid !important; }
                    .lg\\:grid-cols-5 { grid-template-columns: 2fr 3fr !important; }
                    .lg\\:col-span-2 { grid-column: span 1 !important; }
                    .lg\\:col-span-3 { grid-column: span 1 !important; }

                    /* ━━━ GAZE TOPOLOGY SECTION ━━━ */
                    .grid.grid-cols-3 {
                        display: grid !important;
                        grid-template-columns: repeat(3, 1fr) !important;
                        gap: 1rem !important;
                    }

                    /* Dark card backgrounds → White with tan borders */
                    .bg-\\[\\#1A1A1A\\] {
                        background: #FFFFFF !important;
                        border-color: #C1A67B !important;
                    }

                    /* Text color inversions */
                    .text-white { color: #141414 !important; }
                    .text-\\[\\#D4A574\\] { color: #C1A67B !important; }
                    .text-\\[\\#8B4513\\] { color: #141414 !important; }
                    .text-\\[\\#FFFFFF\\]\\/60,
                    .text-\\[\\#FFFFFF\\]\\/50,
                    .text-\\[\\#FFFFFF\\]\\/70 { color: #141414 !important; opacity: 0.7 !important; }

                    /* Tan accent preservation */
                    .text-\\[\\#D4A574\\]\\/60,
                    .text-\\[\\#D4A574\\]\\/80 { color: #C1A67B !important; }

                    .bg-\\[\\#D4A574\\] { background: #C1A67B !important; }
                    .border-\\[\\#D4A574\\]\\/20,
                    .border-\\[\\#D4A574\\]\\/15,
                    .border-\\[\\#D4A574\\]\\/10 { border-color: #C1A67B !important; }

                    /* ━━━ COUNTER-READING MATRIX ━━━ */
                    .grid.md\\:grid-cols-2 {
                        display: grid !important;
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 1rem !important;
                    }

                    /* Ivory/Bone backgrounds for reading blocks */
                    .bg-\\[\\#FBFBF6\\] {
                        background: #FBF7EF !important;
                        border-color: #E7DED1 !important;
                    }

                    /* ━━━ RADIANT ARCHITECTURE SVG (300DPI) ━━━ */
                    svg {
                        image-rendering: -webkit-optimize-contrast;
                        image-rendering: crisp-edges;
                        shape-rendering: geometricPrecision;
                    }

                    .radiant-overlay,
                    svg.radiant-architecture {
                        filter: brightness(1.2) contrast(1.1);
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    /* ━━━ PAGE BREAKS ━━━ */
                    .pt-12 { page-break-before: always; }

                    section.signals-section,
                    section.counter-reading-section {
                        page-break-before: always;
                        page-break-inside: avoid;
                    }

                    /* Prevent orphaned content */
                    .grid-cols-3 > div,
                    .md\\:grid-cols-2 > div {
                        page-break-inside: avoid;
                    }
                }
            `}</style>
        </div>
    );
}
