import Sidebar from '@/components/Sidebar';
import PulseClient from '@/components/PulseClient';

export default function PulsePage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10 w-full relative z-20">
            <Sidebar searchParams={{}} />
            <div className="flex-1">
                <PulseClient />
            </div>
        </div>
    );
}
