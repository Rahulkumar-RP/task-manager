# TaskFlow – React Task Manager

A one-page task manager built with React, Vite and plain CSS. It supports adding, completing, editing, deleting, filtering, searching and sorting tasks. No backend or external state library is used.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). To create a production build:

```bash
npm run build
npm run preview
```

## What works

- Loads the initial tasks from `public/tasks.json` on the first visit.
- Shows a loading state while tasks load and an error state with a Retry button if loading fails.
- Saves task changes to browser `localStorage`; later visits load the saved list instead of fetching the starter JSON again.
- Add tasks with a required title, Low/Medium/High priority (Medium by default), and optional due date. Enter submits the form.
- Complete and un-complete tasks with a checkbox.
- Edit a task title in place. Enter saves, Escape cancels, and blank titles are rejected.
- Delete tasks only after browser confirmation.
- Filter by All, Active and Completed, with an active-task counter.
- Search titles without case sensitivity and sort by due date or priority.
- Shows an Overdue label for incomplete tasks whose due date is before today.
- Responsive layout for mobile and desktop.

## Starter data check

With a fresh browser storage (clear the `taskflow-tasks` localStorage entry before the first visit), the starter data should show **3 tasks left**. Only **Fix checkout bug** should show **Overdue**. Sorting All by due date should order the tasks as:

1. Set up project repo
2. Fix checkout bug
3. Design login screen
4. Write API docs
5. Plan team outing (no due date, so it appears last)

## Assumptions and notes

- `localStorage` is specific to the browser and device. Clearing browser storage resets the app to the starter JSON on the next visit.
- Dates are compared using the browser's current local date.
- Deleting a task uses the browser's standard confirmation dialog.
- No backend, login, or cloud sync is included because the assessment asks for a frontend-only app.
- Optional bonus items such as undo and theme switching are not included; the required features are the priority.

## Time spent

Built as a focused intern assessment project. Update this line with your actual total time before submission.
