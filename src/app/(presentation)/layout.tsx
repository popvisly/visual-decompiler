import { ReactNode } from 'react';

export default function PresentationLayout({ children }: { children: ReactNode }) {
    // Pure canvas layout. Completely strips away the (dashboard) Global Sidebar.
    return (
        <div className="min-h-screen bg-black text-white w-full overflow-x-hidden selection:bg-white selection:text-black">
            {children}
        </div>
    );
}
