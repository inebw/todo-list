import { add, sub } from "date-fns";
import backSVG from "./icons/back.svg";
import { manipulator } from "./proj-dom";

export const taskMan = (function () {
    const storage = window.localStorage;

    function displayTask(parentId, myId) {

        const mainContainer = document.querySelector('.container');
        const projects = document.querySelector('.projects');
        if (projects) projects.remove();
        const allProj = JSON.parse(storage.all_projs);
        const task = allProj[parentId].tasks[myId];

        const container = document.createElement('div');
        container.classList.add('view-task');

        const viewTaskHeader = document.createElement('div');
        viewTaskHeader.classList.add('view-task-header');
        container.appendChild(viewTaskHeader);


        const projectName = projectSelector(allProj[parentId].name);
        viewTaskHeader.appendChild(projectName);

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('view-task-container');
        container.appendChild(taskContainer);

        const isFinished = document.createElement('input');
        isFinished.classList.add('view-task-isFinished');
        isFinished.type = 'checkbox';
        isFinished.checked = task.isFinished;
        taskContainer.appendChild(isFinished);

        const taskName = document.createElement('input');
        taskName.value = task.title;
        taskName.placeholder = "title"
        taskContainer.appendChild(taskName);
        taskName.classList.add('view-task-title');

        const submitButton = document.createElement('button');
        submitButton.classList.add('view-task-submit');
        submitButton.textContent = 'save';
        viewTaskHeader.appendChild(submitButton);

        const desc = document.createElement('textarea');
        desc.classList.add('view-task-desc');
        desc.value = task.desc;
        taskContainer.appendChild(desc);

        const priorityContainer = prioritySelector(task.priority);
        priorityContainer.classList.add('view-task-priority');
        taskContainer.appendChild(priorityContainer);

        const notes = document.createElement('textarea');
        notes.classList.add('view-task-notes');
        notes.placeholder = 'notes';
        notes.value = task.notes;
        taskContainer.appendChild(notes);

        const dueDate = document.createElement('input');
        dueDate.type = 'date';
        dueDate.classList.add('view-task-dueDate');
        dueDate.value = task.dueDate;
        taskContainer.appendChild(dueDate);

        mainContainer.appendChild(container);
        addBackButton();
        
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
            option.value = allProj[key].name;
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

    return { displayTask }
})();