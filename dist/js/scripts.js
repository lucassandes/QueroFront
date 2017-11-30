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

var State = function() {
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
    //showEditor();
});

//BOTH OF THIS WORKS -- PICK THE MOST ELEGANT ONE
var $ = document
    .getElementById
    .bind(document);
//function $(id) { return document.getElementById(id); } dom elements

function addTaskItem(element, index) {
    var listItem = document.createElement("div");
    listItem.id = "task-" + index;
    listItem.onclick = function () {
        editTask(element.title, element.description, index);
    };
    //listItem.onclick = "teste()";
    listItem.className = "task-list-item flex-center";
    listItem.innerHTML = '<i class="icon-check" ></i>' + element.title;

    $("task-list-container").appendChild(listItem);
}

function renderTaskList(task) {
    // If a task is give, its only an update. Otherwise we need to render the whole
    // list
    if (task) {
        addTaskItem(task, $state.tasks.length - 1);
    } else {
        $state.tasks.forEach((element, index) => {
            addTaskItem(element, index);
        });
    }
}

function showEditor() {
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

function updateTaskTitle(){
    console.log("Uptade Task Ttitle");
    var DomTaskTitle = $("task-title");
    var taskId = $state.selectedTask.id;
    $state.tasks[taskId].title = DomTaskTitle.value;

}

function updateTaskDesc(){
    console.log("Uptade Task Description");
    var DomTaskDesc = $("task-desc");
    var taskId = $state.selectedTask.id;
    $state.tasks[taskId].description = DomTaskDesc.value;
}

function addTask() {
    console.log("Add task");
    showEditor();

    // var title = $("task-title").addEventListener('keyup', doChange); var
    // description = $("task-desc").addEventListener('keyup', doChange);

}

function saveTask() {
    event.preventDefault();
    console.log("Save task!");

    // It will save only if there's actually a title typed
    if ($("task-title").value) {
        var element = {
            title: $("task-title").value,
            description: $("task-desc").value
        };
        tasks.push(element);
        renderTaskList(element);
    }

}

function closeAddTask() {
    $("add-task-container").style.display = 'none';
    $("tasks-container").className = "col-8 offset-col-2 ";

}
//})();