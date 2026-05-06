import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
        avatarUrl: string | null;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
        avatarUrl: string | null;
    } | null>;
}
