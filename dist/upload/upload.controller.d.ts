import { PrismaService } from '../prisma/prisma.service';
import { ActivitiesService } from '../activities/activities.service';
export declare class UploadController {
    private prisma;
    private activities;
    constructor(prisma: PrismaService, activities: ActivitiesService);
    upload(entity: string, id: string, file: Express.Multer.File, req: any): Promise<{
        url: string;
        name: string;
        size: number;
    }>;
}
