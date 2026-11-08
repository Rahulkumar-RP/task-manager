import { useEffect, useState } from "react";
import TaskList from "./components/TaskList.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/tasks.json");

        if (!response.ok) {
          throw new Error("Failed to load tasks");
        }

        const data = await response.json();

        setTasks(data);
      } catch (error) {
        setError("Unable to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, [retryCount]);

  const tasksLeft = tasks.filter((task) => !task.completed).length;

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <p className="app-label">PRODUCTIVITY</p>
          <h1>Task Manager</h1>
          <p className="subtitle">Organize your work and stay productive.</p>
        </div>

        <div className="task-counter">
          <strong>{tasksLeft}</strong>
          <span>Tasks left</span>
        </div>
      </header>

      <main>
        <div className="section-heading">
          <h2>My Tasks</h2>
          <span>{tasks.length} total tasks</span>
        </div>

        {loading && <div className="message">Loading your tasks...</div>}

        {!loading && error && (
          <div className="error-message">
            <p>{error}</p>

            <button onClick={() => setRetryCount(retryCount + 1)}>Retry</button>
          </div>
        )}

        {!loading && !error && tasks.length > 0 && <TaskList tasks={tasks} />}

        {!loading && !error && tasks.length === 0 && (
          <div className="message">No tasks available.</div>
        )}
      </main>
    </div>
  );
}

export default App;
