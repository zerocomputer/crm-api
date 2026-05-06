import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './dto';
export declare class ClientsController {
    private service;
    constructor(service: ClientsService);
    findAll(query: any): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateClientDto, req: any): Promise<any>;
    convertLead(id: string, req: any): Promise<any>;
    update(id: string, dto: UpdateClientDto): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
