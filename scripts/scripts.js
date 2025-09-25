/**
 * Main script - calls other modules
 */

// Import all events and main task function
import "./events.js";
import { retrieveTheme } from "./storage.js";
import { renderTasks } from "./tasks.js";

// Once DOM is loaded, checks the theme and renders tasks
document.addEventListener("DOMContentLoaded", function () {
  retrieveTheme();
  renderTasks();
});
