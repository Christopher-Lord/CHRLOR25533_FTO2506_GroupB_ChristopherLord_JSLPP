/**
 * Main script - calls other modules
 */

// Import all events and main task function
import "./events.js";
import { renderTasks } from "./tasks.js";

// Only runs renderTasks once the DOM is loaded
document.addEventListener("DOMContentLoaded", renderTasks);
