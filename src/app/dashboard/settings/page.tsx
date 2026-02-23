import Sidebar from '@/components/Sidebar';
import SettingsClient from '@/components/SettingsClient';

export default function SettingsPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10 w-full relative z-20">
            <Sidebar searchParams={{}} />
            <div className="flex-1">
                <SettingsClient />
            </div>
        </div>
    );
}
