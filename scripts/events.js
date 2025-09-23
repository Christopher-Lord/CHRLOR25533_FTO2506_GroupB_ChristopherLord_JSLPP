/**
 * Event Management Module:
 * Handles all event listeners
 */

// Importing necessary functions and variables
import {
  closeModals,
  selectedTask,
  newTaskModal,
  newTaskForm,
  titleErrorMsg,
  descriptionErrorMsg,
  taskTitle,
  taskDescription,
  taskStatus,
  displayConfirmModal,
  deleteConfirmModal,
} from "./modals.js";
import {
  getNewTask,
  renderTasks,
  deleteTask,
  titleInput,
  descriptionInput,
  addTask,
  editTask,
} from "./tasks.js";

// Button variables
const newTaskBtn = document.getElementById("add-task-btn");
const deleteTaskBtn = document.getElementById("delete-task-btn");
const editTaskBtn = document.getElementById("save-changes-btn");
const modalCloseBtn = document.querySelectorAll(".task-modal-close-btn");
const deleteConfirmBtn = document.getElementById("confirm-btn");
const deleteCancelBtn = document.getElementById("cancel-btn");
const hideSidebarBtn = document.getElementById("board-hide-btn");
const showSidebarBtn = document.getElementById("board-show-btn");
const modeToggleBtn = document.getElementById("mode-toggle");

const sidebarDiv = document.getElementById("side-bar-div");
const kanbanLogo = document.getElementById("logo");
const mobileLogo = document.getElementById("logo-mobile");

// Opens the Add New Task modal
newTaskBtn.addEventListener("click", function () {
  newTaskModal.classList.add("visible");
});

// Runs the closeModals function when the 'x' is clicked
modalCloseBtn.forEach((button) => {
  button.addEventListener("click", function () {
    closeModals();
  });
});

// Form submission event, gets user input, checks there are no empty inputs then adds the task
newTaskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newTask = getNewTask();

  // Form validation, no empty inputs are allowed
  if (newTask.title.trim() === "") {
    titleErrorMsg.textContent = "❗Please fill out this field.";
    titleErrorMsg.classList.add("visible");
    return;
  }
  if (newTask.description.trim() === "") {
    descriptionErrorMsg.textContent = "❗Please fill out this field.";
    descriptionErrorMsg.classList.add("visible");
    return;
  }

  addTask(newTask);

  // Re-renders all tasks and closes the form
  renderTasks();
  closeModals();
});

// Hides the error messages when the user starts to type in the input
titleInput.addEventListener("input", () => {
  titleErrorMsg.classList.remove("visible");
});

descriptionInput.addEventListener("input", () => {
  descriptionErrorMsg.classList.remove("visible");
});

// Deletes the currently selected task, saves the tasks to storage, then re-renders all tasks
deleteTaskBtn.addEventListener("click", function () {
  displayConfirmModal();
});

deleteCancelBtn.addEventListener("click", function () {
  deleteConfirmModal.classList.remove("visible");
});

deleteConfirmBtn.addEventListener("click", function () {
  deleteTask(selectedTask);
  renderTasks();
  closeModals();
});

editTaskBtn.addEventListener("click", function () {
  selectedTask.title = taskTitle.value;
  selectedTask.description = taskDescription.value;
  selectedTask.status = taskStatus.value;

  editTask(selectedTask);
  renderTasks();
  closeModals();
});

hideSidebarBtn.addEventListener("click", function () {
  sidebarDiv.classList.add("hidden");
  showSidebarBtn.classList.add("visible");
});

showSidebarBtn.addEventListener("click", function () {
  sidebarDiv.classList.remove("hidden");
  showSidebarBtn.classList.remove("visible");
});

modeToggleBtn.addEventListener("click", function () {
  const html = document.documentElement;
  html.classList.toggle("dark-mode");

  if (html.classList.contains("dark-mode")) {
    kanbanLogo.setAttribute("src", "./assets/logo-dark.svg");
    mobileLogo.setAttribute("src", "./assets/favicon-clear.svg");
  } else {
    kanbanLogo.setAttribute("src", "./assets/logo-light.svg");
    mobileLogo.setAttribute("src", "./assets/favicon.svg");
  }
});
