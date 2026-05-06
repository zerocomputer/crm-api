import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './dto';
export declare class ClientsController {
    private service;
    constructor(service: ClientsService);
    findAll(query: any): Promise<{
        data: ({
            company: {
                id: string;
                name: string;
            } | null;
            assignedUser: {
                id: string;
                name: string | null;
            } | null;
            _count: {
                tasks: number;
                deals: number;
            };
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
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        tasks: ({
            assignee: {
                id: string;
                name: string | null;
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
        deals: ({
            owner: {
                id: string;
                name: string | null;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            companyId: string | null;
            title: string;
            amount: number | null;
            stage: string;
            probability: number;
            closedAt: Date | null;
            clientId: string | null;
            ownerId: string | null;
        })[];
        activities: ({
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
        })[];
        company: {
            id: string;
            name: string;
        } | null;
        assignedUser: {
            id: string;
            email: string;
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
    }>;
    create(dto: CreateClientDto, req: any): Promise<{
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
    }>;
    importClients(body: {
        clients: CreateClientDto[];
    }, req: any): Promise<{
        created: number;
    }>;
    convertLead(id: string, req: any): Promise<{
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
    }>;
    update(id: string, dto: UpdateClientDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
