import { add, sub } from "date-fns";
import backSVG from "./icons/back.svg";
import { manipulator } from "./proj-dom";
import { Task } from "./tasks";
import saveButtonSVG from "./icons/save.svg";
import checkSVG from "./icons/check.svg";
import uncheckSVG from "./icons/uncheck.svg";

export const taskMan = (function () {
    const storage = window.localStorage;

    function newTask(projectId, parentId, myId) {
        const allProj = JSON.parse(storage.all_projs);
        const mainContainer = document.querySelector('.container');
        if (mainContainer.firstChild) mainContainer.firstChild.remove()

        const form = document.createElement('form');

        const container = document.createElement('div');
        container.classList.add('view-task');
        form.appendChild(container);

        const viewTaskHeader = document.createElement('div');
        viewTaskHeader.classList.add('view-task-header');
        container.appendChild(viewTaskHeader);

        const projectName = projectId ? allProj[projectId].name : parentId ? allProj[parentId].name: undefined;
        const projectContainer = projectSelector(projectName);
        viewTaskHeader.appendChild(projectContainer);

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('view-task-container');
        container.appendChild(taskContainer);

        const isFinished = document.createElement('input');
        isFinished.classList.add('view-task-isFinished');
        isFinished.type = 'checkbox';
        isFinished.checked = false;
        taskContainer.appendChild(isFinished);

        const checkbox = document.createElement('button');
        checkbox.type = 'button';
        checkbox.classList.add('checkbox-button');
        const checkboxImg = document.createElement('img');
        checkboxImg.src = uncheckSVG;
        checkbox.appendChild(checkboxImg);
        taskContainer.appendChild(checkbox);

        const taskName = document.createElement('input');
        taskName.placeholder = "title"
        taskContainer.appendChild(taskName);
        taskName.classList.add('view-task-title');

        const submitButton = document.createElement('button');
        const submitButtonImg = document.createElement('img');
        submitButtonImg.classList.add('save-button-img');
        submitButton.appendChild(submitButtonImg);
        submitButtonImg.src = saveButtonSVG;
        submitButton.classList.add('view-task-submit');
        viewTaskHeader.appendChild(submitButton);
        submitButton.type = 'submit';

        const desc = document.createElement('textarea');
        desc.classList.add('view-task-desc');
        desc.placeholder = 'add more info';
        taskContainer.appendChild(desc);

        let priorityContainer = prioritySelector();
        priorityContainer.classList.add('view-task-priority');
        taskContainer.appendChild(priorityContainer);

        const notes = document.createElement('textarea');
        notes.classList.add('view-task-notes');
        notes.placeholder = 'notes';
        taskContainer.appendChild(notes);

        const dueDate = document.createElement('input');
        dueDate.type = 'date';
        dueDate.classList.add('view-task-dueDate');
        taskContainer.appendChild(dueDate);

        if (parentId) {
            const task = allProj[parentId].tasks[myId];
            checkboxImg.src = task.isFinished ? checkSVG : uncheckSVG;
            isFinished.checked = task.isFinished;
            taskName.value = task.title;
            desc.value = task.desc;
            priorityContainer = prioritySelector(task.priority);
            notes.value = task.notes;
            dueDate.value = task.dueDate;
        }

        checkbox.addEventListener('click', () => {
            isFinished.checked = !isFinished.checked;
            checkboxImg.src = isFinished.checked ? checkSVG : uncheckSVG;
        })

        mainContainer.appendChild(form);
        addBackButton();
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const titleValue = taskName.value;
            const descValue = desc.value;
            const isDone = isFinished.checked;
            const notesValue = notes.value;
            const dueDateValue = dueDate.value;
            const projectId = document.getElementById('project').value;
            const priorityValue = document.getElementById('priority').value;
            if (parentId) {
                const task = allProj[parentId].tasks[myId];
                task.isFinished = isDone;
                task.notes = notesValue;
                task.priority = priorityValue;
                task.dueDate = dueDateValue;
                task.desc = desc.value;
                task.title = titleValue;

                if (parentId != projectId) {
                    allProj[projectId].tasks[myId] = task;
                    delete allProj[parentId].tasks[myId];
                }
                    

            } else {
                const newTask = new Task(titleValue, descValue, dueDateValue, priorityValue, notesValue, isDone);
                allProj[projectId].tasks[crypto.randomUUID()] = newTask;
            }
            storage.setItem('all_projs', JSON.stringify(allProj));
            manipulator.homePage();
        })


    }

    function displayTask(parentId, myId) {
        newTask(undefined, parentId, myId);
    }

    function projectSelector(currentProject) {
        const allProj = JSON.parse(storage.all_projs);

        const projectContainer = document.createElement('div');
        projectContainer.classList.add('view-task-project-name');
        projectContainer.id = 'project-name'

        const projectLabel = document.createElement('label');
        projectLabel.htmlFor = 'project';
        projectContainer.appendChild(projectLabel);

        const projectSelect = document.createElement('select');
        projectSelect.id = 'project';
        projectSelect.name = 'project';
        projectContainer.appendChild(projectSelect);

        for (const key of Object.keys(allProj)) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = allProj[key].name;
            projectSelect.appendChild(option);
            if (currentProject == allProj[key].name) {
                option.setAttributeNode(document.createAttribute('selected'));
            }
        }

        return projectContainer;
    }

    function prioritySelector(currentPriority) {
        const priorityContainer = document.createElement('div');
        priorityContainer.classList.add('view-task-priority');

        const priorityLabel = document.createElement('label');
        priorityLabel.htmlFor = 'priority';
        priorityLabel.textContent = 'Priority: ';
        priorityContainer.appendChild(priorityLabel);

        const prioritySelect = document.createElement('select');
        prioritySelect.id = 'priority';
        prioritySelect.name = 'priority';
        priorityContainer.appendChild(prioritySelect);

        for (const op of ['select', 'low', 'medium', 'high']) {
            const option = document.createElement('option');
            option.value = op;
            option.textContent = op;
            prioritySelect.appendChild(option);
            if (currentPriority == op) {
                option.setAttributeNode(document.createAttribute('selected'));
            }
        }

        return priorityContainer;
    }

    function addBackButton() {
        const header = document.querySelector('.header');
        const backButton = document.createElement('button');
        backButton.classList.add('back-button')
        const backButtonImg = document.createElement('img');
        backButtonImg.src = backSVG;
        backButton.appendChild(backButtonImg);
        header.appendChild(backButton);
        backButtonEventAdder(backButton);
    }

    function backButtonEventAdder(backButton) {
        backButton.addEventListener('click', () => {
            manipulator.homePage();
        })
    }

    function changeTaskStatus(myId, parentId, home = true) {
        const allProj = JSON.parse(storage.all_projs);
        allProj[parentId].tasks[myId].isFinished = !allProj[parentId].tasks[myId].isFinished;
        storage.setItem('all_projs', JSON.stringify(allProj));
        if (home) manipulator.homePage();
        else manipulator.viewProject(parentId);
    }

    return { displayTask, newTask, addBackButton, changeTaskStatus}
})();