var formEl = document.querySelector("#task-form");
formEl.addEventListener("submit", taskFormHandler);
var taskIDCounter = 0;
var pageContentEl = document.querySelector("#page-content");
pageContentEl.addEventListener("click", taskButtonHandler);
var toDoEl = document.getElementById("tasks-to-do");
var inProgressEl = document.getElementById("tasks-in-progress");
var completedEl = document.getElementById("tasks-completed");
//var localStorageArray = [""];
//getTasksFromLocalStorage();

function taskFormHandler(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("#select-dropdown").value;
  if (!taskNameInput || !taskTypeInput) {
    alert("Please enter a task name and type!");
    return false;
  }
  var isEdit = formEl.hasAttribute("data-uniqueid");
  if (isEdit) {
    var taskID = formEl.getAttribute("data-uniqueid");
    completeEditTask(taskNameInput, taskTypeInput, taskID);
  } else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
    };
    formEl.reset();
    createTaskEl(taskDataObj);
  }
}

function completeEditTask(taskName, taskType, taskID) {
  var taskSelected = document.querySelector(
    `.task-item[data-uniqueid='${taskID}']`
  );
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;
  formEl.removeAttribute("data-uniqueid");
  formEl.reset();
  document.querySelector("#save-task").textContent = "Add Task";
  alert("Task Updated!");
}

function createTaskEl(taskDataObj) {
  var listEl = document.querySelector("#tasks-to-do");
  var newTaskEl = document.createElement("li");
  newTaskEl.className = "task-item";
  var taskID = newTaskEl.setAttribute(
    "data-uniqueid",
    taskIDCounter.toString()
  );
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";
  var actionContainerEl = createTaskActions(taskIDCounter);
  taskInfoEl.appendChild(actionContainerEl);
  newTaskEl.appendChild(taskInfoEl);
  listEl.appendChild(newTaskEl);
  /*localStorageArray[taskIDCounter] = localStorage.setItem(
    taskIDCounter.toString(),
    JSON.stringify(newTaskEl)
  );*/
  taskIDCounter++;
}

function createTaskActions(taskID) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-uniqueid", taskID.toString());
  actionContainerEl.appendChild(editButtonEl);
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-uniqueid", taskID.toString());
  actionContainerEl.appendChild(deleteButtonEl);
  var statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("data-uniqueid", taskID.toString());
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "select-change");
  actionContainerEl.appendChild(statusSelectEl);
  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    var optionEl = document.createElement("option");
    optionEl.textContent = statusChoices[i];
    optionEl.setAttribute("value", statusChoices[i]);
    statusSelectEl.appendChild(optionEl);
  }
  return actionContainerEl;
}

function taskButtonHandler(event) {
  var targetEl = event.target;
  if (event.target.matches(".delete-btn")) {
    var taskID = targetEl.getAttribute("data-uniqueid");
    deleteTask(taskID);
  } else if (targetEl.matches(".edit-btn")) {
    var taskID = targetEl.getAttribute("data-uniqueid");
    editTask(taskID);
  }
}

function deleteTask(taskID) {
  var taskSelected = document.querySelector(
    ".task-item[data-uniqueid='" + taskID + "']"
  );
  taskSelected.remove();
}

function editTask(taskID) {
  var taskSelected = document.querySelector(
    ".task-item[data-uniqueid='" + taskID + "']"
  );
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("#select-dropdown").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-uniqueid", taskID);
}

/*function getTasksFromLocalStorage() {
  for (i = 0; i < localStorageArray.length; i++) {
    localStorage.getItem(taskIDCounter.toString());
  }
}
*/

function taskStatusChangeHandler(e) {
  var taskID = e.target.getAttribute("data-uniqueid");
  var statusValue = e.target.value.toLowerCase();
  var taskSelected = document.querySelector(
    `.task-item[data-uniqueid='${taskID}']`
  );
  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    inProgressEl.appendChild(taskSelected);
  } else {
    completedEl.appendChild(taskSelected);
  }
}

pageContentEl.addEventListener("change", taskStatusChangeHandler);
