import { Module } from '@nestjs/common';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { ActivitiesModule } from '../activities/activities.module';

@Module({ controllers: [DealsController], providers: [DealsService], exports: [DealsService], imports: [ActivitiesModule] })
export class DealsModule {}
