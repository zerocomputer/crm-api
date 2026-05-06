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
    }): Promise<any>;
    findByClient(clientId: string): Promise<any[]>;
    findByDeal(dealId: string): Promise<any[]>;
}
