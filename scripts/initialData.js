const API_URL = "https://jsl-kanban-api.vercel.app/";

export async function fetchInitialData() {
  // Empty initial tasks array
  let initialTasks;

  if (initialTasks) {
    return initialTasks;
  }

  try {
    const response = await fetch(API_URL);
    initialTasks = await response.json();
    return initialTasks;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Empty array for holding all of the stored tasks
export const allTasks = [];
