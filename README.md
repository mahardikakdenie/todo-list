# Task Management App (To-Do List)

A professional To-Do List application built with **Next.js 15 (App Router)** and **TypeScript**. This project was developed as part of a Technical Test for a Front End Developer position, adhering to modern industry standards and best practices.

## Features
- [x] **Next.js App Router**: Utilizes the latest Next.js architecture for optimized performance and improved developer experience.
- [x] **Task Management**: Full CRUD capabilities (Create, Read, Update, Delete) for tasks.
- [x] **Task Status**: Easily toggle tasks between 'Pending' and 'Completed'.
- [x] **Drag & Drop**: Reorder tasks intuitively using `@dnd-kit`.
- [x] **Filter & Search**: Quickly find tasks with real-time search and status-based filtering (All/Pending/Completed).
- [x] **Summary Dashboard**: Data visualization of task statistics using **Recharts**.
- [x] **Form Validation**: Robust validation to prevent empty submissions with clear visual feedback.
- [x] **Unit Testing**: Comprehensive component testing using **Vitest** and **React Testing Library**.
- [x] **LocalStorage Sync**: Persistent data storage using browser LocalStorage to maintain state across sessions.
- [x] **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop views.

## Tech Stack
* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + shadcn/ui
* **State Management:** TanStack React Query v5
* **Animation:** Motion (Framer Motion)
* **Testing:** Vitest + React Testing Library
* **Icons:** Lucide React
* **Charts:** Recharts

## Getting Started

Follow these steps to run the project locally:

1. **Clone the repository** to your local machine.
2. **Open the terminal** in the project root directory.
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open your browser** and navigate to `http://localhost:3000`.

### Running Tests
To execute the unit testing suite, run:
```bash
npm run test
```

## API Endpoints
The application consumes mock data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/):
* **GET** `/todos?_limit=6`: Fetch initial task data.
* **POST** `/todos`: Simulate adding a new task.
* **PATCH** `/todos/:id`: Simulate updating task status or notes.
* **DELETE** `/todos/:id`: Simulate removing a task.

## Architecture & Best Practices
1. **App Router Paradigm**: Structured directory using `src/app` for clean layouting and routing logic.
2. **Decoupled Business Logic**: Core logic is encapsulated within the `useTodos.ts` custom hook, ensuring a clear separation of concerns between UI and state management.
3. **Client vs Server Components**: Strategic use of `"use client"` directives to optimize bundle size while maintaining interactivity.
4. **Server State Management**: Utilizes TanStack React Query for efficient caching, handling asynchronous loading states, and implementing optimistic updates.
5. **Strict Type Safety**: Comprehensive TypeScript implementation to ensure data integrity and minimize runtime errors across the application.
