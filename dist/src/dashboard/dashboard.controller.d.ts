import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardController {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(): Promise<{
        totalClients: number;
        totalTasks: number;
        clientsByStatus: {
            status: string;
            count: number;
        }[];
        tasksByStatus: {
            status: string;
            count: number;
        }[];
    }>;
    getRecent(): Promise<{
        recentClients: ({
            assignedUser: {
                id: string;
                name: string | null;
            } | null;
        } & {
            id: string;
            email: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            status: string;
            source: string | null;
            description: string | null;
            companyId: string | null;
            assignedTo: string | null;
        })[];
        recentTasks: ({
            client: {
                id: string;
                name: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            description: string | null;
            title: string;
            clientId: string | null;
            priority: string;
            dueDate: Date | null;
            dealId: string | null;
            assigneeId: string | null;
        })[];
    }>;
}
