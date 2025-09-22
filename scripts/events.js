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
} from "./modals.js";
import {
  getNewTask,
  renderTasks,
  deleteTask,
  titleInput,
  descriptionInput,
  addTask,
} from "./tasks.js";
import { saveTasksToStorage } from "./storage.js";

// Button variables
const newTaskBtn = document.getElementById("add-task-btn");
const deleteTaskBtn = document.getElementById("delete-task-btn");
const modalCloseBtn = document.querySelectorAll(".task-modal-close-btn");

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
  deleteTask(selectedTask);
  saveTasksToStorage();
  renderTasks();
  closeModals();
});
