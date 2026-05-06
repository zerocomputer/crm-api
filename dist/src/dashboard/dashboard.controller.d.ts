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
                name: string | null;
                id: string;
            } | null;
        } & {
            email: string | null;
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            companyId: string | null;
            status: string;
            source: string | null;
            description: string | null;
            assignedTo: string | null;
        })[];
        recentTasks: ({
            client: {
                name: string;
                id: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            clientId: string | null;
            dealId: string | null;
            status: string;
            description: string | null;
            title: string;
            priority: string;
            dueDate: Date | null;
            assigneeId: string | null;
        })[];
    }>;
}
