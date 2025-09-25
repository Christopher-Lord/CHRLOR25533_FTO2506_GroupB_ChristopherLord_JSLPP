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
  displayMobileSidebar,
  taskPriority,
  updateLogos,
  mobileLogo,
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
const modalCloseBtn = document.querySelectorAll(".modal-close-btn");
const deleteConfirmBtn = document.getElementById("confirm-btn");
const deleteCancelBtn = document.getElementById("cancel-btn");
const hideSidebarBtn = document.getElementById("board-hide-btn");
const showSidebarBtn = document.getElementById("board-show-btn");
export const modeToggleBtn = document.getElementById("mode-toggle");

const sidebarDiv = document.getElementById("side-bar-div");

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

// Clicking the delete button shows the delete confirmation modal
deleteTaskBtn.addEventListener("click", function () {
  displayConfirmModal();
});

// Hides the confirmation modal when cancel is clicked
deleteCancelBtn.addEventListener("click", function () {
  deleteConfirmModal.classList.remove("visible");
});

// When 'Yes' is clicked, deletes the currently selected task and re-renders all tasks
deleteConfirmBtn.addEventListener("click", function () {
  deleteTask(selectedTask);
  renderTasks();
  closeModals();
});

// Saves edited task information when save changes is clicked
editTaskBtn.addEventListener("click", function () {
  selectedTask.title = taskTitle.value;
  selectedTask.description = taskDescription.value;
  selectedTask.status = taskStatus.value;
  selectedTask.priority = taskPriority.value;

  editTask(selectedTask);
  renderTasks();
  closeModals();
});

// Event to hide sidebar, and show 'show sidebar' button when clicked
hideSidebarBtn.addEventListener("click", function () {
  sidebarDiv.classList.add("hidden");
  showSidebarBtn.classList.add("visible");
});

// Hides 'show sidebar' button and makes the sidebar visible again
showSidebarBtn.addEventListener("click", function () {
  sidebarDiv.classList.remove("hidden");
  showSidebarBtn.classList.remove("visible");
});

// Toggles between light/dark mode themes and switches logo images to match theme
modeToggleBtn.addEventListener("click", function () {
  const html = document.documentElement;
  html.classList.toggle("dark-mode");

  const isDarkMode = html.classList.contains("dark-mode");

  updateLogos(isDarkMode);

  if (isDarkMode) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});

// Shows the mobile sidebar when the logo is clicked in mobile view
mobileLogo.addEventListener("click", function () {
  displayMobileSidebar();
});
