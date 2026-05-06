export declare class PrismaService {
    cache: Record<string, any[]>;
    filePath(collection: string): string;
    read<T>(collection: string): T[];
    write(collection: string, data: any[]): void;
    uuid(): string;
    create(collection: string, data: any): any;
    update(collection: string, id: string, data: any): any;
    delete(collection: string, id: string): boolean;
    get user(): Collection;
    get client(): Collection;
    get task(): Collection;
    get deal(): Collection;
    get company(): Collection;
    get activityLog(): Collection;
}
declare class Collection {
    private db;
    private name;
    constructor(db: PrismaService, name: string);
    findMany(opts?: any): any[];
    findUnique(opts: any): any;
    findFirst(opts?: any): any;
    create(opts: any): any;
    createMany(opts: any): {
        count: any;
    };
    update(opts: any): any;
    delete(opts: any): boolean;
    count(opts?: any): number;
    groupBy(opts: any): {
        [x: number]: string;
        _count: number;
    }[];
}
export {};
