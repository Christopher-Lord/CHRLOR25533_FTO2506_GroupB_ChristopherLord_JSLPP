/**
 * Storage Management Module:
 * Handles saving data to and retrieving data from local storage
 */

import { allTasks, fetchInitialData } from "./initialData.js";
import { updateLogos } from "./modals.js";
import { modeToggleBtn } from "./events.js";

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
    const initialData = await fetchInitialData();
    initialData.forEach((task) => {
      allTasks.push(task);
    });
    saveTasksToStorage();
    return allTasks;
  }

  // Runs if there are tasks stored
  try {
    let parsedTasks = JSON.parse(savedTasks);

    // Empties allTasks array and repopulates it with parsed data
    allTasks.length = 0;
    parsedTasks.forEach((task) => {
      allTasks.push(task);
    });
  } catch (error) {
    console.error("Error parsing JSON", error);
  }

  return allTasks;
}

/**
 * Checks local storage for dark mode status. If enabled, makes sure all elements are correct 
 */
export function retrieveTheme() {
  const savedTheme = localStorage.getItem("darkMode");

  if (savedTheme === "enabled") {
    document.documentElement.classList.add("dark-mode");

    updateLogos(true);

    // Making sure theme toggle is in the correct position
    modeToggleBtn.checked = true;
  }
}
