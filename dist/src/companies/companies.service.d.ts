import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
export declare class CompaniesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: {
        search?: string;
        page?: number;
    }): Promise<{
        data: {
            email: string | null;
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            status: string;
            description: string | null;
            website: string | null;
            industry: string | null;
            ownerId: string | null;
        }[];
        total: number;
        page: number;
    }>;
    findOne(id: string): Promise<{
        clients: {
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
        }[];
        deals: ({
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
        })[];
    } & {
        email: string | null;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        status: string;
        description: string | null;
        website: string | null;
        industry: string | null;
        ownerId: string | null;
    }>;
    create(dto: CreateCompanyDto, userId: string): Promise<{
        email: string | null;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        status: string;
        description: string | null;
        website: string | null;
        industry: string | null;
        ownerId: string | null;
    }>;
    update(id: string, dto: UpdateCompanyDto): Promise<{
        email: string | null;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        status: string;
        description: string | null;
        website: string | null;
        industry: string | null;
        ownerId: string | null;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
