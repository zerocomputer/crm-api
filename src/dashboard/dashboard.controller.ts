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
      Promise.resolve(this.prisma.client.count()),
      Promise.resolve(this.prisma.task.count()),
      Promise.resolve(this.prisma.client.groupBy({ by: ['status'] })),
      Promise.resolve(this.prisma.task.groupBy({ by: ['status'] })),
    ]);

    return {
      totalClients,
      totalTasks,
      clientsByStatus: clientsByStatus.map((s: any) => ({ status: s.status, count: s._count })),
      tasksByStatus: tasksByStatus.map((s: any) => ({ status: s.status, count: s._count })),
    };
  }

  @Get('recent')
  async getRecent() {
    const [recentClients, recentTasks] = await Promise.all([
      Promise.resolve(this.prisma.client.findMany({ take: 5, orderBy: { createdAt: 'desc' } })),
      Promise.resolve(this.prisma.task.findMany({ take: 5, orderBy: { createdAt: 'desc' } })),
    ]);
    return { recentClients, recentTasks };
  }
}
