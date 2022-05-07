import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CacheModule } from '@nestjs/common';
@Module({
  imports: [CacheModule.register(),
  ],
  controllers: [TaskController,],
  providers: [TaskService]
})
export class TaskModule {}
