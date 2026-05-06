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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_guard_1 = require("../auth/jwt.guard");
let DashboardController = class DashboardController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats() {
        const [totalClients, totalTasks, clientsByStatus, tasksByStatus] = await Promise.all([
            Promise.resolve(this.prisma.client.count()),
            Promise.resolve(this.prisma.task.count()),
            Promise.resolve(this.prisma.client.groupBy({ by: ['status'] })),
            Promise.resolve(this.prisma.task.groupBy({ by: ['status'] })),
        ]);
        return {
            totalClients,
            totalTasks,
            clientsByStatus: clientsByStatus.map((s) => ({ status: s.status, count: s._count })),
            tasksByStatus: tasksByStatus.map((s) => ({ status: s.status, count: s._count })),
        };
    }
    async getRecent() {
        const [recentClients, recentTasks] = await Promise.all([
            Promise.resolve(this.prisma.client.findMany({ take: 5, orderBy: { createdAt: 'desc' } })),
            Promise.resolve(this.prisma.task.findMany({ take: 5, orderBy: { createdAt: 'desc' } })),
        ]);
        return { recentClients, recentTasks };
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('recent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getRecent", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map