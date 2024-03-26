export abstract class TaskBasic {
    taskName: string;
    
    constructor(taskName: string) {
        this.taskName = taskName;
    }

    abstract resolveTask(data: unknown): Promise<unknown> ;
}