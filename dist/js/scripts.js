var tasks = [
    {
        title: "Work it harder",
        description: "Work it harder description"
    }, {
        title: "Make it better",
        description: "Make it better description"
    }, {
        title: "",
        description: ""
    }

];

var $ = document.getElementById;

document.addEventListener("DOMContentLoaded", event => {
    console.log("DOM fully loaded and parsed");
    
       
    
    tasks.forEach(element => {
        var tasksContainer = document.getElementById("task-list-container");
        var listItem = document.createElement("div");

        listItem.innerHTML = '<div class="task-list-item "><i class="icon icon-check"></i>' + element.title + '</div>';

        tasksContainer.appendChild(listItem);
    });

});

function addTask() {
    console.log("Add task");

    var tasksContainer = document.getElementById("tasks-container");
    tasksContainer.className = "col-7";

    var addTaskContainer = document.getElementById("add-task-container");
    addTaskContainer.style.display = 'block';
}

function saveTask() {
    event.preventDefault();
}

function closeAddTask() {
    var addTaskContainer = document.getElementById("add-task-container");
    addTaskContainer.style.display = 'none';

    var tasksContainer = document.getElementById("tasks-container");
    tasksContainer.className = "col-8 offset-col-2";
}