// Get DOM elements
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Function to add a new task item
function addTask(text) {
    // Create <li> element
    const li = document.createElement("li");
    li.className = "list-group-item custom-item d-flex justify-content-between align-items-center p-3 shadow-sm rounded-3";

    // Create left side container (icon + text)
    const leftDiv = document.createElement("div");
    leftDiv.className = "d-flex align-items-center gap-2";

    // Create task icon (empty circle)
    const icon = document.createElement("i");
    icon.className = "bi bi-circle";
    leftDiv.appendChild(icon);

    // Create task text
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = text;
    leftDiv.appendChild(span);

    li.appendChild(leftDiv);

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm custom-btn";
    deleteBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
    deleteBtn.addEventListener("click", () => deleteTask(li)); // Attach delete handler

    li.appendChild(deleteBtn);

    // Attach click handler to mark task as completed
    leftDiv.addEventListener("click", () => toggleTaskCompleted(li));

    // Add the task to the list
    taskList.appendChild(li);
}

// Function to delete a task item
function deleteTask(li) {
    li.remove(); // Simply remove the <li> from DOM
}

// Function to toggle task completion
function toggleTaskCompleted(li) {
    const icon = li.querySelector("i");                 // Find the task icon
    const isCompleted = li.classList.toggle("checked"); // Toggle "checked" class

    // Change icon based on completion status
    icon.className = isCompleted ? "bi bi-check-circle" : "bi bi-circle";
} 

// Handle form submission
function handleTaskFormSubmit(event) {
    event.preventDefault();               // Prevent page reload
    const text = taskInput.value.trim();  // Trim input
    if (text !== "") {
        addTask(text);                    // Add new task
        taskInput.value = "";             // Clear input
        taskInput.focus();                // Focus input
    }
}

// Attach form submit event
taskForm.addEventListener("submit", handleTaskFormSubmit);

// Attach event handlers for existing tasks in the HTML
document.querySelectorAll("#taskList .custom-item").forEach(li => {
    li.querySelector("div").addEventListener("click", () => toggleTaskCompleted(li));
    li.querySelector(".custom-btn").addEventListener("click", () => deleteTask(li));
});
