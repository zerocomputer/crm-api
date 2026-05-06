"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const admin = await prisma.user.upsert({
        where: { email: 'admin@crm.local' },
        update: {},
        create: {
            email: 'admin@crm.local',
            name: 'Администратор',
            passwordHash: await bcrypt.hash('admin123', 10),
            role: 'admin',
        },
    });
    const clients = await Promise.all([
        prisma.client.create({ data: { name: 'Иван Петров', email: 'ivan@example.com', phone: '+7-912-345-67-89', status: 'active', assignedTo: admin.id } }),
        prisma.client.create({ data: { name: 'ООО "Ромашка"', email: 'info@romashka.ru', phone: '+7-495-123-45-67', status: 'active', assignedTo: admin.id } }),
        prisma.client.create({ data: { name: 'Анна Смирнова', email: 'anna@example.com', status: 'lead', assignedTo: admin.id } }),
        prisma.client.create({ data: { name: 'ИП Кузнецов', phone: '+7-911-222-33-44', status: 'lead', assignedTo: admin.id } }),
        prisma.client.create({ data: { name: 'Сергей Иванов', email: 'sergey@example.com', status: 'archived', assignedTo: admin.id } }),
    ]);
    await Promise.all([
        prisma.deal.create({ data: { title: 'Сайт-визитка', amount: 50000, stage: 'lead', probability: 20, clientId: clients[0].id, ownerId: admin.id } }),
        prisma.deal.create({ data: { title: 'CRM-система', amount: 300000, stage: 'qualified', probability: 40, clientId: clients[1].id, ownerId: admin.id } }),
        prisma.deal.create({ data: { title: 'Мобильное приложение', amount: 200000, stage: 'proposal', probability: 60, clientId: clients[2].id, ownerId: admin.id } }),
        prisma.deal.create({ data: { title: 'Поддержка сервера', amount: 15000, stage: 'negotiation', probability: 80, clientId: clients[3].id, ownerId: admin.id } }),
    ]);
    await Promise.all([
        prisma.task.create({ data: { title: 'Обзвонить лидов', status: 'todo', priority: 'high', clientId: clients[0].id, assigneeId: admin.id } }),
        prisma.task.create({ data: { title: 'Подготовить коммерческое предложение', status: 'in_progress', priority: 'urgent', clientId: clients[1].id, assigneeId: admin.id } }),
        prisma.task.create({ data: { title: 'Отправить договор', status: 'todo', priority: 'medium', clientId: clients[2].id, assigneeId: admin.id } }),
    ]);
    console.log('✅ Seed completed');
    console.log('👤 Admin: admin@crm.local / admin123');
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map