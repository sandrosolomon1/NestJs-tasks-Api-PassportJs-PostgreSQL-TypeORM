import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmConfig} from "./config/typeorm.config";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      TaskModule,
      TypeOrmModule.forRoot(TypeOrmConfig),
      AuthModule
  ],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskService],
})
export class AppModule {}
