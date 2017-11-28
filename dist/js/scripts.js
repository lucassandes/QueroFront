//Basic starter info
var tasks = [
    {
        id: 1,
        title: "Work it harder",
        description: "Work it harder description"
    }, {
        id: 2,
        title: "Make it better",
        description: "Make it better description"
    }

];

//loads starter info
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
    var listItem = document.createElement("div");
    //listItem.id = "task-" + index;
    listItem.id = "task-" + index;
    listItem.onclick = function () {
        editTask(element.title, element.description, index);
    };
    //listItem.onclick = "teste()";
    listItem.className = "task-list-item";
    listItem.innerHTML = '<i class="icon icon-check" ></i>' + element.title;

    $("task-list-container").appendChild(listItem);
}

function renderTaskList(task) {
    // If a task is give, its only an update. Otherwise we need to render the whole
    // list
    if (task) {
        addTaskItem(task, tasks.length);
    } else {
        tasks.forEach((element, index) => {
            addTaskItem(element, index + 1);
            console.log(index);
        });
    }
}


var titleBinded;
function editTask(title, description, index) {

    console.log("Edit task");
    $('tasks-container').className = "col-7";
    $("add-task-container").style.display = 'block';
    $("task-title").value = title;
    $("task-desc").value = description;


    var inp = $("task-title");
    var tex = $("task-" + index);

    // listener
    inp.addEventListener('keyup', doChange);

    // action
    function doChange() {
        tex.innerText = inp.value;
    }
    
    //titleBinded = $("task-title").addEventListener('keyup', doChange(index));
}



// action
function doChange(index) {

    $("task-" + index).innerText = titleBinded.value;
}

function addTask() {
    console.log("Add task");
    $('tasks-container').className = "col-7";
    $("add-task-container").style.display = 'block';

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
    $("tasks-container").className = "col-8 offset-col-2";

}