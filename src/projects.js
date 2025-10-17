import { Task } from "./tasks";

export const Proj = class {
    constructor(name) {
        this.uuid = crypto.randomUUID();
        this.name = name;
        this.tasks = {};
        this.date = new Date();
    }

    add_task(new_task) {
        if (!new_task){
            new_task = Task.add_task();
        }
        const task_uuid = crypto.randomUUID();
        this.tasks[task_uuid] = new_task;
    }

    remove_task(task_uuid) {
        delete this.tasks.task_uuid;
    }

    print_task() {
        console.log(this.tasks);
    }
}

