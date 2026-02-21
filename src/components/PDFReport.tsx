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
                <Printer className="w-3.5 h-3.5" />
                Export Strategic Brief
            </button>

            <style jsx global>{`
                @media print {
                    .no-print { display: none !important; }
                    body { 
                        background: white !important; 
                        color: #141414 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .max-w-7xl { max-width: 100% !important; padding: 0 !important; }
                    .max-w-5xl { max-width: 100% !important; }
                    aside { display: none !important; }
                    header { display: none !important; }
                    main { width: 100% !important; margin: 0 !important; padding: 0 !important; }
                    .bg-surface { background: #FBF7EF !important; border: 1px solid #E7DED1 !important; }
                    .rounded-2xl { border-radius: 12px !important; }
                    .p-10 { padding: 20px !important; }
                    
                    /* Force grid on print */
                    .grid { display: grid !important; }
                    .lg\\:grid-cols-5 { grid-template-columns: 2fr 3fr !important; }
                    .lg\\:col-span-2 { grid-column: span 1 !important; }
                    .lg\\:col-span-3 { grid-column: span 1 !important; }
                    
                    /* Page breaks */
                    .pt-12 { page-break-before: always; }
                }
            `}</style>
        </div>
    );
}
