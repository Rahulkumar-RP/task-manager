
function TaskList({ tasks }) {
  function formatDate(date) {
    if (!date) {
      return "No due date";
    }

    return new Date(date + "T00:00:00").toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="task-card" key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            disabled
            aria-label={`Completed status for ${task.title}`}
          />

          <div className="task-details">
            <h3 className={task.completed ? "completed" : ""}>
              {task.title}
            </h3>

            <p>Due: {formatDate(task.dueDate)}</p>
          </div>

          <span
            className={`priority ${task.priority.toLowerCase()}`}
          >
            {task.priority}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
