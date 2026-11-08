import { useEffect, useState } from "react";
import TaskList from "./components/TaskList.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [titleError, setTitleError] = useState("");

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
      } catch {
        setError("Unable to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, [retryCount]);

  const tasksLeft = tasks.filter((task) => !task.completed).length;

  function handleAddTask(event) {
    event.preventDefault();

    if (title.trim() === "") {
      setTitleError("Task title is required.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      priority: priority,
      dueDate: dueDate || null,
      completed: false,
    };

    setTasks((previousTasks) => [newTask, ...previousTasks]);

    // Reset form
    setTitle("");
    setPriority("Medium");
    setDueDate("");
    setTitleError("");
  }

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
        {!loading && !error && (
          <form className="add-task-form" onSubmit={handleAddTask}>
            <div className="form-group">
              <label htmlFor="taskTitle">Task Title</label>

              <input
                type="text"
                id="taskTitle"
                required
                placeholder="What needs to be done?"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setTitleError("");
                }}
              />

              {titleError && <p className="input-error">{titleError}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="taskPriority">Priority</label>

                <select
                  id="taskPriority"
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="taskDate">Due Date</label>

                <input
                  type="date"
                  id="taskDate"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="add-task-button">
              + Add Task
            </button>
          </form>
        )}
        <div className="section-heading">
          <h2>My Tasks</h2>
          <span>{tasks.length} total tasks</span>
        </div>

        {loading && <div className="message">Loading your tasks...</div>}

        {!loading && error && (
          <div className="error-message">
            <p>{error}</p>

            <button onClick={() => setRetryCount((count) => count + 1)}>
              Retry
            </button>
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
