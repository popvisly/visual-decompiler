import { supabaseAdmin } from './supabase';

export async function triggerWebhook(orgId: string, eventType: string, payload: any) {
    try {
        // 1. Fetch active webhooks for the org
        const { data: hooks, error } = await supabaseAdmin
            .from('webhooks')
            .select('*')
            .eq('org_id', orgId)
            .eq('is_active', true)
            .contains('event_types', [eventType]);

        if (error) throw error;
        if (!hooks || hooks.length === 0) return;

        // 2. Fire webhooks (fire and forget for now, but logged)
        const deliveries = hooks.map(async (hook: any) => {
            try {
                const res = await fetch(hook.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Visual-Decompiler-Event': eventType,
                        'X-Visual-Decompiler-Secret': hook.secret_token
                    },
                    body: JSON.stringify({
                        event: eventType,
                        timestamp: new Date().toISOString(),
                        payload
                    })
                });

                if (!res.ok) {
                    console.error(`[Webhook] Failed delivery to ${hook.url}: ${res.status}`);
                }
            } catch (err) {
                console.error(`[Webhook] Network error for ${hook.url}:`, err);
            }
        });

        await Promise.all(deliveries);

    } catch (err) {
        console.error(`[Webhook] Global error triggering ${eventType}:`, err);
    }
}
