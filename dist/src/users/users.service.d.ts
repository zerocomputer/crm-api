import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        email: string;
        name: string | null;
        id: string;
        role: string;
        avatarUrl: string | null;
    }[]>;
    findById(id: string): Promise<{
        email: string;
        name: string | null;
        id: string;
        role: string;
        avatarUrl: string | null;
    } | null>;
}
