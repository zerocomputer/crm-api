"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const activities_service_1 = require("../activities/activities.service");
let ClientsService = class ClientsService {
    constructor(prisma, activities) {
        this.prisma = prisma;
        this.activities = activities;
    }
    async findAll(query) {
        const { status, search, page = 1, limit = 20 } = query;
        const where = {};
        if (status)
            where.status = status;
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.client.findMany({
                where, skip: (page - 1) * limit, take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    assignedUser: { select: { id: true, name: true } },
                    company: { select: { id: true, name: true } },
                    _count: { select: { tasks: true, deals: true } },
                },
            }),
            this.prisma.client.count({ where }),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const client = await this.prisma.client.findUnique({
            where: { id },
            include: {
                assignedUser: { select: { id: true, name: true, email: true } },
                company: { select: { id: true, name: true } },
                tasks: { orderBy: { createdAt: 'desc' }, take: 10, include: { assignee: { select: { id: true, name: true } } } },
                deals: { orderBy: { createdAt: 'desc' }, take: 10, include: { owner: { select: { id: true, name: true } } } },
                activities: { orderBy: { createdAt: 'desc' }, take: 20, include: { user: { select: { id: true, name: true } } } },
            },
        });
        if (!client)
            throw new common_1.NotFoundException('Client not found');
        return client;
    }
    async create(dto, userId) {
        const client = await this.prisma.client.create({
            data: { ...dto, assignedTo: userId },
        });
        await this.activities.create({ type: 'note', content: 'Клиент создан', clientId: client.id, userId });
        return client;
    }
    async bulkCreate(clients, userId) {
        const created = await this.prisma.client.createMany({
            data: clients.map((c) => ({ ...c, assignedTo: userId })),
        });
        return { created: created.count };
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.client.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.client.delete({ where: { id } });
        return { deleted: true };
    }
    async convertLead(id, userId) {
        const client = await this.findOne(id);
        if (client.status !== 'lead')
            throw new common_1.NotFoundException('Client is not a lead');
        const updated = await this.prisma.client.update({ where: { id }, data: { status: 'active' } });
        await this.activities.create({ type: 'status_change', content: 'Лид конвертирован в клиента', clientId: id, userId });
        await this.prisma.deal.create({ data: { title: `Сделка: ${client.name}`, stage: 'lead', clientId: id, ownerId: userId } });
        return updated;
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        activities_service_1.ActivitiesService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map