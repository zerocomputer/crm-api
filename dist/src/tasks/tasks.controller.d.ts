import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
export declare class TasksController {
    private service;
    constructor(service: TasksService);
    findAll(query: any): Promise<{
        data: ({
            client: {
                name: string;
                id: string;
            } | null;
            assignee: {
                name: string | null;
                id: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            clientId: string | null;
            dealId: string | null;
            status: string;
            description: string | null;
            title: string;
            priority: string;
            dueDate: Date | null;
            assigneeId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        client: {
            name: string;
            id: string;
        } | null;
        assignee: {
            email: string;
            name: string | null;
            id: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        clientId: string | null;
        dealId: string | null;
        status: string;
        description: string | null;
        title: string;
        priority: string;
        dueDate: Date | null;
        assigneeId: string | null;
    }>;
    create(dto: CreateTaskDto, req: any): Promise<{
        client: {
            name: string;
            id: string;
        } | null;
        assignee: {
            name: string | null;
            id: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        clientId: string | null;
        dealId: string | null;
        status: string;
        description: string | null;
        title: string;
        priority: string;
        dueDate: Date | null;
        assigneeId: string | null;
    }>;
    update(id: string, dto: UpdateTaskDto): Promise<{
        client: {
            name: string;
            id: string;
        } | null;
        assignee: {
            name: string | null;
            id: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        clientId: string | null;
        dealId: string | null;
        status: string;
        description: string | null;
        title: string;
        priority: string;
        dueDate: Date | null;
        assigneeId: string | null;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
