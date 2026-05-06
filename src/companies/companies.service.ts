import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { search?: string; page?: number }) {
    const { search, page = 1 } = query;
    const where: any = {};
    if (search) where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }];
    const [data, total] = await Promise.all([
      this.prisma.company.findMany({ where, skip: (page - 1) * 20, take: 20, orderBy: { createdAt: 'desc' } }),
      this.prisma.company.count({ where }),
    ]);
    return { data, total, page };
  }

  async findOne(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: { clients: true, deals: { include: { client: { select: { id: true, name: true } } } } },
    });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async create(dto: CreateCompanyDto, userId: string) {
    return this.prisma.company.create({ data: { ...dto, ownerId: userId } });
  }

  async update(id: string, dto: UpdateCompanyDto) {
    await this.findOne(id);
    return this.prisma.company.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.company.delete({ where: { id } });
    return { deleted: true };
  }
}
