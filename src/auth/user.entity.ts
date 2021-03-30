import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import * as bcrypt from 'bcrypt';
import {TaskEntity} from "../task/task.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    salt: string

    @OneToMany(type => TaskEntity,task => task.user, {eager: true})
    tasks: TaskEntity[]

    async ValidatePassword(password): Promise<boolean> {
        const pw = bcrypt.hashSync(password,this.salt)
        return pw === this.password
    }
}