import { supabaseAdmin } from './supabase';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export type BoardAnomalies = {
    boardId: string;
    boardName: string;
    anomalies: {
        type: string;
        dimension: string;
        severity: string;
        timestamp: string;
    }[];
};

export type MacroCluster = {
    id: string;
    title: string;
    description: string;
    impactLevel: 'low' | 'medium' | 'high';
    boardsInvolved: string[];
    dominantDimension: string;
};

export class MeshService {
    /**
     * Aggregates recent anomalies across all boards to find synchronized shifts.
     */
    static async getGlobalMesh(orgId: string): Promise<{ clusters: MacroCluster[], boardConnections: any[] }> {
        // 1. Fetch all boards for the org
        const { data: boards } = await supabaseAdmin
            .from('boards')
            .select('id, name')
            .eq('org_id', orgId);

        if (!boards || boards.length === 0) return { clusters: [], boardConnections: [] };

        const boardIds = boards.map((b: { id: string }) => b.id);

        // 2. Fetch recent dispatch events (anomalies) for these boards
        // Assuming we have a way to track these, e.g., ad_digests with anomaly flags or a dedicated dispatches table
        // For this demo/milestone, we'll fetch ad_digests that are marked as anomalies
        const { data: anomalies } = await supabaseAdmin
            .from('ad_digests')
            .select(`
                id,
                is_anomaly,
                anomaly_reason,
                board_items!inner(board_id)
            `)
            .eq('is_anomaly', true)
            .in('board_items.board_id', boardIds)
            .order('created_at', { ascending: false })
            .limit(50);

        if (!anomalies || anomalies.length < 2) return { clusters: [], boardConnections: [] };

        // 3. Cluster anomalies using GPT-4o
        const clusterPrompt = `
            ACT AS A CROSS-CATEGORY STRATEGIC ANALYST.
            You have a feed of recent "Strategic Anomalies" detected across different brand collections (Boards).
            
            ANOMALIES:
            ${anomalies.map((a: any) => `- BoardID: ${a.board_items[0].board_id}, Reason: ${a.anomaly_reason}`).join('\n')}

            TASK:
            1. Group these into "Macro clusters" where 2+ boards are reacting to the same underlying market shift.
            2. For each cluster, provide a title, a description of the shift, and the IDs of involved boards.
            3. Rank the impact (high/medium/low).

            RETURN JSON ONLY:
            {
                "clusters": [
                    { "id": "dna-shift-1", "title": string, "description": string, "impactLevel": string, "boardsInvolved": string[], "dominantDimension": string }
                ]
            }
        `;

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [{ role: 'user', content: clusterPrompt }],
                response_format: { type: 'json_object' }
            });

            const content = response.choices[0].message.content;
            const result = content ? JSON.parse(content) : { clusters: [] };

            // 4. Transform into board connections for visualization
            const boardConnections: any[] = [];
            result.clusters.forEach((cluster: MacroCluster) => {
                const involved = cluster.boardsInvolved;
                for (let i = 0; i < involved.length; i++) {
                    for (let j = i + 1; j < involved.length; j++) {
                        boardConnections.push({
                            source: involved[i],
                            target: involved[j],
                            type: cluster.title
                        });
                    }
                }
            });

            return {
                clusters: result.clusters,
                boardConnections
            };
        } catch (error) {
            console.error('[MeshService Error]', error);
            return { clusters: [], boardConnections: [] };
        }
    }
}
