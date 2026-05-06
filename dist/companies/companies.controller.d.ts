import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
export declare class CompaniesController {
    private service;
    constructor(service: CompaniesService);
    findAll(q: any): Promise<{
        data: any[];
        total: number;
        page: number;
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateCompanyDto, req: any): Promise<any>;
    update(id: string, dto: UpdateCompanyDto): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
