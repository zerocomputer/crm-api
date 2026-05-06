import { DealsService } from './deals.service';
import { CreateDealDto, UpdateDealDto } from './dto';
export declare class DealsController {
    private service;
    constructor(service: DealsService);
    findAll(q: any): Promise<{
        data: any[];
        total: number;
        page: number;
    }>;
    getPipeline(): Promise<{
        stage: string;
        count: number;
        totalAmount: any;
    }[]>;
    findOne(id: string): Promise<any>;
    create(dto: CreateDealDto, req: any): Promise<any>;
    update(dto: UpdateDealDto, id: string, req: any): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
