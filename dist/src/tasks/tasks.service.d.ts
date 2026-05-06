import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: {
        status?: string;
        clientId?: string;
        assigneeId?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: ({
            client: {
                name: string;
                id: string;
            } | null;
            assignee: {
                name: string | null;
                id: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            description: string | null;
            title: string;
            priority: string;
            dueDate: Date | null;
            clientId: string | null;
            assigneeId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        client: {
            name: string;
            id: string;
        } | null;
        assignee: {
            email: string;
            name: string | null;
            id: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        description: string | null;
        title: string;
        priority: string;
        dueDate: Date | null;
        clientId: string | null;
        assigneeId: string | null;
    }>;
    create(dto: CreateTaskDto, userId: string): Promise<{
        client: {
            name: string;
            id: string;
        } | null;
        assignee: {
            name: string | null;
            id: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        description: string | null;
        title: string;
        priority: string;
        dueDate: Date | null;
        clientId: string | null;
        assigneeId: string | null;
    }>;
    update(id: string, dto: UpdateTaskDto): Promise<{
        client: {
            name: string;
            id: string;
        } | null;
        assignee: {
            name: string | null;
            id: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        description: string | null;
        title: string;
        priority: string;
        dueDate: Date | null;
        clientId: string | null;
        assigneeId: string | null;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
