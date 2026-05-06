import { PrismaService } from '../prisma/prisma.service';
export declare class ActivitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        type: string;
        content: string;
        clientId?: string;
        dealId?: string;
        userId: string;
        metadata?: any;
    }): Promise<{
        id: string;
        createdAt: Date;
        clientId: string | null;
        dealId: string | null;
        type: string;
        content: string;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        userId: string | null;
    }>;
    findByClient(clientId: string): Promise<({
        user: {
            id: string;
            name: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        clientId: string | null;
        dealId: string | null;
        type: string;
        content: string;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        userId: string | null;
    })[]>;
    findByDeal(dealId: string): Promise<({
        user: {
            id: string;
            name: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        clientId: string | null;
        dealId: string | null;
        type: string;
        content: string;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        userId: string | null;
    })[]>;
}
