import { DealsService } from './deals.service';
import { CreateDealDto, UpdateDealDto } from './dto';
export declare class DealsController {
    private service;
    constructor(service: DealsService);
    findAll(query: any): Promise<{
        data: ({
            company: {
                name: string;
                id: string;
            } | null;
            client: {
                name: string;
                id: string;
            } | null;
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
        total: number;
        page: number;
    }>;
    getPipeline(): Promise<{
        stage: string;
        count: number;
        totalAmount: number;
    }[]>;
    findOne(id: string): Promise<{
        company: {
            name: string;
            id: string;
        } | null;
        client: {
            email: string | null;
            name: string;
            id: string;
        } | null;
        activities: {
            id: string;
            createdAt: Date;
            type: string;
            content: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            clientId: string | null;
            dealId: string | null;
            userId: string | null;
        }[];
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
    }>;
    create(dto: CreateDealDto, req: any): Promise<{
        client: {
            name: string;
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
    }>;
    update(id: string, dto: UpdateDealDto): Promise<{
        client: {
            name: string;
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
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
