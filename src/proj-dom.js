import plusButton from "./icons/plus.svg";
import saveButtonSVG from "./icons/save.svg";
import deleteButtonSVG from "./icons/delete.svg";
import checkSVG from "./icons/check.svg";
import uncheckSVG from "./icons/uncheck.svg";
import { taskMan } from "./task-dom";
import { Proj } from "./projects";

export const manipulator = (function () {
    const storage = window.localStorage;

    function homePage() {
        const container = document.querySelector('.container');
        removeBackButton();
        if (container.firstChild) container.firstChild.remove();
        const subContainer = storage.all_projs ? buildWith() : addProject();
        container.appendChild(subContainer);
        viewTaskEventAdder();
        newTaskEventAdder();
        newProjectAdder();
        projectViewEventAdder();
        checkmarkEventAdder();
        deleteProjectEventAdder();
    }


    function removeBackButton () {
        const backButton = document.querySelectorAll('.back-button');
        if (backButton) {
            backButton.forEach((element) => {
                element.remove();
            })
        }
    }

    function viewTaskEventAdder() {
        const tasks = document.querySelectorAll('.task-title');
        
        tasks.forEach((element) => {
            element.addEventListener('click', (e) => {
                const myId = e.target.parentElement.id;
                const parentId = e.target.parentElement.parentElement.parentElement.id;
                taskMan.displayTask(parentId, myId);
            })
        })
    }

    function newProjectAdder() {
        const addNewProject = document.querySelector('.add-project-button');
        addNewProject.addEventListener('click', (e) => {
            addNewProject.remove();
            createProject();
        })
    }
    
    function createProject() {
        const allProj = JSON.parse(storage.all_projs);
        const projCard = document.querySelector('.new-proj');
        const addProject = document.createElement('div');
        projCard.appendChild(addProject);
        addProject.classList.add('add-project');
        const form = document.createElement('form');
        form.classList.add('save-project-submit');
        const container = document.createElement('div');
        container.classList.add('project-name-form')
        const label = document.createElement('label')
        const input = document.createElement('input');
        input.setAttributeNode(document.createAttribute('required'));
        const submitButton = document.createElement('button');
        const saveButtonImg = document.createElement('img');
        saveButtonImg.classList.add('save-button-img');
        saveButtonImg.src = saveButtonSVG;
        submitButton.appendChild(saveButtonImg);
        submitButton.type = 'submit';
        form.action = '#';
        form.method = 'post';
        label.htmlFor = 'project-name';
        input.id = 'project-name';
        input.name = 'project-name';
        input.placeholder = 'enter project name'
        container.appendChild(label);
        container.appendChild(input);
        form.appendChild(container);
        form.appendChild(submitButton);
        projCard.appendChild(form);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            allProj[crypto.randomUUID()] = new Proj(input.value);
            storage.setItem('all_projs', JSON.stringify(allProj));
            homePage();
        })

    }

    function newTaskEventAdder() {
        const addNewTask = document.querySelectorAll('.add-button');
        addNewTask.forEach((element) => {
            element.addEventListener('click', (e) => {
            const projectId = e.target.parentElement.parentElement.parentElement.parentElement.id;
            taskMan.newTask(projectId);
            })
        })

    }

    function deleteProjectEventAdder() {
        const deleteProjectButton = document.querySelectorAll('.delete-project-button');
        deleteProjectButton.forEach((element) => {
            element.addEventListener('click', (e) => {
                const projectId = element.parentElement.id
                manipulator.deleteProject(projectId);
            })
        })
    }

    function buildWith() {

        const allProj = JSON.parse(storage.all_projs);

        const projects = document.createElement('div');
        projects.classList.add('projects');


        for (const parentKey of Object.keys(allProj)) {
            projects.appendChild(createCard(parentKey));
        }
        addProject(projects);
        return projects;

    }

    function addProject(projects) {
        const addTask = document.createElement('div');
        addTask.classList.add('add-project');
        const addButton = document.createElement('button');
        addButton.classList.add('add-project-button');
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

    function deleteProject(projectId) {
        const allProj = JSON.parse(storage.all_projs);
        const projCard = document.getElementById(projectId);
        delete allProj[projectId];
        projCard.remove();
        storage.clear();
        storage.setItem('all_projs', JSON.stringify(allProj));
        homePage();
    }

    function createCard(parentKey, isSingle=false) {
        const allProj = JSON.parse(storage.all_projs);
        const projCard = document.createElement('div');
        projCard.classList.add('proj-card');
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

        let i = isSingle ? -5000 : 0;
        for (const key of Object.keys(allProj[parentKey].tasks)) {
            if (i == 5) break;
            i++;
            const task = document.createElement('div');
            task.classList.add('task');
            task.id = key;

            const checkboxContainer = document.createElement('div');
            const checkbox = document.createElement('button');
            checkboxContainer.appendChild(checkbox);
            checkbox.classList.add('checkbox-button');
            const checkboxImg = document.createElement('img');
            checkboxImg.src = uncheckSVG;
            checkbox.appendChild(checkboxImg);
            if (allProj[parentKey].tasks[key].isFinished) {
                checkboxImg.src = checkSVG;
            }

            const taskTitle = document.createElement('div');
            taskTitle.textContent = allProj[parentKey].tasks[key].title;
            taskTitle.classList.add('task-title');

            allTasks.appendChild(task);

            task.appendChild(checkboxContainer);
            task.appendChild(taskTitle);

            if (isSingle) {
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-task-button');

                const deleteButtonImg = document.createElement('img');
                deleteButtonImg.classList.add('delete-task-button-img');
                deleteButtonImg.src = deleteButtonSVG;

                deleteButton.appendChild(deleteButtonImg);
                task.appendChild(deleteButton);
            }

        }

        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.classList.add('delete-project-button');
        const deleteProjectTitle = document.createElement('p');
        deleteProjectTitle.textContent = 'delete project';
        const deleteProjectImg = document.createElement('img');
        deleteProjectImg.src = deleteButtonSVG;
        deleteProjectButton.appendChild(deleteProjectTitle);
        deleteProjectButton.appendChild(deleteProjectImg);


        projCard.appendChild(projHeader);
        projCard.appendChild(allTasks);
        projCard.appendChild(deleteProjectButton);

        return projCard;
    }

    function viewProject(parentId) {
        const container = document.querySelector('.container');
        if (container.firstChild) container.firstChild.remove();
        const projects = document.createElement('div');
        projects.classList.add('projects')
        
        const projCard = createCard(parentId, true);
        projects.appendChild(projCard);

        container.appendChild(projects);
        taskMan.addBackButton();
        viewTaskEventAdder();
        deleteTaskEventAdder();
        checkmarkEventAdder(false);
        deleteProjectEventAdder();

    }

    function deleteTaskEventAdder() {
        const deleteButton = document.querySelectorAll('.delete-task-button');
        deleteButton.forEach((element) => {
            element.addEventListener('click', (e) => {
                const myId = element.parentElement.id;
                const parentId = element.parentElement.parentElement.parentElement.id
                deleteTask(myId, parentId);
                element.parentElement.remove();
            })
        })

    }

    function deleteTask(myId, parentId) {
        const allProj = JSON.parse(storage.all_projs);
        delete allProj[parentId].tasks[myId];
        storage.setItem('all_projs', JSON.stringify(allProj));

    }

    function projectViewEventAdder() {
        const projCard = document.querySelectorAll('.proj-name');
        projCard.forEach((element) => {
            element.addEventListener('click', (e) => {
                viewProject(e.target.parentElement.parentElement.id)
            } )
        })
    }

    function checkmarkEventAdder(home=true) {
        const checkButton = document.querySelectorAll('.checkbox-button');
        checkButton.forEach((element) => {
            element.addEventListener('click', (e) => {
                const myId = element.parentElement.parentElement.id;
                const parentId = element.parentElement.parentElement.parentElement.parentElement.id;
                taskMan.changeTaskStatus(myId, parentId, home);
            })
        })

    }



    return { homePage, deleteProject, viewProject }
})()