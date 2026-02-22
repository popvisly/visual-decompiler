import { supabaseAdmin } from './supabase';

export type StrategicHandler = {
    id: string;
    name: string;
    role: string;
    bias: 'emotional' | 'intellectual' | 'production' | 'aggression' | 'general';
    avatar?: string;
};

export type AnomalyRoute = {
    id: string;
    anomalyType: string;
    dimension: string;
    handlerId: string;
    adId: string;
    severity: 'critical' | 'warning' | 'info';
    timestamp: string;
    status: 'assigned' | 'acknowledged' | 'resolved';
};

export const HANDLERS: StrategicHandler[] = [
    { id: 'h-1', name: 'Dr. Aris Vane', role: 'Chief Psychological Officer', bias: 'emotional', avatar: 'AV' },
    { id: 'h-2', name: 'Julian Thorne', role: 'Semiotics Lead', bias: 'intellectual', avatar: 'JT' },
    { id: 'h-3', name: 'Elena Voss', role: 'Competitive Intelligence', bias: 'aggression', avatar: 'EV' },
    { id: 'h-4', name: 'Marcus Kane', role: 'Production Analyst', bias: 'production', avatar: 'MK' },
];

export class RoutingService {
    /**
     * Routes a detected anomaly to the most appropriate handler.
     */
    static async routeAnomaly(adId: string, anomalyDetails: any): Promise<AnomalyRoute | null> {
        const { dimension, type, severity } = anomalyDetails;

        // 1. Find the best matching handler based on strategic bias
        const handler = HANDLERS.find(h => h.bias === dimension) || HANDLERS[0];

        const route: Omit<AnomalyRoute, 'id'> = {
            anomalyType: type || 'Pattern Shift',
            dimension: dimension || 'general',
            handlerId: handler.id,
            adId,
            severity: severity || 'warning',
            timestamp: new Date().toISOString(),
            status: 'assigned'
        };

        // 2. Persist the route (Simulated for local, or using a routes table if we had one)
        // For now, we'll log it and return the object.
        console.log(`[Routing] Dispatching ${route.anomalyType} (${dimension}) to ${handler.name}`);

        return {
            id: `route-${Date.now()}`,
            ...route
        } as AnomalyRoute;
    }

    /**
     * Fetches current active routes (Simulated for UI demonstration)
     */
    static getActiveRoutes(): AnomalyRoute[] {
        return [
            {
                id: 'route-sim-1',
                anomalyType: 'Sudden Emotional Pivot',
                dimension: 'emotional',
                handlerId: 'h-1',
                adId: 'uuid-1',
                severity: 'critical',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                status: 'assigned'
            },
            {
                id: 'route-sim-2',
                anomalyType: 'Intensity Spike',
                dimension: 'aggression',
                handlerId: 'h-3',
                adId: 'uuid-2',
                severity: 'warning',
                timestamp: new Date(Date.now() - 7200000).toISOString(),
                status: 'acknowledged'
            }
        ];
    }
}
