import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { status?: string; clientId?: string; assigneeId?: string; page?: number; limit?: number }) {
    const { status, clientId, assigneeId, page = 1, limit = 20 } = query;
    const where: any = {};
    if (status) where.status = status;
    if (clientId) where.clientId = clientId;
    if (assigneeId) where.assigneeId = assigneeId;

    const [data, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          client: { select: { id: true, name: true } },
          assignee: { select: { id: true, name: true } },
        },
      }),
      this.prisma.task.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        client: { select: { id: true, name: true } },
        assignee: { select: { id: true, name: true, email: true } },
      },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async create(dto: CreateTaskDto, userId: string) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        priority: dto.priority,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        clientId: dto.clientId,
        assigneeId: userId,
      },
      include: {
        client: { select: { id: true, name: true } },
        assignee: { select: { id: true, name: true } },
      },
    });
  }

  async update(id: string, dto: UpdateTaskDto) {
    await this.findOne(id);
    return this.prisma.task.update({
      where: { id },
      data: {
        ...dto,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
      include: {
        client: { select: { id: true, name: true } },
        assignee: { select: { id: true, name: true } },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.task.delete({ where: { id } });
    return { deleted: true };
  }
}
