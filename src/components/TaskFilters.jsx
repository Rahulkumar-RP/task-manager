function TaskFilters({ activeFilter, onFilterChange, searchText, onSearchChange, sortBy, onSortChange, activeCount }) {
  const filters = ['All', 'Active', 'Completed'];

  return (
    <div className="list-toolbar">
      <div className="filter-tabs" role="tablist" aria-label="Filter tasks">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="search-sort-row">
        <label className="search-box">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search tasks..."
            value={searchText}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Search tasks by title"
          />
        </label>
        <label className="sort-select-wrap">
          <span className="sort-label">Sort:</span>
          <select value={sortBy} onChange={(event) => onSortChange(event.target.value)} aria-label="Sort tasks">
            <option value="dueDate">Due date</option>
            <option value="priority">Priority</option>
          </select>
        </label>
      </div>
      <p className="task-counter"><strong>{activeCount}</strong> {activeCount === 1 ? 'task' : 'tasks'} left</p>
    </div>
  );
}

export default TaskFilters;
