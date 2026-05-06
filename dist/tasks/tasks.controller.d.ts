import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
export declare class TasksController {
    private service;
    constructor(service: TasksService);
    findAll(query: any): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateTaskDto, req: any): Promise<any>;
    update(id: string, dto: UpdateTaskDto): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
