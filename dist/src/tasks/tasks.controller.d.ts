import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
export declare class TasksController {
    private service;
    constructor(service: TasksService);
    findAll(query: any): Promise<{
        data: ({
            client: {
                id: string;
                name: string;
            } | null;
            assignee: {
                id: string;
                name: string | null;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            description: string | null;
            title: string;
            clientId: string | null;
            priority: string;
            dueDate: Date | null;
            dealId: string | null;
            assigneeId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        client: {
            id: string;
            name: string;
        } | null;
        assignee: {
            id: string;
            email: string;
            name: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        description: string | null;
        title: string;
        clientId: string | null;
        priority: string;
        dueDate: Date | null;
        dealId: string | null;
        assigneeId: string | null;
    }>;
    create(dto: CreateTaskDto, req: any): Promise<{
        client: {
            id: string;
            name: string;
        } | null;
        assignee: {
            id: string;
            name: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        description: string | null;
        title: string;
        clientId: string | null;
        priority: string;
        dueDate: Date | null;
        dealId: string | null;
        assigneeId: string | null;
    }>;
    update(id: string, dto: UpdateTaskDto): Promise<{
        client: {
            id: string;
            name: string;
        } | null;
        assignee: {
            id: string;
            name: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        description: string | null;
        title: string;
        clientId: string | null;
        priority: string;
        dueDate: Date | null;
        dealId: string | null;
        assigneeId: string | null;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
