import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError('Please enter a task title.');
      return;
    }

    onAddTask({
      title: title.trim(),
      priority,
      dueDate: dueDate || null
    });

    setTitle('');
    setPriority('Medium');
    setDueDate('');
    setError('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-topline">
        <div>
          <p className="eyebrow">MAKE IT HAPPEN</p>
          <h2>Add a task</h2>
        </div>
        <span className="form-icon" aria-hidden="true">＋</span>
      </div>

      <label className="field-label" htmlFor="task-title">Task title</label>
      <input
        id="task-title"
        className="text-input"
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
          if (error) setError('');
        }}
        maxLength="100"
      />
      {error && <p className="field-error" role="alert">{error}</p>}

      <div className="form-row">
        <div className="form-field">
          <label className="field-label" htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            className="text-input"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="task-date">Due date <span>(optional)</span></label>
          <input
            id="task-date"
            className="text-input date-input"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </div>
      </div>

      <button className="primary-button add-button" type="submit">
        <span aria-hidden="true">＋</span> Add task
      </button>
      <p className="enter-hint">Press Enter to quickly add a task</p>
    </form>
  );
}

export default TaskForm;
