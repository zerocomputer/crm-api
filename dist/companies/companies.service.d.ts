import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
export declare class CompaniesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: {
        search?: string;
        page?: number;
    }): Promise<{
        data: any[];
        total: number;
        page: number;
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateCompanyDto, userId: string): Promise<any>;
    update(id: string, dto: UpdateCompanyDto): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
