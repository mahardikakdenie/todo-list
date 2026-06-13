import { render, screen } from '@testing-library/react';
import { SummaryDashboard } from './SummaryDashboard';
import { Todo } from '../types';
import { describe, it, expect, vi } from 'vitest';

// Mock Recharts since it doesn't render well in jsdom
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  BarChart: ({ children }: any) => <div>{children}</div>,
  Bar: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  Tooltip: () => <div />,
}));

describe('SummaryDashboard', () => {
  const mockTodos: Todo[] = [
    { id: 1, title: 'Task 1', completed: true, userId: 1 },
    { id: 2, title: 'Task 2', completed: false, userId: 1 },
  ];

  it('renders correctly with todo stats', () => {
    render(<SummaryDashboard todos={mockTodos} />);
    
    // Check if "Total Tasks Added" displays 2
    expect(screen.getByText('Total Tasks Added')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders with zero tasks', () => {
    render(<SummaryDashboard todos={[]} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
