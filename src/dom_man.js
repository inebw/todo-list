import { it } from "date-fns/locale";
import plusButton from "./icons/plus.svg";

export const manipulator = (function () {
    const storage = window.localStorage
    

    function homePage() {
        if (storage.all_projs) return buildWith();
        addProject();
    }

    function buildWith() {
        const allProj = JSON.parse(storage.all_projs);

        const projects = document.createElement('div');
        projects.classList.add('projects');


        for (const item of allProj) {
            const projCard = document.createElement('div');
            projCard.classList.add('proj-card')

            const projHeader = document.createElement('div');
            projHeader.classList.add('proj-header');

            const projName = document.createElement('h2');
            projName.textContent = item.name;
            projName.classList.add('proj-name');

            const addTask = document.createElement('div');
            addTask.classList.add('add-task');
            const addButton = document.createElement('button');
            addButton.classList.add('add-button');
            const addButtonSVG = document.createElement('img');
            addButtonSVG.src = plusButton;

            addTask.appendChild(addButton);
            addButton.appendChild(addButtonSVG);

            projHeader.appendChild(projName);
            projHeader.appendChild(addTask);

            const allTasks = document.createElement('div');
            allTasks.classList.add('tasks');
    
            
            for (const key of Object.keys(item.tasks)) {
                const task = document.createElement('div');
                task.classList.add('task');

                const checkbox = document.createElement('div');
                checkbox.classList.add('checkbox');

                const taskTitle = document.createElement('div');
                taskTitle.textContent = item.tasks[key].title;
                
                allTasks.appendChild(task);

                task.appendChild(checkbox);
                task.appendChild(taskTitle);
            }

            projCard.appendChild(projHeader);
            projCard.appendChild(allTasks);

            projects.appendChild(projCard);
        }
        addProject(projects);
        return projects;

    }

    function addProject(projects) {
        const addTask = document.createElement('div');
        addTask.classList.add('add-task');
        const addButton = document.createElement('button');
        addButton.classList.add('add-button');
        addButton.textContent = 'new task';
        const addButtonSVG = document.createElement('img');
        addButtonSVG.src = plusButton;
        const projCard = document.createElement('div');
        projCard.classList.add('proj-card')
        projCard.classList.add('new-proj');

        addTask.appendChild(addButton);
        addButton.appendChild(addButtonSVG);
        if (!projects) {
            projects = ddocument.createElement('div');
            projects.classList.add('projects');
        }
        projCard.appendChild(addTask);
        projects.appendChild(projCard);
    }

    return {homePage}
})()