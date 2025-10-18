import plusButton from "./icons/plus.svg";
import { taskMan } from "./task-dom";

export const manipulator = (function () {
    const storage = window.localStorage;

    function homePage() {
        const container = document.querySelector('.container');
        const viewTask = document.querySelector('.view-task');
        const backButton = document.querySelector('.back-button');
        if (backButton) backButton.remove();
        if (viewTask) viewTask.remove();
        const subContainer = storage.all_projs ? buildWith() : addProject();
        container.appendChild(subContainer);
        viewTaskEventAdder();
    }

    function viewTaskEventAdder() {
        const tasks = document.querySelectorAll('.task');
        
        tasks.forEach((element) => {
            element.addEventListener('click', (e) => {
                const myId = e.target.parentElement.id;
                const parentId = e.target.parentElement.parentElement.parentElement.id;
                taskMan.displayTask(parentId, myId);
            })
        })
    }

    function removeProjectEventAdder() {
        const addTaskButton = document.querySelectorAll('.add-button');
        addTaskButton.forEach((element) => {
            element.addEventListener('click', (e) => {
                const uuid = e.target.parentElement.parentElement.parentElement.parentElement.id;
                manipulator.deleteProject(uuid);
            })
        })
    }

    function buildWith() {

        const allProj = JSON.parse(storage.all_projs);

        const projects = document.createElement('div');
        projects.classList.add('projects');


        for (const parentKey of Object.keys(allProj)) {
            const projCard = document.createElement('div');
            projCard.classList.add('proj-card')
            projCard.id = parentKey;

            const projHeader = document.createElement('div');
            projHeader.classList.add('proj-header');

            const projName = document.createElement('h2');
            projName.textContent = allProj[parentKey].name;
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

            let i = 0;
            for (const key of Object.keys(allProj[parentKey].tasks)) {
                if (i == 5) break;
                i++;
                const task = document.createElement('div');
                task.classList.add('task');
                task.id = key;

                const checkbox = document.createElement('div');
                checkbox.classList.add('checkbox');

                const taskTitle = document.createElement('div');
                taskTitle.textContent = allProj[parentKey].tasks[key].title;

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
        addButton.textContent = 'new project';
        const addButtonSVG = document.createElement('img');
        addButtonSVG.src = plusButton;
        const projCard = document.createElement('div');
        projCard.classList.add('proj-card')
        projCard.classList.add('new-proj');

        addTask.appendChild(addButton);
        addButton.appendChild(addButtonSVG);
        if (!projects) {
            projects = document.createElement('div');
            projects.classList.add('projects');
        }
        projCard.appendChild(addTask);
        projects.appendChild(projCard);
        return projects;
    }

    function deleteProject(uuid) {
        const allProj = JSON.parse(storage.all_projs);
        const projCard = document.getElementById(uuid);
        delete allProj[uuid];
        projCard.remove();
        storage.clear();
        storage.setItem('all_projs', JSON.stringify(allProj));
        homePage();
    }

    return { homePage, deleteProject }
})()