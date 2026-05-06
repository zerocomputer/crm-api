import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './dto';
export declare class ClientsController {
    private service;
    constructor(service: ClientsService);
    findAll(query: any): Promise<{
        data: ({
            company: {
                name: string;
                id: string;
            } | null;
            _count: {
                tasks: number;
                deals: number;
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
            companyId: string | null;
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
        company: {
            name: string;
            id: string;
        } | null;
        tasks: ({
            assignee: {
                name: string | null;
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
        deals: ({
            owner: {
                name: string | null;
                id: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            clientId: string | null;
            companyId: string | null;
            description: string | null;
            ownerId: string | null;
            title: string;
            amount: number | null;
            stage: string;
            probability: number;
            closedAt: Date | null;
        })[];
        activities: ({
            user: {
                name: string | null;
                id: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            type: string;
            content: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            clientId: string | null;
            dealId: string | null;
            userId: string | null;
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
        companyId: string | null;
        status: string;
        source: string | null;
        description: string | null;
        assignedTo: string | null;
    }>;
    create(dto: CreateClientDto, req: any): Promise<{
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
    }>;
    update(id: string, dto: UpdateClientDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
