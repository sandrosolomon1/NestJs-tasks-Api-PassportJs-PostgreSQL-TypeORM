import {BadRequestException, PipeTransform} from "@nestjs/common";
import {TaskStatus} from "../task.model";

export class TaskStatusValidatePipe implements PipeTransform {
    private readonly AV_STATUS = [
        TaskStatus.OPEN,
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS
    ]

    transform(value: any): any {
        value = value.toUpperCase()

        if(!this.validate(value)) {
            throw new BadRequestException(`${value} is an invalid dude`)
        }

        return value
    }

    private validate(status: TaskStatus): boolean {
        const idx = this.AV_STATUS.indexOf(status)

        return idx !== -1
    }

}