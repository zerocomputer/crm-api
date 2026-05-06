import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async create(data: { type: string; content: string; clientId?: string; dealId?: string; userId: string; metadata?: any }) {
    return this.prisma.activityLog.create({ data });
  }

  async findByClient(clientId: string) {
    return this.prisma.activityLog.findMany({
      where: { clientId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { user: { select: { id: true, name: true } } },
    });
  }

  async findByDeal(dealId: string) {
    return this.prisma.activityLog.findMany({
      where: { dealId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { user: { select: { id: true, name: true } } },
    });
  }
}
