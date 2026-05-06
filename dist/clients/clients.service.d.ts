import { PrismaService } from '../prisma/prisma.service';
import { ActivitiesService } from '../activities/activities.service';
import { CreateClientDto, UpdateClientDto } from './dto';
export declare class ClientsService {
    private prisma;
    private activities;
    constructor(prisma: PrismaService, activities: ActivitiesService);
    findAll(query: {
        status?: string;
        search?: string;
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
    create(dto: CreateClientDto, userId: string): Promise<any>;
    update(id: string, dto: UpdateClientDto): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    convertLead(id: string, userId: string): Promise<any>;
}
