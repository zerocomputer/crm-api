import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealDto, UpdateDealDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('deals')
@UseGuards(JwtAuthGuard)
export class DealsController {
  constructor(private service: DealsService) {}

  @Get() findAll(@Query() q: any) { return this.service.findAll(q); }
  @Get('pipeline') getPipeline() { return this.service.getPipelineStats(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Post() create(@Body() dto: CreateDealDto, @Req() req: any) { return this.service.create(dto, req.user.id); }
  @Patch(':id') update(@Body() dto: UpdateDealDto, @Param('id') id: string, @Req() req: any) { return this.service.update(id, dto, req.user.id); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
