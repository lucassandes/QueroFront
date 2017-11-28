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


//BOTH OF THIS WORKS -- PICK THE MOST ELEGANT ONE
var $ = document.getElementById.bind(document);
//function $(id) { return document.getElementById(id); }



document.addEventListener("DOMContentLoaded", event => {
    console.log("DOM fully loaded and parsed");
    tasks.forEach(element => {
        var listItem = document.createElement("div");
        listItem.innerHTML = '<div class="task-list-item "><i class="icon icon-check"></i>' + element.title + '</div>';

        $("task-list-container").appendChild(listItem);
    });

});

function addTask() {
    console.log("Add task");
    $('tasks-container').className = "col-7";
    $("add-task-container").style.display = 'block';

}

function saveTask() {
    event.preventDefault();
}

function closeAddTask() {
    $("add-task-container").style.display = 'none';
    $("tasks-container").className = "col-8 offset-col-2";
}