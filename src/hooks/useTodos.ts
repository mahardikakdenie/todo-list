import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Todo } from '../types';
import { useEffect } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const STORAGE_KEY = 'todos_local_storage';

export function useTodos() {
  const queryClient = useQueryClient();

  const query = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const localData = localStorage.getItem(STORAGE_KEY);
      if (localData) {
        try {
          return JSON.parse(localData);
        } catch (e) {
          console.error('Failed to parse local storage todos', e);
        }
      }
      
      const response = await fetch(`${API_URL}?_limit=6`);
      if (!response.ok) throw new Error('Failed to fetch todos');
      
      const data = await response.json();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    },
  });

  useEffect(() => {
    if (query.data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(query.data));
    }
  }, [query.data]);

  const addTodo = useMutation({
    mutationFn: async (title: string) => {
      const newTodo = {
        title,
        completed: false,
        userId: 1,
      };
      
      // We still simulate hitting the API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) throw new Error('Failed to add todo');
      
      const data = await response.json();
      // JSONPlaceholder always returns id 201 for POST
      // So we generate a unique ID to prevent React element key duplication
      return { ...data, id: Date.now() } as Todo;
    },
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[]>(['todos'], (old) => [newTodo, ...(old || [])]);
      toast.success('Todo added successfully!');
    },
    onError: () => {
      toast.error('Failed to add todo');
    }
  });

  const toggleTodo = useMutation({
    mutationFn: async (todo: Todo) => {
      // For local items not from the server (e.g., id > 200), we skip the API update and just simulate it
      if (todo.id <= 200) {
        const response = await fetch(`${API_URL}/${todo.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed: !todo.completed }),
        });
        if (!response.ok) throw new Error('Failed to update todo');
      }
      return { ...todo, completed: !todo.completed };
    },
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
      queryClient.setQueryData<Todo[]>(['todos'], (old) => 
        old?.map(t => t.id === updatedTodo.id ? { ...t, completed: !t.completed } : t)
      );
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      toast.error('Failed to update status');
    }
  });

  const deleteTodo = useMutation({
    mutationFn: async (id: number) => {
      if (id <= 200) {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete todo');
      }
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<Todo[]>(['todos'], (old) => old?.filter(t => t.id !== deletedId));
      toast.success('Todo removed');
    },
    onError: () => {
      toast.error('Failed to delete todo');
    }
  });

  const updateTodoNotes = useMutation({
    mutationFn: async ({ id, notes }: { id: number; notes: string }) => {
      if (id <= 200) {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notes }),
        });
        if (!response.ok) throw new Error('Failed to update notes');
      }
      return { id, notes };
    },
    onMutate: async ({ id, notes }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
      queryClient.setQueryData<Todo[]>(['todos'], (old) => 
        old?.map(t => t.id === id ? { ...t, notes } : t)
      );
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      toast.error('Failed to update notes');
    }
  });

  return {
    todos: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodoNotes,
  };
}
