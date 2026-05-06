import { PrismaService } from '../prisma/prisma.service';
import { ActivitiesService } from '../activities/activities.service';
import { CreateDealDto, UpdateDealDto } from './dto';
export declare class DealsService {
    private prisma;
    private activities;
    constructor(prisma: PrismaService, activities: ActivitiesService);
    findAll(query: {
        stage?: string;
        clientId?: string;
        page?: number;
    }): Promise<{
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
    create(dto: CreateDealDto, userId: string): Promise<{
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
    update(id: string, dto: UpdateDealDto, userId?: string): Promise<{
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
    getPipelineStats(): Promise<{
        stage: string;
        count: number;
        totalAmount: number;
    }[]>;
}
