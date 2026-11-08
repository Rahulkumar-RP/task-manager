import TaskItem from './TaskItem.jsx';

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-illustration" aria-hidden="true">✓</div>
        <h3>Nothing here for now</h3>
        <p>Try another filter or add a new task to your list.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          isOverdue={
            !task.completed &&
            task.dueDate !== null &&
            task.dueDate < getTodayDate()
          }
        />
      ))}
    </div>
  );
}

export default TaskList;
