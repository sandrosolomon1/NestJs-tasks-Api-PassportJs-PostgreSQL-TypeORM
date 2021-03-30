import {EntityRepository, Repository} from "typeorm";
import {TaskEntity} from "./task.entity";
import {FilterTaskDto} from "./FilterTask.dto";
import {User} from "../auth/user.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
    async getTasks(filterDto: FilterTaskDto,user: User): Promise<TaskEntity[]> {
        const {status, search} = filterDto

        const query = this.createQueryBuilder('task')

        query.where('task.userId = :userId', {userId: user.id})

        if(status) {
            query.andWhere('task.status = :status', { status })
        }

        if(search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search',
                { search: `%${search}%` })
        }

        const tasks = await query.getMany()
        return tasks
    }
}