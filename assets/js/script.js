var formEl = document.querySelector("#task-form");
formEl.addEventListener("submit", createTaskHandler);

function createTaskHandler(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']");
  var taskTypeInput = document.querySelector("#select-dropdown");
  var listEl = document.querySelector("#tasks-to-do");
  var newTaskEl = document.createElement("li");
  newTaskEl.className = "task-item";
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskNameInput.value +
    "</h3><span class='task-type'>" +
    taskTypeInput.value +
    "</span>";
  newTaskEl.appendChild(taskInfoEl);
  listEl.appendChild(newTaskEl);
}
