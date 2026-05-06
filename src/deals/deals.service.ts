import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDealDto, UpdateDealDto } from './dto';

@Injectable()
export class DealsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { stage?: string; clientId?: string; page?: number }) {
    const { stage, clientId, page = 1 } = query;
    const where: any = {};
    if (stage) where.stage = stage;
    if (clientId) where.clientId = clientId;

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

  async findOne(id: string) {
    const deal = await this.prisma.deal.findUnique({
      where: { id },
      include: {
        client: { select: { id: true, name: true, email: true } },
        company: { select: { id: true, name: true } },
        owner: { select: { id: true, name: true } },
        activities: { orderBy: { createdAt: 'desc' }, take: 10 },
      },
    });
    if (!deal) throw new NotFoundException('Deal not found');
    return deal;
  }

  async create(dto: CreateDealDto, userId: string) {
    return this.prisma.deal.create({
      data: { ...dto, ownerId: userId },
      include: { client: { select: { id: true, name: true } } },
    });
  }

  async update(id: string, dto: UpdateDealDto) {
    await this.findOne(id);
    return this.prisma.deal.update({
      where: { id },
      data: { ...dto, closedAt: dto.closedAt ? new Date(dto.closedAt) : undefined },
      include: { client: { select: { id: true, name: true } } },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.deal.delete({ where: { id } });
    return { deleted: true };
  }

  async getPipelineStats() {
    const stages = ['lead', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];
    const stats = await Promise.all(
      stages.map(async (stage) => {
        const data = await this.prisma.deal.findMany({ where: { stage }, select: { amount: true } });
        return {
          stage,
          count: data.length,
          totalAmount: data.reduce((s, d) => s + (d.amount || 0), 0),
        };
      })
    );
    return stats;
  }
}
