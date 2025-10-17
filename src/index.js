import "./styles.css";
import { Proj } from "./projects";
import { Task } from "./tasks";
import { manipulator } from "./proj-dom";
import { taskMan } from "./task-dom";

const stor = window.localStorage;

stor.clear();
const all_projs = [];

const default_proj = new Proj('General');
all_projs.push(default_proj)

const task1 = new Task('Task to do title number 1', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const task2 = new Task('Task to do title number 2', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const task3 = new Task('Task to do title number 3', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const task4 = new Task('Task to do title number 4', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const task5 = new Task('Task to do title number 5', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const task6 = new Task('Task to do title number 5', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const task7 = new Task('Task to do title number 5', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const task8 = new Task('Task to do title number 5', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');

default_proj.add_task(task1);
default_proj.add_task(task2);
default_proj.add_task(task3);
default_proj.add_task(task4);
default_proj.add_task(task5);
default_proj.add_task(task6);
default_proj.add_task(task7);
default_proj.add_task(task8);

const odin_proj = new Proj('Odin Course Tutorial');
all_projs.push(odin_proj);

const otask1 = new Task('Task to do title number 1', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const otask2 = new Task('Task to do title number 2', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const otask3 = new Task('Task to do title number 3', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const otask4 = new Task('Task to do title number 4', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const otask5 = new Task('Task to do title number 5', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
odin_proj.add_task(otask1);
odin_proj.add_task(otask2);
odin_proj.add_task(otask3);
odin_proj.add_task(otask4);
odin_proj.add_task(otask5);

const cookProj = new Proj('Learing cooking and baking');
all_projs.push(cookProj);

const ctask1 = new Task('Task to do title number 1', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const ctask2 = new Task('Task to do title number 2', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const ctask3 = new Task('Task to do title number 4', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const ctask4 = new Task('Task to do title number 3', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const ctask5 = new Task('Task to do title number 5', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
cookProj.add_task(ctask1);
cookProj.add_task(ctask2);
cookProj.add_task(ctask3);
cookProj.add_task(ctask4);
cookProj.add_task(ctask5);

const jsProj = new Proj('JavaScript Project: Restaurant Page');
all_projs.push(jsProj);

const jtask1 = new Task('Task to do title number 2', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const jtask2 = new Task('Task to do title number 1', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const jtask3 = new Task('Task to do title number 2', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const jtask4 = new Task('Task to do title number 4', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
const jtask5 = new Task('Task to do title number 6', 'Here you can write the description of your text', '25-12-2025', 'high', 'no notes');
jsProj.add_task(jtask1);
jsProj.add_task(jtask2);
jsProj.add_task(jtask3);
jsProj.add_task(jtask4);
jsProj.add_task(jtask5);

stor.setItem('all_projs', JSON.stringify(all_projs))

const container = document.querySelector('.container');
const projContainer = manipulator.homePage();

container.appendChild(projContainer);


const addTaskButton = document.querySelectorAll('.add-button');

addTaskButton.forEach((element) => {
    element.addEventListener('click', (e) => {
        const uuid = e.target.parentElement.parentElement.parentElement.parentElement.id;
        manipulator.deleteProject(uuid);
    })
})

