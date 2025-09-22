/**
 * Storage Management Module:
 * Handles saving data to and retrieving data from local storage
 */

import { initialTasks, allTasks } from "./initialData.js";

/**
 * Saves array to local storage
 */
export function saveTasksToStorage() {
  let allTasksJSON = JSON.stringify(allTasks);
  localStorage.setItem("allTasks", allTasksJSON);
}

/**
 *  Retrieves tasks from local storage, empties allTasks array and repopulates it with tasks from storage
 * @returns allTasks array, populated with data from storage
 */
export function retrieveTasksFromStorage() {
  let savedTasks = localStorage.getItem("allTasks");

  // Runs if no tasks are saved in local storage, gets data from initialTasks
  if (!savedTasks) {
    initialTasks.forEach((task) => {
      allTasks.push(task);
    });
    saveTasksToStorage();
    return allTasks;
  }

  try {
    let parsedTasks = JSON.parse(savedTasks);
    allTasks.length = 0;
    parsedTasks.forEach((task) => {
      allTasks.push(task);
    });
  } catch (error) {
    console.error("Error parsing JSON", error);
  }

  return allTasks;
}
