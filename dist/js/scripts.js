//(function () { Basic starter info
"use strict";

var tasks = [
    {
        title: "aaaaaaWork it harder",
        description: "Work it harder description"
    }, {
        title: "bbbbbbMake it better",
        description: "Make it better description"
    }

];

var State = function () {
    this.tasks = [];
    this.selectedTask = {};
};

var $state = new State();

//update state with dummy data
$state.tasks = tasks;

// for(i=0; i<40; i++){     tasks.push({title: "Task boladona" + i, description:
// "Desk boladona" + i}) } loads starter info
document.addEventListener("DOMContentLoaded", event => {
    console.log("DOM fully loaded and parsed");
    renderTaskList();

});

//BOTH OF THIS WORKS -- PICK THE MOST ELEGANT ONE
var $ = document
    .getElementById
    .bind(document);
//function $(id) { return document.getElementById(id); } dom elements

function addTaskItem(element, index) {

    //creating DOM element
    var listItem = document.createElement("div");

    //Atributting an unique ID
    listItem.id = "task-" + index;

    //Adding Edit Task function to it
    listItem.onclick = function () {
        editTask(element.title, element.description, index);
    };

    //Building the inner HTML of the Element
    listItem.className = "task-list-item flex-center";
    listItem.innerHTML = '<i class="icon-check" ></i><span id="task-title-' + index + '">' + element.title + '</span>'

    //Rendering-it to the DOM
    $("task-list-container").appendChild(listItem);
}



function renderTaskList(task) {
    // If a task is given, its only an update. Otherwise we need to render the whole
    // list
    if (task) {
        addTaskItem(task, $state.tasks.length - 1);
    } else {

        //reseting the list
        $("task-list-container").innerHTML = "";

        //adding each element of $state.tasks to the DOM
        $state
            .tasks
            .forEach((element, index) => {
                addTaskItem(element, index);
            });
    }
}

function showEditor() {
    //Simply show de Editor (right panel)
    $('tasks-container').className = "col-7 full-height";
    $("add-task-container").style.display = 'block';
}

function editTask(title, description, index) {

    showEditor();

    //update Selected Task
    $state.selectedTask.title = title;
    $state.selectedTask.description = description;
    $state.selectedTask.id = index;

    //update editor DOM
    var DomTaskTitle = $("task-title");
    DomTaskTitle.value = title;
    $("task-desc").value = description;

}

function updateTaskListRender() {
    var taskId = $state.selectedTask.id;
    console.log($state.selectedTask.title);
    $("task-title-" + taskId).innerHTML = $state.selectedTask.title;

}
function updateTaskTitle() {
    var DomTaskTitle = $("task-title");
    var taskId = $state.selectedTask.id;
    $state.tasks[taskId].title = DomTaskTitle.value;
    $state.selectedTask.title = DomTaskTitle.value;
    updateTaskListRender();

}

function updateTaskDesc() {
    var DomTaskDesc = $("task-desc");
    var taskId = $state.selectedTask.id;
    $state.tasks[taskId].description = DomTaskDesc.value;
}

function addTask() {
    showEditor();
    console.log("Add Task");
    $state.selectedTask.title = "";
    $state.selectedTask.description = "";
    $state.selectedTask.id = $state.tasks.length;

    var element = {
        title: $state.selectedTask.title,
        description: $state.selectedTask.description
    };

    tasks.push(element);
    renderTaskList(element);

    //update editor DOM
    var DomTaskTitle = $("task-title");
    DomTaskTitle.value = $state.selectedTask.title;
    $("task-desc").value = $state.selectedTask.description;

}

function saveTask() {
    event.preventDefault();
    console.log("Save task!");
}

function closeAddTask() {
    $("add-task-container").style.display = 'none';
    $("tasks-container").className = "col-8 offset-col-2 full-height";
}
//})();