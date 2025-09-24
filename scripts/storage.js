/**
 * Storage Management Module:
 * Handles saving data to and retrieving data from local storage
 */

import { allTasks, fetchInitialData } from "./initialData.js";

/**
 * Saves array to local storage
 */
export function saveTasksToStorage() {
  let allTasksJSON = JSON.stringify(allTasks);
  localStorage.setItem("allTasks", allTasksJSON);
}

/**
 *  Retrieves tasks from local storage and populates allTasks array with tasks from storage
 * @returns allTasks array, populated with data from storage
 */
export async function retrieveTasksFromStorage() {
  let savedTasks = localStorage.getItem("allTasks");

  // Runs if no tasks are saved in local storage, fetches data from API
  if (!savedTasks) {
    const initialData = await fetchInitialData()
    initialData.forEach((task) => {
      allTasks.push(task);
    });
    saveTasksToStorage();
    return allTasks;
  }

  // Runs if there are tasks stored
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
