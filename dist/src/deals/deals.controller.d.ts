import { DealsService } from './deals.service';
import { CreateDealDto, UpdateDealDto } from './dto';
export declare class DealsController {
    private service;
    constructor(service: DealsService);
    findAll(q: any): Promise<{
        data: ({
            company: {
                id: string;
                name: string;
            } | null;
            client: {
                id: string;
                name: string;
            } | null;
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
        total: number;
        page: number;
    }>;
    getPipeline(): Promise<{
        stage: string;
        count: number;
        totalAmount: number;
    }[]>;
    findOne(id: string): Promise<{
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
        client: {
            id: string;
            email: string | null;
            name: string;
        } | null;
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
    }>;
    create(dto: CreateDealDto, req: any): Promise<{
        client: {
            id: string;
            name: string;
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
    }>;
    update(dto: UpdateDealDto, id: string, req: any): Promise<{
        client: {
            id: string;
            name: string;
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
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
