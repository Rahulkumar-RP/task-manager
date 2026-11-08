import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskFilters from "./components/TaskFilters.jsx";
import TaskList from "./components/TaskList.jsx";

const STORAGE_KEY = "taskflow-tasks";

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");

  async function loadTasks() {
    setIsLoading(true);
    setLoadError("");

    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);

      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      } else {
        const response = await fetch("/tasks.json");
        if (!response.ok) {
          throw new Error(
            "Could not load the starter tasks. Please try again.",
          );
        }
        const starterTasks = await response.json();
        setTasks(starterTasks);
      }
    } catch (error) {
      setLoadError(
        error.message || "Something went wrong while loading tasks.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (!isLoading && !loadError) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoading, loadError]);

  function addTask(newTask) {
    const task = {
      id: Date.now(),
      title: newTask.title,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      completed: false,
    };
    setTasks((currentTasks) => [task, ...currentTasks]);
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function editTask(taskId, newTitle) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task,
      ),
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  let visibleTasks = tasks.filter((task) => {
    if (activeFilter === "Active" && task.completed) return false;
    if (activeFilter === "Completed" && !task.completed) return false;
    return task.title.toLowerCase().includes(searchText.toLowerCase());
  });

  visibleTasks = [...visibleTasks].sort((firstTask, secondTask) => {
    if (sortBy === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return (
        priorityOrder[firstTask.priority] - priorityOrder[secondTask.priority]
      );
    }

    if (!firstTask.dueDate && !secondTask.dueDate) return 0;
    if (!firstTask.dueDate) return 1;
    if (!secondTask.dueDate) return -1;
    return firstTask.dueDate.localeCompare(secondTask.dueDate);
  });

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const overdueCount = tasks.filter(
    (task) => !task.completed && task.dueDate && task.dueDate < getTodayDate(),
  ).length;

  if (isLoading) {
    return (
      <main className="state-page">
        <div className="loading-card">
          <div className="loader" />
          <h2>Getting things ready</h2>
          <p>Loading your tasks...</p>
        </div>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="state-page">
        <div className="loading-card error-card">
          <div className="error-symbol">!</div>
          <h2>We couldn't load your tasks</h2>
          <p>{loadError}</p>
          <button className="primary-button" type="button" onClick={loadTasks}>
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="TaskFlow home">
          <span className="brand-mark">✓</span>
          <span>
            task<span>flow</span>
          </span>
        </a>
        <div className="topbar-right">
          <span className="today-label">YOUR PERSONAL WORKSPACE</span>
          <span className="avatar">R</span>
        </div>
      </header>

      <main className="page-content" id="top">
        <section className="welcome-section">
          <div>
            <p className="eyebrow">MONDAY MOTIVATION, EVERY DAY</p>
            <h1>
              Make room for <span>great work.</span>
            </h1>
            <p className="welcome-copy">
              A clear mind starts with a clear plan. Let's get things done.
            </p>
          </div>
          <div className="welcome-decoration" aria-hidden="true">
            <div className="deco-circle deco-one" />
            <div className="deco-circle deco-two" />
            <span>✦</span>
          </div>
        </section>

        <section className="stats-grid" aria-label="Task summary">
          <div className="stat-card">
            <span className="stat-icon total-icon">▤</span>
            <div>
              <p>Total tasks</p>
              <strong>{tasks.length}</strong>
            </div>
            <span className="stat-note">in your list</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon active-icon">◷</span>
            <div>
              <p>In progress</p>
              <strong>{activeCount}</strong>
            </div>
            <span className="stat-note">left to do</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon done-icon">✓</span>
            <div>
              <p>Completed</p>
              <strong>{completedCount}</strong>
            </div>
            <span className="stat-note">great work!</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon overdue-icon">!</span>
            <div>
              <p>Overdue</p>
              <strong>{overdueCount}</strong>
            </div>
            <span className="stat-note">needs attention</span>
          </div>
        </section>

        <section className="workspace-grid">
          <div className="list-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">YOUR DAY, ORGANIZED</p>
                <h2>
                  My tasks <span className="heading-count">{tasks.length}</span>
                </h2>
              </div>
              <span className="heading-subtitle">
                Small steps. Big progress.
              </span>
            </div>

            <TaskFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              searchText={searchText}
              onSearchChange={setSearchText}
              sortBy={sortBy}
              onSortChange={setSortBy}
              activeCount={activeCount}
            />

            <TaskList
              tasks={visibleTasks}
              onToggle={toggleTask}
              onEdit={editTask}
              onDelete={deleteTask}
            />
          </div>

          <aside className="sidebar">
            <TaskForm onAddTask={addTask} />
            <div className="tip-card">
              <div className="tip-icon">✦</div>
              <div>
                <h3>A little reminder</h3>
                <p>
                  You don't have to do it all at once. Just start with one task.
                </p>
              </div>
            </div>
          </aside>
        </section>

        <footer className="footer">
          <span>
            Made by Rahul kumar palai <span aria-hidden="true">✦</span>
          </span>
          <span>TaskFlow © 2026</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
