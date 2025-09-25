/**
 * Main script - calls other modules
 */

// Import all events and main task function
import "./events.js";
import { retrieveTheme } from "./storage.js";
import { renderTasks } from "./tasks.js";

// Only runs renderTasks once the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  retrieveTheme();
  renderTasks();
});
