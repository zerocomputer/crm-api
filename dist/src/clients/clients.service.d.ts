import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto, UpdateClientDto } from './dto';
export declare class ClientsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: {
        status?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: ({
            _count: {
                tasks: number;
            };
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
            company: string | null;
            status: string;
            source: string | null;
            description: string | null;
            assignedTo: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        tasks: ({
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
        assignedUser: {
            email: string;
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
        company: string | null;
        status: string;
        source: string | null;
        description: string | null;
        assignedTo: string | null;
    }>;
    create(dto: CreateClientDto, userId: string): Promise<{
        email: string | null;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        company: string | null;
        status: string;
        source: string | null;
        description: string | null;
        assignedTo: string | null;
    }>;
    update(id: string, dto: UpdateClientDto): Promise<{
        email: string | null;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        company: string | null;
        status: string;
        source: string | null;
        description: string | null;
        assignedTo: string | null;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
