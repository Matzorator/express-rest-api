// API Base URL - Für GitHub Pages anpassen!
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api" // Lokale Entwicklung
    : "https://DEIN-USERNAME.github.io/express-rest-api/api"; // GitHub Pages (anpassen!)

// State Management
let tasks = [];
let currentFilter = "all";

// DOM Elements
const taskForm = document.getElementById("taskForm");
const editTaskForm = document.getElementById("editTaskForm");
const tasksList = document.getElementById("tasksList");
const emptyState = document.getElementById("emptyState");
const loadingSpinner = document.getElementById("loadingSpinner");
const editModal = document.getElementById("editModal");
const filterButtons = document.querySelectorAll(".filter-btn");

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
  taskForm.addEventListener("submit", handleCreateTask);
  editTaskForm.addEventListener("submit", handleUpdateTask);

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      currentFilter = e.target.dataset.filter;
      filterButtons.forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      renderTasks();
    });
  });
}

// API Functions
async function loadTasks() {
  try {
    showLoading(true);
    const response = await fetch(`${API_URL}/tasks`);

    if (!response.ok) {
      throw new Error("Fehler beim Laden der Aufgaben");
    }

    const data = await response.json();
    tasks = data.data || [];
    renderTasks();
    updateStats();
    showToast("Aufgaben erfolgreich geladen", "success");
  } catch (error) {
    console.error("Error loading tasks:", error);
    showToast("Fehler beim Laden der Aufgaben: " + error.message, "error");
  } finally {
    showLoading(false);
  }
}

async function handleCreateTask(e) {
  e.preventDefault();

  const formData = new FormData(taskForm);
  const taskData = {
    title: formData.get("title").trim(),
    description: formData.get("description").trim(),
    completed: false,
  };

  if (!taskData.title || !taskData.description) {
    showToast("Bitte fülle alle Felder aus", "error");
    return;
  }

  try {
    showLoading(true);
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Fehler beim Erstellen der Aufgabe");
    }

    const result = await response.json();
    tasks.push(result.data);
    renderTasks();
    updateStats();
    taskForm.reset();
    showToast("✅ Aufgabe erfolgreich erstellt!", "success");
  } catch (error) {
    console.error("Error creating task:", error);
    showToast("Fehler: " + error.message, "error");
  } finally {
    showLoading(false);
  }
}

async function toggleTaskComplete(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  try {
    showLoading(true);
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !task.completed,
      }),
    });

    if (!response.ok) {
      throw new Error("Fehler beim Aktualisieren der Aufgabe");
    }

    const result = await response.json();
    const index = tasks.findIndex((t) => t.id === taskId);
    tasks[index] = result.data;
    renderTasks();
    updateStats();
    showToast(
      result.data.completed
        ? "✅ Aufgabe als erledigt markiert"
        : "🔄 Aufgabe als offen markiert",
      "success"
    );
  } catch (error) {
    console.error("Error toggling task:", error);
    showToast("Fehler: " + error.message, "error");
  } finally {
    showLoading(false);
  }
}

async function deleteTask(taskId) {
  if (!confirm("Möchtest du diese Aufgabe wirklich löschen?")) {
    return;
  }

  try {
    showLoading(true);
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Fehler beim Löschen der Aufgabe");
    }

    tasks = tasks.filter((t) => t.id !== taskId);
    renderTasks();
    updateStats();
    showToast("🗑️ Aufgabe erfolgreich gelöscht", "success");
  } catch (error) {
    console.error("Error deleting task:", error);
    showToast("Fehler: " + error.message, "error");
  } finally {
    showLoading(false);
  }
}

function openEditModal(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  document.getElementById("editTaskId").value = task.id;
  document.getElementById("editTaskTitle").value = task.title;
  document.getElementById("editTaskDescription").value = task.description;
  document.getElementById("editTaskCompleted").checked = task.completed;

  editModal.classList.add("active");
}

function closeEditModal() {
  editModal.classList.remove("active");
  editTaskForm.reset();
}

async function handleUpdateTask(e) {
  e.preventDefault();

  const taskId = document.getElementById("editTaskId").value;
  const formData = new FormData(editTaskForm);

  const taskData = {
    title: formData.get("title").trim(),
    description: formData.get("description").trim(),
    completed: document.getElementById("editTaskCompleted").checked,
  };

  if (!taskData.title || !taskData.description) {
    showToast("Bitte fülle alle Felder aus", "error");
    return;
  }

  try {
    showLoading(true);
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Fehler beim Aktualisieren der Aufgabe");
    }

    const result = await response.json();
    const index = tasks.findIndex((t) => t.id === taskId);
    tasks[index] = result.data;
    renderTasks();
    updateStats();
    closeEditModal();
    showToast("💾 Aufgabe erfolgreich aktualisiert!", "success");
  } catch (error) {
    console.error("Error updating task:", error);
    showToast("Fehler: " + error.message, "error");
  } finally {
    showLoading(false);
  }
}

// Render Functions
function renderTasks() {
  tasksList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter((t) => t.completed);
  } else if (currentFilter === "pending") {
    filteredTasks = tasks.filter((t) => !t.completed);
  }

  if (filteredTasks.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  filteredTasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    tasksList.appendChild(taskElement);
  });
}

function createTaskElement(task) {
  const div = document.createElement("div");
  div.className = `task-item ${task.completed ? "completed" : ""}`;

  const createdDate = new Date(task.createdAt).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const updatedDate = new Date(task.updatedAt).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  div.innerHTML = `
        <div class="task-header">
            <div>
                <div class="task-title">${escapeHtml(task.title)}</div>
                <span class="task-status ${
                  task.completed ? "completed" : "pending"
                }">
                    ${task.completed ? "✓ Erledigt" : "○ Offen"}
                </span>
            </div>
        </div>
        <div class="task-description">${escapeHtml(task.description)}</div>
        <div class="task-meta">
            <span>📅 Erstellt: ${createdDate}</span>
            <span>🔄 Aktualisiert: ${updatedDate}</span>
        </div>
        <div class="task-actions">
            <button class="btn btn-success" onclick="toggleTaskComplete('${
              task.id
            }')">
                ${task.completed ? "↩️ Wiederherstellen" : "✓ Erledigt"}
            </button>
            <button class="btn btn-primary" onclick="openEditModal('${
              task.id
            }')">
                ✏️ Bearbeiten
            </button>
            <button class="btn btn-danger" onclick="deleteTask('${task.id}')">
                🗑️ Löschen
            </button>
        </div>
    `;

  return div;
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  document.getElementById("totalTasks").textContent = total;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("pendingTasks").textContent = pending;
}

// UI Helper Functions
function showLoading(show) {
  if (show) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icons = {
    success: "✓",
    error: "✗",
    info: "ℹ",
  };

  toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
    `;

  const container = document.getElementById("toastContainer");
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideIn 0.3s ease-out reverse";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Close modal when clicking outside
editModal.addEventListener("click", (e) => {
  if (e.target === editModal) {
    closeEditModal();
  }
});
