import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private service: ClientsService) {}

  @Get()
  findAll(@Query() query: any) { return this.service.findAll(query); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Post()
  create(@Body() dto: CreateClientDto, @Req() req: any) { return this.service.create(dto, req.user.id); }


  @Post(':id/convert')
  convertLead(@Param('id') id: string, @Req() req: any) { return this.service.convertLead(id, req.user.id); }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) { return this.service.update(id, dto); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(id); }
}
