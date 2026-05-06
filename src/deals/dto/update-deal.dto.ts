import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { CreateDealDto } from './create-deal.dto';

export class UpdateDealDto extends PartialType(CreateDealDto) {
  @IsOptional() @IsString() stage?: string;
  @IsOptional() @IsNumber() probability?: number;
  @IsOptional() @IsString() closedAt?: string;
}
