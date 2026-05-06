import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
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

  // Demo clients
  const clients = await Promise.all([
    prisma.client.create({ data: { name: 'Иван Петров', email: 'ivan@example.com', phone: '+7-912-345-67-89', status: 'active', assignedTo: admin.id } }),
    prisma.client.create({ data: { name: 'ООО "Ромашка"', email: 'info@romashka.ru', phone: '+7-495-123-45-67', status: 'active', assignedTo: admin.id } }),
    prisma.client.create({ data: { name: 'Анна Смирнова', email: 'anna@example.com', status: 'lead', assignedTo: admin.id } }),
    prisma.client.create({ data: { name: 'ИП Кузнецов', phone: '+7-911-222-33-44', status: 'lead', assignedTo: admin.id } }),
    prisma.client.create({ data: { name: 'Сергей Иванов', email: 'sergey@example.com', status: 'archived', assignedTo: admin.id } }),
  ]);

  // Demo deals
  await Promise.all([
    prisma.deal.create({ data: { title: 'Сайт-визитка', amount: 50000, stage: 'lead', probability: 20, clientId: clients[0].id, ownerId: admin.id } }),
    prisma.deal.create({ data: { title: 'CRM-система', amount: 300000, stage: 'qualified', probability: 40, clientId: clients[1].id, ownerId: admin.id } }),
    prisma.deal.create({ data: { title: 'Мобильное приложение', amount: 200000, stage: 'proposal', probability: 60, clientId: clients[2].id, ownerId: admin.id } }),
    prisma.deal.create({ data: { title: 'Поддержка сервера', amount: 15000, stage: 'negotiation', probability: 80, clientId: clients[3].id, ownerId: admin.id } }),
  ]);

  // Demo tasks
  await Promise.all([
    prisma.task.create({ data: { title: 'Обзвонить лидов', status: 'todo', priority: 'high', clientId: clients[0].id, assigneeId: admin.id } }),
    prisma.task.create({ data: { title: 'Подготовить коммерческое предложение', status: 'in_progress', priority: 'urgent', clientId: clients[1].id, assigneeId: admin.id } }),
    prisma.task.create({ data: { title: 'Отправить договор', status: 'todo', priority: 'medium', clientId: clients[2].id, assigneeId: admin.id } }),
  ]);

  console.log('✅ Seed completed');
  console.log('👤 Admin: admin@crm.local / admin123');
}

main().catch(console.error).finally(() => prisma.$disconnect());
