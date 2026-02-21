import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const revalidate = 86400; // Cache for 24 hours

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        // Direct REST fetch to avoid Edge Runtime Node.js import issues with the Supabase client
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        const res = await fetch(`${supabaseUrl}/rest/v1/ad_digests?id=eq.${id}&select=digest,brand`, {
            headers: {
                'apikey': supabaseKey!,
                'Authorization': `Bearer ${supabaseKey!}`
            }
        });

        if (!res.ok) throw new Error('Failed to fetch from Supabase REST endpoint');

        const data = await res.json();
        const ad = data[0];

        if (!ad) {
            return new Response('Not Found', { status: 404 });
        }

        const digest = ad.digest as any;
        const brand = ad.brand || digest?.meta?.brand_guess || 'Unassigned';
        const headline = digest?.extraction?.on_screen_copy?.primary_headline || 'Advertising deconstructed.';
        const mechanic = digest?.classification?.trigger_mechanic || 'Analyzing...';

        const img = new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        backgroundColor: '#FBF7EF',
                        padding: '80px',
                        border: '20px solid #141414',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                        <div style={{
                            display: 'flex',
                            height: '40px',
                            width: '40px',
                            borderRadius: '20px',
                            backgroundColor: '#141414',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            marginRight: '20px'
                        }}>
                            D
                        </div>
                        <div style={{
                            display: 'flex',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#141414'
                        }}>
                            Decompiler
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        fontSize: '64px',
                        fontWeight: 'bold',
                        lineHeight: 1.1,
                        color: '#141414',
                        marginBottom: '20px',
                        maxWidth: '1000px'
                    }}>
                        {headline}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                            display: 'flex',
                            padding: '12px 24px',
                            backgroundColor: '#141414',
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginRight: '20px'
                        }}>
                            {brand}
                        </div>
                        <div style={{
                            display: 'flex',
                            fontSize: '24px',
                            color: '#6B6B6B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}>
                            {mechanic.replace(/_/g, ' ')}
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        position: 'absolute',
                        bottom: '40px',
                        right: '80px',
                        fontSize: '18px',
                        color: '#6B6B6B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em'
                    }}>
                        Intelligence Report #{id.slice(0, 8)}
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );

        const png = await img.arrayBuffer(); // Eagerly render to catch Satori CSS/Layout errors
        return new Response(png, {
            status: 200,
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
            }
        });
    } catch (e: any) {
        console.error(`[OG Export] Failed: ${e.message}`);

        // Hard Fallback Card (Pure SVG Response to guarantee non-zero bytes)
        const svg = `
            <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
                <rect width="1200" height="630" fill="#141414"/>
                <text x="600" y="300" font-family="system-ui, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">Decompiler Intelligence Report</text>
                <text x="600" y="360" font-family="system-ui, sans-serif" font-size="24" fill="#6B6B6B" text-anchor="middle">Report #${id.slice(0, 8)}</text>
            </svg>
        `.trim();

        return new Response(svg, {
            status: 200,
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'no-store, max-age=0'
            }
        });
    }
}
