import { UseMutationResult } from '@tanstack/react-query';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from './TodoList';
import { useTodos } from '@/src/hooks/useTodos';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { Todo } from '../types';

// Mock the custom hook
vi.mock('@/src/hooks/useTodos', () => ({
  useTodos: vi.fn(),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
    li: ({ children, ...props }: { children: React.ReactNode }) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock SummaryDashboard since it's tested separately
vi.mock('./SummaryDashboard', () => ({
  SummaryDashboard: () => <div data-testid="summary-dashboard" />,
}));

describe('TodoList Component', () => {
  const mockTodos: Todo[] = [
    { id: 1, title: 'Learn Vitest', completed: false, userId: 1 },
    { id: 2, title: 'Build Next.js App', completed: true, userId: 1 },
  ];

  const mockAddTodo = { mutate: vi.fn(), isPending: false } as unknown as UseMutationResult<Todo, Error, string, unknown>;
  const mockToggleTodo = { mutate: vi.fn() } as unknown as UseMutationResult<Todo, Error, Todo, unknown>;
  const mockDeleteTodo = { mutate: vi.fn() } as unknown as UseMutationResult<number, Error, number, unknown>;

  beforeEach(() => {
    vi.clearAllMocks();
    (useTodos as Mock).mockReturnValue({
      todos: mockTodos,
      isLoading: false,
      isError: false,
      addTodo: mockAddTodo,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
      updateTodoNotes: { mutate: vi.fn() },
      reorderTodos: vi.fn(),
    });
  });

  it('renders correctly and shows tasks', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn Vitest')).toBeInTheDocument();
    expect(screen.getByText('Build Next.js App')).toBeInTheDocument();
  });

  it('allows adding a new task', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/What do you need to get done/i);
    const addButton = screen.getByLabelText(/Add new task/i);

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(mockAddTodo.mutate).toHaveBeenCalledWith('New Task');
  });

  it('filters tasks by status', () => {
    render(<TodoList />);
    
    // Click Pending tab
    fireEvent.click(screen.getByRole('tab', { name: 'Pending' }));
    
    // Should show pending task
    expect(screen.getByText('Learn Vitest')).toBeInTheDocument();
    // Should NOT show completed task
    expect(screen.queryByText('Build Next.js App')).not.toBeInTheDocument();
  });

  it('searches for tasks', () => {
    render(<TodoList />);
    const searchInput = screen.getByLabelText(/Search tasks/i);

    fireEvent.change(searchInput, { target: { value: 'Vitest' } });

    expect(screen.getByText('Learn Vitest')).toBeInTheDocument();
    expect(screen.queryByText('Build Next.js App')).not.toBeInTheDocument();
  });

  it('shows empty state when no tasks match search', () => {
    render(<TodoList />);
    const searchInput = screen.getByLabelText(/Search tasks/i);

    fireEvent.change(searchInput, { target: { value: 'NonExistentTask' } });

    expect(screen.getByText('No matches found')).toBeInTheDocument();
  });

  it('prevents adding empty tasks (validation)', () => {
    render(<TodoList />);
    const addButton = screen.getByLabelText(/Add new task/i);
    
    fireEvent.click(addButton);
    
    // mutate should not have been called because input was empty
    expect(mockAddTodo.mutate).not.toHaveBeenCalled();
  });
});
