import { ImageResponse } from 'next/og';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'edge';
export const revalidate = 86400; // Cache for 24 hours

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const { data: ad, error } = await supabaseAdmin
            .from('ad_digests')
            .select('digest, brand')
            .eq('id', id)
            .single();

        if (error || !ad) {
            return new Response('Not Found', { status: 404 });
        }

        const digest = ad.digest as any;
        const brand = ad.brand || digest?.meta?.brand_guess || 'Unassigned';
        const headline = digest?.extraction?.on_screen_copy?.primary_headline || 'Advertising deconstructed.';
        const mechanic = digest?.classification?.trigger_mechanic || 'Analyzing...';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
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
                            height: '40px',
                            width: '40px',
                            borderRadius: '20px',
                            backgroundColor: '#141414',
                            display: 'flex',
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
                            fontSize: '24px',
                            color: '#6B6B6B',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}>
                            {mechanic.replace(/_/g, ' ')}
                        </div>
                    </div>

                    <div style={{
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
    } catch (e: any) {
        console.error(`[OG Export] Failed: ${e.message}`);
        return new Response('Failed to generate image', { status: 500 });
    }
}
