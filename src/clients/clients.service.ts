import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActivitiesService } from '../activities/activities.service';
import { CreateClientDto, UpdateClientDto } from './dto';

@Injectable()
export class ClientsService {
  constructor(
    private prisma: PrismaService,
    private activities: ActivitiesService,
  ) {}

  async findAll(query: { status?: string; search?: string; page?: number; limit?: number }) {
    const { status, search, page = 1, limit = 20 } = query;
    const where: any = {};
    if (status) where.status = status;
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

  async findOne(id: string) {
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
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async create(dto: CreateClientDto, userId: string) {
    const client = await this.prisma.client.create({
      data: { ...dto, assignedTo: userId },
    });
    await this.activities.create({ type: 'note', content: 'Клиент создан', clientId: client.id, userId });
    return client;
  }


  async update(id: string, dto: UpdateClientDto) {
    await this.findOne(id);
    return this.prisma.client.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.client.delete({ where: { id } });
    return { deleted: true };
  }

  async convertLead(id: string, userId: string) {
    const client = await this.findOne(id);
    if (client.status !== 'lead') throw new NotFoundException('Client is not a lead');
    const updated = await this.prisma.client.update({ where: { id }, data: { status: 'active' } });
    await this.activities.create({ type: 'status_change', content: 'Лид конвертирован в клиента', clientId: id, userId });
    // Auto-create a deal
    await this.prisma.deal.create({ data: { title: `Сделка: ${client.name}`, stage: 'lead', clientId: id, ownerId: userId } });
    return updated;
  }
}
