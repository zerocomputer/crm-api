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
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateTaskDto, userId: string): Promise<any>;
    update(id: string, dto: UpdateTaskDto): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
