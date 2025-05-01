let input = document.querySelector(".input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

let tasksArray = [];

if (localStorage.getItem("tasks")) {
  tasksArray = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLK();

add.onclick = function () {
  if (input.value !== "") {
    addTask(input.value);
    input.value = "";
  }
};

//delete
tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();

    deleteTask(e.target.parentElement.getAttribute("data-id"));
  }

  if (e.target.classList.contains("task")) {
    toggleStatus(e.target.getAttribute("data-id"));

    e.target.classList.toggle("done");
  }
});

function addTask(taskText) {
  const task = {
    title: taskText,
    id: Date.now(),
    completed: false,
  };
  tasksArray.push(task);
  addElementsToPage(tasksArray);

  addDataToLS(tasksArray);
}

function addElementsToPage(tasksArray) {
  tasks.innerHTML = "";

  tasksArray.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";

    if (task.completed === true) {
      div.className = "task done";
    }

    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("delete"));
    div.appendChild(span);

    tasks.appendChild(div);
  });
}

function addDataToLS(tasksArray) {
  window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function getDataFromLK() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPage(tasks);
  }
}

function deleteTask(taskId) {
  tasksArray = tasksArray.filter((task) => task.id != taskId);
  addDataToLS(tasksArray);
}

function toggleStatus(taskId) {
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id == taskId) {
      tasksArray[i].completed == false
        ? (tasksArray[i].completed = true)
        : tasksArray[i].completed == false;
    }
  }
  addDataToLS(tasksArray);
}
