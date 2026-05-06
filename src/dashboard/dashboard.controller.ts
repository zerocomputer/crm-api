import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private prisma: PrismaService) {}

  @Get('stats')
  async getStats() {
    const [totalClients, totalTasks, clientsByStatus, tasksByStatus] = await Promise.all([
      this.prisma.client.count(),
      this.prisma.task.count(),
      this.prisma.client.groupBy({ by: ['status'], _count: true }),
      this.prisma.task.groupBy({ by: ['status'], _count: true }),
    ]);

    return {
      totalClients,
      totalTasks,
      clientsByStatus: clientsByStatus.map((s) => ({ status: s.status, count: s._count })),
      tasksByStatus: tasksByStatus.map((s) => ({ status: s.status, count: s._count })),
    };
  }

  @Get('recent')
  async getRecent() {
    const [recentClients, recentTasks] = await Promise.all([
      this.prisma.client.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { assignedUser: { select: { id: true, name: true } } },
      }),
      this.prisma.task.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { client: { select: { id: true, name: true } } },
      }),
    ]);

    return { recentClients, recentTasks };
  }
}
