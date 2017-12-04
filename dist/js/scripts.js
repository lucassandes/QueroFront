"use strict";

//Dummy data is used in case there's nothing on localStorage
var dummyData = [
    {
        title: "We're no strangers to love",
        description: ""
    }, {
        title: "You know the rules and so do I",
        description: "Lorem Ipstum dolor semec."
    }, {
        title: "A full commitments what I´m thinking of",
        description: "Standing in line to see the show tonight."
    }, {
        title: "You wouldn´t get this from any other guy",
        description: "Comfortably numb"
    }, {
        title: "A full commitments what I´m thinking of",
        description: "Integer ut orci tortor. Pellentesque eget enim sit amet orci vehicula rhoncus."
    }, {
        title: "Gotta make you understand",
        description: "Never gonna give you up  Never gonna let you down  Never gonna run around and de" +
                "sert you"
    }
];

var State = function () {
    this.tasks = [];
    this.selectedTask = {};
};

//simple utility to use $ instead of getElementById all the time
var $ = document
    .getElementById
    .bind(document);

var $state = new State();
dealWithLocalStorage();

//Rendering task list after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", event => {
    console.log("DOM fully loaded and parsed");
    renderTaskList();
});

// Check if there's data saved in localStorage. If so, use it. otherwise use
// Dummy Data.
function dealWithLocalStorage() {
    if (!localStorage.getItem("task-list-size")) {
        // Use dummy data and save it in localStorage
        $state.tasks = dummyData;
        console.log("There's nothing stored at localStorage. Using dummy data...");
        populateStorage($state.tasks);

    } else {
        //use LocalStorage. Load it and save it to $state
        var i = 0;
        console.log("Getting data from localStorage...");
        for (i = 0; i < localStorage.getItem("task-list-size"); i++) {
            var task = JSON.parse(localStorage.getItem("task-" + i ));
            $state
                .tasks
                .push(task);

        }

    }
}

function removeFromStorage(taskId) {
    localStorage.removeItem("task-title-" + taskId);
    localStorage.removeItem("task-description-" + taskId);
    localStorage.clear();
    populateStorage($state.tasks);

}

function populateStorage(tasks) {
    console.log("Updating LocalStorage...");
    localStorage.setItem("task-list-size", tasks.length);

    tasks.forEach((element, index) => {
        var task = {
            title: element.title,
            description: element.description
        }
        localStorage.setItem("task-" + index, JSON.stringify(task));
       
    });
}

function addTaskItem(element, index) {

    //creating DOM element
    var listItem = document.createElement("div");

    //Atributting an unique ID
    listItem.id = "task-" + index;

    //Building the inner HTML of the Element
    listItem.className = "task-list-item flex-center";
    listItem.innerHTML = '<i class="icon-check" onclick="removeTask(' + index + ')"></i><span id="task-title-' + index + '" class="task-list-title">' + element.title + '</span><span class="circle"></span>';

    listItem.childNodes[1].onclick = function () {
        editTask(element.title, element.description, index);
    };

    //Rendering-it to the DOM
    $("task-list-container").appendChild(listItem);
}

function removeTask(taskId) {

    console.log("Removing task...");

    //animations
    $("task-" + taskId)
        .classList
        .add("animated", "fadeOutRight");

    $("add-task-container")
        .classList
        .add("animated", "fadeOutRight");

    setTimeout(function () {
        renderTaskList();
        closeEditor();

        //removing animation from editor
        $("add-task-container")
            .classList
            .remove("animated", "fadeOutRight");
    }, 1000);

    //removing task from $state
    $state
        .tasks
        .splice(taskId, 1);

    removeFromStorage(taskId);

    $state.selectedTask.title = "";
    $state.selectedTask.description = "";
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
    $('tasks-container').className = "col-7 full-height hidden-xs";
    $("add-task-container").style.display = "block";
}

function addSelectedClass() {
    removeClass("task-item-selected");

    $("task-" + $state.selectedTask.id)
        .classList
        .add("task-item-selected");
}
function removeClass(cl) {
    var allTasks = document.querySelectorAll('.task-list-item');
    allTasks.forEach(element => {
        element
            .classList
            .remove(cl);
    });
}

function editTask(title, description, index) {

    showEditor();

    //update Selected Task
    $state.selectedTask.title = title;
    $state.selectedTask.description = description;
    $state.selectedTask.id = index;

    addSelectedClass();

    //update editor DOM - input and textarea
    var DomTaskTitle = $("task-title");
    DomTaskTitle.value = $state.selectedTask.title;
    $("task-desc").value = $state.selectedTask.description;

}

function updateTaskTitle() {
    var DomTaskTitle = $("task-title");
    var taskId = $state.selectedTask.id;
    $state.tasks[taskId].title = DomTaskTitle.value;
    $state.selectedTask.title = DomTaskTitle.value;

    // Re-render the title of the task (in the task list - left panel) which is
    // being editted in the right panel
    var taskId = $state.selectedTask.id;
    $("task-title-" + taskId).innerHTML = $state.selectedTask.title;

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

    $state
        .tasks
        .push(element);

    renderTaskList(element);

    addSelectedClass();
    //update editor DOM
    var DomTaskTitle = $("task-title");
    DomTaskTitle.value = $state.selectedTask.title;
    $("task-desc").value = $state.selectedTask.description;

}

function saveTask(event) {
    event.preventDefault();
    populateStorage($state.tasks);
    console.log("Save task!");
}

function closeEditor() {
    $("add-task-container").style.display = 'none';
    $("tasks-container").className = "col-8 offset-col-2 full-height";
    removeClass("task-item-selected");
    populateStorage($state.tasks);
}

function hideCommentSection(){
    $("comment-section").classList.add("hidden-xs");
}

function showCommentSection(){
    $("comment-section").classList.remove("hidden-xs");
}