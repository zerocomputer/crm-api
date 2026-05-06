import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ActivitiesModule } from '../activities/activities.module';

@Module({
  imports: [ActivitiesModule],
  controllers: [UploadController],
})
export class UploadModule {}
