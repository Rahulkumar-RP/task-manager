import { useState } from 'react';

function formatDate(dateString) {
  if (!dateString) return 'No due date';
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function TaskItem({ task, onToggle, onEdit, onDelete, isOverdue }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editError, setEditError] = useState('');

  function saveEdit() {
    if (!editTitle.trim()) {
      setEditError('Title cannot be empty.');
      return;
    }
    onEdit(task.id, editTitle.trim());
    setIsEditing(false);
    setEditError('');
  }

  function cancelEdit() {
    setEditTitle(task.title);
    setEditError('');
    setIsEditing(false);
  }

  function handleEditKey(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveEdit();
    }
    if (event.key === 'Escape') cancelEdit();
  }

  function confirmDelete() {
    const shouldDelete = window.confirm(`Delete "${task.title}"?`);
    if (shouldDelete) onDelete(task.id);
  }

  return (
    <article className={`task-card ${task.completed ? 'task-completed' : ''}`}>
      <label className="task-check-wrap" aria-label={`Mark ${task.title} as ${task.completed ? 'active' : 'completed'}`}>
        <input
          className="task-checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="custom-check" aria-hidden="true">✓</span>
      </label>

      <div className="task-main">
        {isEditing ? (
          <div className="edit-area">
            <input
              className="edit-input"
              type="text"
              value={editTitle}
              onChange={(event) => {
                setEditTitle(event.target.value);
                if (editError) setEditError('');
              }}
              onKeyDown={handleEditKey}
              autoFocus
              aria-label="Edit task title"
              maxLength="100"
            />
            {editError && <span className="field-error edit-error">{editError}</span>}
            <span className="edit-hint">Enter to save · Esc to cancel</span>
          </div>
        ) : (
          <div className="task-title-line">
            <h3 className="task-title">{task.title}</h3>
            {isOverdue && <span className="overdue-badge">Overdue</span>}
          </div>
        )}
        <div className="task-meta">
          <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
            <span className="priority-dot" /> {task.priority}
          </span>
          <span className="due-date">
            <span aria-hidden="true">▦</span> {formatDate(task.dueDate)}
          </span>
        </div>
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="icon-button save-action" type="button" onClick={saveEdit} aria-label="Save task">✓</button>
            <button className="icon-button" type="button" onClick={cancelEdit} aria-label="Cancel editing">×</button>
          </>
        ) : (
          <>
            <button
              className="icon-button"
              type="button"
              onClick={() => {
                setEditTitle(task.title);
                setIsEditing(true);
              }}
              aria-label={`Edit ${task.title}`}
              title="Edit task"
            >
              ✎
            </button>
            <button
              className="icon-button delete-action"
              type="button"
              onClick={confirmDelete}
              aria-label={`Delete ${task.title}`}
              title="Delete task"
            >
              ×
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export default TaskItem;
