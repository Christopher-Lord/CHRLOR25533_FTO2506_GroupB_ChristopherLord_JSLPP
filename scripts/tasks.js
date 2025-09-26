/**
 * Task Management Module:
 * Handles task creation/ deletion
 * Handles sorting of tasks into correct containers
 * Handles rendering of tasks onto the webpage
 */

// Importing necessary functions and variables from other modules
import { displayTaskModal } from "./modals.js";
import { allTasks } from "./initialData.js";
import { retrieveTasksFromStorage, saveTasksToStorage } from "./storage.js";

// Exporting variables to be used elsewhere
export const titleInput = document.getElementById("add-task-title");
export const descriptionInput = document.getElementById("add-task-description");
export const statusInput = document.getElementById("add-task-status");
export const priorityInput = document.getElementById("add-task-priority");

const loadingMsg = document.getElementById("loading-container");

/**
 * Gets the correct container for each task by status
 * @param {string} status - The status value of each task
 * @returns The correct HTML container for each task
 */
export function getTaskContainerByStatus(status) {
  return document.getElementById(`${status}-tasks-container`);
}

/**
 * Updates task counts depending on how many tasks are in each column
 */
export function updateTaskCounts() {
  let todoCount = 0;
  let doingCount = 0;
  let doneCount = 0;

  allTasks.forEach((task) => {
    switch (task.status) {
      case "todo":
        todoCount++;
        break;
      case "doing":
        doingCount++;
        break;
      case "done":
        doneCount++;
        break;
    }
  });

  const todoCountElement = document.getElementById("todo-count");
  const doingCountElement = document.getElementById("doing-count");
  const doneCountElement = document.getElementById("done-count");

  if (todoCountElement) {
    todoCountElement.textContent = todoCount;
  }
  if (doingCountElement) {
    doingCountElement.textContent = doingCount;
  }
  if (doneCountElement) {
    doneCountElement.textContent = doneCount;
  }
}

/**
 * Clears any existing HTML elements within each task container
 */
export function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Creates a new task object based on values input by the user
 * @returns The full task object created
 */
export function getNewTask() {
  let newTask = {};

  newTask.id = allTasks.length + 1;
  newTask.title = titleInput.value;
  newTask.description = descriptionInput.value;
  newTask.status = statusInput.value;
  newTask.priority = priorityInput.value;

  return newTask;
}

/**
 * Pushes new task object to the allTasks array and then saves to local storage
 * @param {Object} task - New task object to add
 */
export function addTask(task) {
  allTasks.push(task);
  saveTasksToStorage();
  updateTaskCounts();
}

/**
 * Creates a new div element, populates it with task information and adds correct styling
 * @param {object} task - Each task in the array
 * @returns New, populated, div element
 */
export function createTaskElement(task) {
  const newDiv = document.createElement("div");

  // Adding the task title and priority indicator to the div
  newDiv.innerHTML = `${task.title}<span class="priority-icon">${showPriorityIndicator(task.priority)}</span>`;

  newDiv.dataset.taskId = task.id;
  newDiv.classList.add("task-div");

  newDiv.addEventListener("click", function () {
    displayTaskModal(task);
  });

  return newDiv;
}

/**
 * Assigns each task to its respective container based on status
 * @param {object} task Each task in the array
 */
export function assignTasks(task) {
  const tasksContainer = getTaskContainerByStatus(task.status);
  const taskDiv = createTaskElement(task);

  if (tasksContainer) {
    tasksContainer.appendChild(taskDiv);
  }
}

/**
 * Finds the task ID of the currently selected task and removes that task
 * @param {object} task Currently selected task
 */
export function deleteTask(task) {
  const indexToRemove = allTasks.findIndex((t) => t.id === task.id);

  if (indexToRemove !== -1) {
    allTasks.splice(indexToRemove, 1);
    saveTasksToStorage();
    updateTaskCounts();
  } else {
    console.error("Task to delete not found");
  }
}

/**
 * Finds the currently selected task, removes the old version and replaces it with the edited version
 * @param {Object} task - Selected task object to edit
 */
export function editTask(task) {
  const indexToEdit = allTasks.findIndex((t) => t.id === task.id);

  if (indexToEdit !== -1) {
    allTasks.splice(indexToEdit, 1, task);
    assignTasks(task);
    saveTasksToStorage();
    updateTaskCounts();
  } else {
    console.error("Task to edit not found");
  }
}

/**
 * Finds the tasks priority level and returns the corresponding indicator
 * @param {String} priority - Value of "priority" task object key
 * @returns Corresponding priority indicator
 */
export function showPriorityIndicator(priority) {
  switch (priority) {
    case "low":
      return "🟢";
    case "medium":
      return "🟠";
    case "high":
      return "🔴";
  }
}

/**
 * Filters out tasks into their own arrays based on priority, then returns an array of all tasks in correct order
 * @param {Object} tasks - Task object
 * @returns Array of tasks in order from highest to lowest priority
 */
export function sortTasksByPriority(tasks) {
  const highTasks = tasks.filter((task) => task.priority === "high");
  const medTasks = tasks.filter((task) => task.priority === "medium");
  const lowTasks = tasks.filter((task) => task.priority === "low");

  return [...highTasks, ...medTasks, ...lowTasks];
}

/**
 * Sets the task loading message to visible
 */
export function showLoadMsg() {
  loadingMsg.classList.add("visible");
}

/**
 * Retrieves all tasks from storage, clears existing tasks, then displays the tasks on the web page
 */
export async function renderTasks() {
  // Loading message shows while API data is being fetched
  showLoadMsg();

  try {
    const tasks = await retrieveTasksFromStorage();
    loadingMsg.classList.remove("visible");

    // If tasks don't have a priority value, gives them default value 'low'
    tasks.forEach((task) => {
      if (!task.priority) {
        task.priority = "low";
      }
    });

    // Sorting the tasks based on priority
    const sortedTasks = sortTasksByPriority(tasks);

    clearExistingTasks();

    sortedTasks.forEach(assignTasks);
    updateTaskCounts();
  } catch (error) {
    const loadingMsgText = document.getElementById("loading-msg");
    loadingMsgText.innerHTML = `Error Loading Tasks 🚩\n${error}`;
    console.error(`Error Loading Tasks 🚩\n${error}`);
  }
}
