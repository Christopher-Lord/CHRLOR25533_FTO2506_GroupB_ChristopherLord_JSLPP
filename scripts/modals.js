/**
 * Modal Management Module:
 * Handles the display and closing of modals
 */

//Input Variables
export const taskTitle = document.getElementById("task-title");
export const taskDescription = document.getElementById("task-description");
export const taskStatus = document.getElementById("task-status");
export const taskPriority = document.getElementById("task-priority");

// Modal Variables
const taskModal = document.getElementById("task-modal-container");
export const newTaskModal = document.getElementById("add-task-modal-container");
export const newTaskForm = document.getElementById("add-task-form");
export const deleteConfirmModal = document.getElementById(
  "delete-confirm-container",
);
const mobileSidebar = document.getElementById("side-bar-div");
export const mobileSidebarBackdrop = document.getElementById("side-bar-backdrop");

// Error Messages
export const titleErrorMsg = document.getElementById("title-error-msg");
export const descriptionErrorMsg = document.getElementById(
  "description-error-msg",
);

// Logo variables
export const kanbanLogo = document.getElementById("logo");
export const mobileLogo = document.getElementById("logo-mobile");

// Empty Variable for storing the currently selected task
export let selectedTask;

/**
 * Displays the task modal and populates it with the correct task information, also stores the currently selected task info
 * @param {object} task Each task object in the array
 */
export function displayTaskModal(task) {
  selectedTask = task;

  // Fetches each input field and adds the correct task info to each
  taskTitle.textContent = task.title;
  taskDescription.textContent = task.description;
  taskStatus.value = task.status;
  taskPriority.value = task.priority;

  // Changes the modal style so it displays
  taskModal.classList.add("visible");
}

/**
 * Removes the 'visible' class from all modal related elements and resets the form
 */
export function closeModals() {
  taskModal.classList.remove("visible");
  newTaskModal.classList.remove("visible");
  mobileSidebar.classList.remove("show-sidebar");
  mobileSidebarBackdrop.classList.remove("show-sidebar");
  deleteConfirmModal.classList.remove("visible");

  newTaskForm.reset();

  titleErrorMsg.classList.remove("visible");
  descriptionErrorMsg.classList.remove("visible");
}

/**
 * Sets the delete confirmation modal to visible
 */
export function displayConfirmModal() {
  deleteConfirmModal.classList.add("visible");
}

/**
 * Sets the mobile sidebar to visible
 */
export function displayMobileSidebar() {
  mobileSidebar.classList.add("show-sidebar");
  mobileSidebarBackdrop.classList.add("show-sidebar");
}

/**
 * Checks if dark mode is enabled and switches the logos to match the theme
 * @param {boolean} isDarkMode - True or False value 
 */
export function updateLogos(isDarkMode) {
  if (isDarkMode) {
    kanbanLogo.setAttribute("src", "./assets/logo-dark.svg");
    mobileLogo.setAttribute("src", "./assets/favicon-clear.svg");
  } else {
    kanbanLogo.setAttribute("src", "./assets/logo-light.svg");
    mobileLogo.setAttribute("src", "./assets/favicon.svg");
  }
}
