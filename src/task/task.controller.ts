import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query, UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {Task, TaskStatus} from "./task.model";
import {TaskService} from "./task.service";
import {CreateTaskDto} from "./create-task.dto";
import {TaskStatusValidatePipe} from "./pipes/task-status-validate.pipe";
import {FilterTaskDto} from "./FilterTask.dto";
import {TaskEntity} from "./task.entity";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {

    constructor(private TaskService: TaskService) {
    }

    @Get()
    GetTasks(
        @Query(ValidationPipe) filtertask: FilterTaskDto,
        @GetUser() user: User
    ) {
        return this.TaskService.GetTasks(filtertask,user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    async CreateTask(
        @Body() createTaskdto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<TaskEntity> {
        return this.TaskService.CreateTask(createTaskdto,user)
    }

     @Patch(':id/status')
     UpdateTask(
         @Param('id',ParseIntPipe) id: number,
         @Body('status', TaskStatusValidatePipe) status: TaskStatus,
         @GetUser() user: User
     ): Promise<TaskEntity> {
         return this.TaskService.UpdateTask(id,status,user)
     }

    @Get(':id')
    GetTaskById(
        @Param('id',ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<TaskEntity> {
        const task = this.TaskService.GetTaskById(id,user)

        return task
    }

    @Delete(':id')
    DeleteTask(
        @Param('id',ParseIntPipe) id: number,
        @GetUser() user: User
        ): any  {
        return this.TaskService.DeleteTask(id,user)
    }
}
