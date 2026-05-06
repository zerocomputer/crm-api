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
exports.DealsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DealsService = class DealsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { stage, clientId, page = 1 } = query;
        const where = {};
        if (stage)
            where.stage = stage;
        if (clientId)
            where.clientId = clientId;
        const [data, total] = await Promise.all([
            this.prisma.deal.findMany({
                where,
                skip: (page - 1) * 20,
                take: 20,
                orderBy: { createdAt: 'desc' },
                include: {
                    client: { select: { id: true, name: true } },
                    company: { select: { id: true, name: true } },
                    owner: { select: { id: true, name: true } },
                },
            }),
            this.prisma.deal.count({ where }),
        ]);
        return { data, total, page };
    }
    async findOne(id) {
        const deal = await this.prisma.deal.findUnique({
            where: { id },
            include: {
                client: { select: { id: true, name: true, email: true } },
                company: { select: { id: true, name: true } },
                owner: { select: { id: true, name: true } },
                activities: { orderBy: { createdAt: 'desc' }, take: 10 },
            },
        });
        if (!deal)
            throw new common_1.NotFoundException('Deal not found');
        return deal;
    }
    async create(dto, userId) {
        return this.prisma.deal.create({
            data: { ...dto, ownerId: userId },
            include: { client: { select: { id: true, name: true } } },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.deal.update({
            where: { id },
            data: { ...dto, closedAt: dto.closedAt ? new Date(dto.closedAt) : undefined },
            include: { client: { select: { id: true, name: true } } },
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.deal.delete({ where: { id } });
        return { deleted: true };
    }
    async getPipelineStats() {
        const stages = ['lead', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];
        const stats = await Promise.all(stages.map(async (stage) => {
            const data = await this.prisma.deal.findMany({ where: { stage }, select: { amount: true } });
            return {
                stage,
                count: data.length,
                totalAmount: data.reduce((s, d) => s + (d.amount || 0), 0),
            };
        }));
        return stats;
    }
};
exports.DealsService = DealsService;
exports.DealsService = DealsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DealsService);
//# sourceMappingURL=deals.service.js.map