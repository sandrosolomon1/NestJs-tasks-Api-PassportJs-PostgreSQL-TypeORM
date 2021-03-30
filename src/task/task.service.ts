import {Injectable, NotFoundException} from '@nestjs/common';
import {Task, TaskStatus} from "./task.model";
import {FilterTaskDto} from "./FilterTask.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {TaskRepository} from "./task.repository";
import {TaskEntity} from "./task.entity";
import {CreateTaskDto} from "./create-task.dto";
import {User} from "../auth/user.entity";

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskrepo: TaskRepository
    ) {
    }

    async CreateTask(t: CreateTaskDto, user: User): Promise<TaskEntity> {
        let task: TaskEntity = new TaskEntity()

        task.title = t.title
        task.description = t.description
        task.status = TaskStatus.OPEN
        task.user = user

        return await this.taskrepo.save(task)
    }

    async GetTaskById(id: number,user: User): Promise<TaskEntity> {
        const f = await this.taskrepo.findOne({ where: {id, userId: user.id} })

        if(!f) throw new NotFoundException(`${id} not found betch`)

        return f
    }

    async DeleteTask(id: number,user: User): Promise<any> {
        return await this.taskrepo.delete({id, userId: parseInt(user.id)})
    }

    async UpdateTask(id: number, status: TaskStatus,user: User): Promise<TaskEntity> {
         const task = await this.GetTaskById(id,user)
         task.status = status
         await task.save()
         return task
     }

    GetTasks(filtertask: FilterTaskDto,user): Promise<TaskEntity[]> {
        return this.taskrepo.getTasks(filtertask,user);
    }
}
