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
        data: any[];
        total: number;
        page: number;
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateDealDto, userId: string): Promise<any>;
    update(id: string, dto: UpdateDealDto, userId?: string): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    getPipelineStats(): Promise<{
        stage: string;
        count: number;
        totalAmount: any;
    }[]>;
}
