# TaskFlow – React Task Manager

TaskFlow is a responsive, single-page task management application built using **React, Vite, JavaScript and Plain CSS**. It allows users to organize their daily work by adding, completing, editing, deleting, filtering, searching and sorting tasks.

**Live Demo:** https://task-manager-nine-nu-21.vercel.app

**GitHub Repository:** https://github.com/Rahulkumar-RP/task-manager

## Tech Stack

- React
- Vite
- JavaScript (ES6+)
- HTML5
- Plain CSS
- React Hooks (`useState`, `useEffect`)
- Browser Local Storage
- Vercel (Deployment)

## Features

- **Load Initial Tasks:** Fetches starter tasks from `public/tasks.json` on the first visit.
- **Loading State:** Displays a loading message while tasks are being fetched.
- **Error Handling:** Shows an error message and Retry button when task loading fails.
- **Local Storage:** Automatically saves task changes in browser localStorage and loads saved tasks on subsequent visits.
- **Add Tasks:** Add new tasks with a required title, priority and optional due date.
- **Priority Selection:** Supports Low, Medium and High priorities. Medium is selected by default.
- **Complete Tasks:** Mark tasks as completed or active using checkboxes.
- **Edit Tasks:** Edit task titles directly. Press Enter to save and Escape to cancel.
- **Delete Tasks:** Delete tasks after confirmation.
- **Task Filters:** Filter tasks using All, Active and Completed tabs.
- **Task Counter:** Displays the number of remaining active tasks.
- **Search:** Search task titles with case-insensitive matching.
- **Sorting:** Sort tasks by due date (soonest first) or priority (High first).
- **Overdue Detection:** Displays a red Overdue label for incomplete tasks with past due dates.
- **Responsive Design:** Works on desktop and mobile screens, including 375px-wide devices.

## Project Structure

```text
task-manager/
├── public/
│   └── tasks.json
├── src/
│   ├── components/
│   │   ├── TaskFilters.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Rahulkumar-RP/task-manager.git
```

### 2. Navigate to the project directory

```bash
cd task-manager
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

### 5. Create a production build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Starter Data Verification

The application includes five predefined tasks in `public/tasks.json`.

With fresh browser storage, the expected initial results are:

- Total tasks: 5
- Tasks left: 3
- Completed tasks: 2
- Overdue tasks: 1
- Only **Fix checkout bug** should display the Overdue label.

When sorting all tasks by due date, the expected order is:

1. Set up project repo
2. Fix checkout bug
3. Design login screen
4. Write API docs
5. Plan team outing (no due date)

## Assumptions and Limitations

- Task data is stored in browser localStorage.
- Local storage is specific to the browser and device.
- Clearing localStorage resets the application to the starter JSON data.
- Due dates are compared using the browser's current local date.
- Deleting a task uses the browser's standard confirmation dialog.
- The application is frontend-only and does not use a backend or database.
- User authentication and cloud data synchronization are not included.
- Optional bonus features such as undo after deletion and theme switching are not included.

## Deployment

The application is deployed using Vercel.

**Live Application:** https://task-manager-nine-nu-21.vercel.app

## Time Spent

Approximately 6–7 hours, including development, testing and deployment.

## Author

**Rahul Kumar Palai**

GitHub: https://github.com/Rahulkumar-RP
