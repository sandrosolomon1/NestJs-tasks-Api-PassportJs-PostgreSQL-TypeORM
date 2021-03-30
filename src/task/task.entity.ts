import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TaskStatus} from "./task.model";
import {User} from "../auth/user.entity";

@Entity()
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    status: TaskStatus
    
    @ManyToOne(type => User,user => user.tasks, {eager: false})
    user: User

    @Column()
    userId: number

    @Column()
    description: string
}