import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Param, Req, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PrismaService } from '../prisma/prisma.service';
import { ActivitiesService } from '../activities/activities.service';
import * as fs from 'fs';

const UPLOAD_DIR = join(__dirname, '..', '..', 'uploads');

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(
    private prisma: PrismaService,
    private activities: ActivitiesService,
  ) {
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  @Post(':entity/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: UPLOAD_DIR,
      filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + extname(file.originalname));
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
  }))
  async upload(
    @Param('entity') entity: string,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');

    const fileUrl = `/uploads/${file.filename}`;
    const content = `Файл: ${file.originalname} (${(file.size / 1024).toFixed(1)} KB)`;

    if (entity === 'clients') {
      await this.activities.create({ type: 'file', content, clientId: id, userId: req.user.id, metadata: { url: fileUrl, name: file.originalname, size: file.size } });
    } else if (entity === 'deals') {
      await this.activities.create({ type: 'file', content, dealId: id, userId: req.user.id, metadata: { url: fileUrl, name: file.originalname, size: file.size } });
    }

    return { url: fileUrl, name: file.originalname, size: file.size };
  }
}
