import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
export declare class CompaniesController {
    private service;
    constructor(service: CompaniesService);
    findAll(q: any): Promise<{
        data: {
            id: string;
            email: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            status: string;
            description: string | null;
            ownerId: string | null;
            website: string | null;
            industry: string | null;
        }[];
        total: number;
        page: number;
    }>;
    findOne(id: string): Promise<{
        clients: {
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
        }[];
        deals: ({
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
        })[];
    } & {
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        status: string;
        description: string | null;
        ownerId: string | null;
        website: string | null;
        industry: string | null;
    }>;
    create(dto: CreateCompanyDto, req: any): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        status: string;
        description: string | null;
        ownerId: string | null;
        website: string | null;
        industry: string | null;
    }>;
    update(id: string, dto: UpdateCompanyDto): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        status: string;
        description: string | null;
        ownerId: string | null;
        website: string | null;
        industry: string | null;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
