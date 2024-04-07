import { IdGenerator } from "../../common/idGenerator";

export class ScheduleId {
    private readonly value: string

    constructor(private readonly idGenerator: IdGenerator) {
        this.value = idGenerator.generate()
    }

    getId(): string {
        return this.value
    }
}
