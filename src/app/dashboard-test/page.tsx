export const dynamic = 'force-dynamic';

export default async function TestDashboard() {
    return (
        <div className="p-20">
            <h1 className="text-4xl font-bold">Test Dashboard</h1>
            <p className="mt-4">If you can see this, basic server rendering works.</p>
            <p className="mt-2">Env check:</p>
            <ul className="mt-2 space-y-1 text-sm">
                <li>ANTHROPIC_API_KEY: {process.env.ANTHROPIC_API_KEY ? '✅ Set' : '❌ Missing'}</li>
                <li>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</li>
                <li>SUPABASE_SERVICE_ROLE_KEY: {process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing'}</li>
            </ul>
        </div>
    );
}
