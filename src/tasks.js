export const Task = class {
    constructor(title, desc="", dueDate, priority="low", notes="", isFinished=true) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.date = new Date();
        this.isFinished = isFinished
    }

    static add_task() {
        const title = prompt("Enter the title of your task");
        const desc = prompt("Additonal Details");
        const dueDate = prompt("Enter the date");
        const priority = prompt("Enter the priority");
        const notes = prompt("Enter notes if required");

        const new_task = new Task(title, desc, dueDate, priority, notes);
        return new_task;
    }

    change_priority(new_priority) {
        this.priority = new_priority;
    }

}