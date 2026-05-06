import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardController {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(): Promise<{
        totalClients: number;
        totalTasks: number;
        clientsByStatus: {
            status: any;
            count: any;
        }[];
        tasksByStatus: {
            status: any;
            count: any;
        }[];
    }>;
    getRecent(): Promise<{
        recentClients: any[];
        recentTasks: any[];
    }>;
}
