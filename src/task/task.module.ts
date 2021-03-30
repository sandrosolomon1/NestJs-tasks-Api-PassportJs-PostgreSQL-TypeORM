import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TaskRepository} from "./task.repository";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [
      TypeOrmModule.forFeature([
          TaskRepository
      ]),
      PassportModule
  ],
  exports: [TypeOrmModule],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
