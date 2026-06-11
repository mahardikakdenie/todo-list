import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTodos } from '@/src/hooks/useTodos';
import { Trash2, Plus, Loader2, ListTodo, CheckCircle2, Circle, Search, SearchX, Target, Trophy, Sparkles, ChevronDown, ChevronUp, AlignLeft } from 'lucide-react';
import { Todo } from '@/src/types';
import { motion, AnimatePresence } from 'motion/react';

import { SummaryDashboard } from './SummaryDashboard';

function TodoItem({ todo, toggleTodo, deleteTodo, updateTodoNotes }: { todo: Todo, toggleTodo: any, deleteTodo: any, updateTodoNotes: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState(todo.notes || '');

  const handleSaveNotes = () => {
    updateTodoNotes.mutate({ id: todo.id, notes: notesDraft });
    setIsEditingNotes(false);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
      className={`group flex flex-col p-4 sm:p-5 border rounded-2xl hover:shadow-md transition-all duration-300 overflow-hidden ${
        todo.completed 
          ? 'bg-slate-50/50 border-slate-200/60' 
          : 'bg-white border-slate-200 hover:border-rose-300'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center flex-1 gap-4">
          <Checkbox
            id={`todo-${todo.id}`}
            checked={todo.completed}
            onCheckedChange={() => toggleTodo.mutate(todo)}
            className={`w-6 h-6 rounded-full mt-0.5 sm:mt-0 transition-all active:scale-75 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 ${!todo.completed && 'border-slate-300'}`}
          />
          <div className="flex flex-col flex-1 gap-1">
            <label
              htmlFor={`todo-${todo.id}`}
              className={`text-base font-medium leading-tight transition-all cursor-pointer ${
                todo.completed ? 'text-slate-400 line-through' : 'text-slate-800'
              }`}
            >
              {todo.title}
            </label>
            <div className="flex items-center gap-2 mt-0.5 mt-1 sm:mt-0">
              <span className={`text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${
                todo.completed 
                  ? 'bg-emerald-100/50 text-emerald-600' 
                  : 'bg-blue-100/50 text-blue-600'
              }`}>
                {todo.completed ? 'Completed' : 'In Progress'}
              </span>
              {(todo.notes || isExpanded) && (
                <span className="flex items-center gap-1 text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  <AlignLeft className="w-3 h-3" />
                  Notes
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto ml-[3.25rem] sm:ml-0 mt-2 sm:mt-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all rounded-xl h-10 w-10 ${isExpanded ? 'bg-rose-50 text-rose-600' : 'opacity-0 group-hover:opacity-100 focus-visible:opacity-100'}`}
            title={isExpanded ? "Hide notes" : "Show notes"}
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteTodo.mutate(todo.id)}
            disabled={deleteTodo.isPending}
            className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all rounded-xl h-10 w-10"
          >
            <Trash2 className="w-5 h-5" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-slate-100/60 ml-[3.25rem]">
              {isEditingNotes ? (
                <div className="space-y-3">
                  <Textarea
                    placeholder="Add details, links, or sub-tasks..."
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    className="min-h-[100px] text-sm bg-white/50 border-slate-200 focus-visible:ring-rose-200 resize-none shadow-sm pb-1"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setNotesDraft(todo.notes || '');
                        setIsEditingNotes(false);
                      }}
                      className="text-slate-500 hover:text-slate-700 h-8 px-3 text-xs"
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleSaveNotes}
                      disabled={updateTodoNotes.isPending}
                      className="bg-rose-500 hover:bg-rose-600 h-8 px-4 text-xs font-medium"
                    >
                      {updateTodoNotes.isPending ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                      Save Notes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="group/notes relative rounded-lg p-3 -mx-3 hover:bg-slate-50/80 transition-colors">
                  {todo.notes ? (
                    <div className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                      {todo.notes}
                    </div>
                  ) : (
                    <div className="text-sm text-slate-400 italic">
                      No notes added yet.
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingNotes(true)}
                    className="absolute top-2 right-2 opacity-0 group-hover/notes:opacity-100 h-7 px-3 text-xs bg-white/80 backdrop-blur border shadow-sm hover:bg-rose-50 hover:text-rose-600 transition-all font-medium"
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export function TodoList() {
  const [newTitle, setNewTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { todos, isLoading, isError, addTodo, toggleTodo, deleteTodo, updateTodoNotes } = useTodos();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTodo.mutate(newTitle.trim());
    setNewTitle('');
  };

  const filteredTodos = useMemo(() => {
    return todos?.filter((todo) => {
      if (searchQuery.trim() && !todo.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (filter === 'pending') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter, searchQuery]);

  const stats = useMemo(() => {
    const total = filteredTodos?.length || 0;
    const completed = filteredTodos?.filter((t) => t.completed).length || 0;
    const active = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, active, progress };
  }, [filteredTodos]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center gap-3">
              <div className="bg-rose-100 p-2.5 rounded-xl shadow-sm border border-rose-200/50">
                <ListTodo className="w-7 h-7 text-rose-500" />
              </div>
              Tasks Overview
            </h1>
            <p className="text-slate-500 pl-14">Manage your daily goals and track progress.</p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-3xl font-bold tracking-tighter text-slate-900">
              {stats.progress}%
            </div>
            <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">
              Completed
            </div>
          </div>
        </div>
        
        <div className="pl-14 pr-4 sm:pr-0">
          <Progress value={stats.progress} className="h-2 w-full bg-rose-100/50 [&>div]:bg-rose-500" />
        </div>
      </div>

      <SummaryDashboard todos={todos} />

      <Card className="border-none shadow-xl bg-white/60 backdrop-blur-xl ring-1 ring-slate-900/5 overflow-hidden">
        <div className="bg-slate-50/50 border-b border-slate-100 p-4 sm:p-6">
          <form onSubmit={handleAdd} className="flex gap-3">
            <Input
              type="text"
              placeholder="What do you need to get done?"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 h-12 text-base shadow-sm transition-all focus-visible:ring-rose-400 bg-white"
              disabled={addTodo.isPending}
            />
            <Button
              type="submit"
              disabled={!newTitle.trim() || addTodo.isPending}
              className="h-12 px-6 sm:px-8 transition-all active:scale-95 shadow-sm bg-rose-600 hover:bg-rose-700 text-white"
            >
              {addTodo.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              <span className="ml-2 hidden sm:inline font-medium text-base">Add Task</span>
            </Button>
          </form>
        </div>

        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 border-b border-slate-100 bg-white/40 gap-4">
            <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-3 bg-rose-50/80 p-1 rounded-xl">
                <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-sm">All</TabsTrigger>
                <TabsTrigger value="pending" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-amber-600 data-[state=active]:shadow-sm">Pending</TabsTrigger>
                <TabsTrigger value="completed" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex w-full sm:w-auto items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10 bg-white"
                />
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-white min-h-[400px]">
             {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 text-slate-500">
                <Loader2 className="w-10 h-10 animate-spin mb-4 text-rose-400" />
                <p className="text-sm font-medium">Fetching your tasks...</p>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-20 text-destructive">
                <div className="bg-destructive/10 p-4 rounded-full mb-4">
                  <Trash2 className="w-8 h-8" />
                </div>
                <p className="text-lg font-medium">Failed to load tasks</p>
                <p className="text-sm opacity-80 mt-1">Please try refreshing the page.</p>
              </div>
            ) : filteredTodos?.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-24 text-slate-400 px-4"
              >
                <div className="bg-rose-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-[8px] border-white shadow-[0_0_0_1px_rgba(225,29,72,0.1)] relative">
                  {searchQuery ? (
                    <SearchX className="w-10 h-10 text-rose-400" />
                  ) : filter === 'completed' ? (
                    <Target className="w-10 h-10 text-emerald-400" />
                  ) : filter === 'pending' ? (
                    <Trophy className="w-10 h-10 text-amber-400" />
                  ) : (
                    <ListTodo className="w-10 h-10 text-rose-400" />
                  )}
                  {filter === 'pending' && !searchQuery && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-sm border border-slate-100"
                    >
                      <Sparkles className="w-5 h-5 text-amber-500 fill-amber-100" />
                    </motion.div>
                  )}
                </div>
                <p className="text-xl font-semibold text-slate-800">
                  {searchQuery !== ''
                    ? "No matches found"
                    : filter === 'completed' 
                    ? "No completed tasks yet" 
                    : filter === 'pending' 
                    ? "You're all caught up!" 
                    : "Your list is empty"}
                </p>
                <p className="text-[15px] mt-3 max-w-sm text-center leading-relaxed text-slate-500">
                  {searchQuery !== ''
                    ? `We couldn't find any tasks matching "${searchQuery}". Try a different keyword or check your spelling.`
                    : filter === 'all' 
                    ? "A clear space for a clear mind. Add a task above to start organizing your day." 
                    : filter === 'completed'
                    ? "Tasks you complete will appear here. Keep up the good work and check off some pending tasks!"
                    : "Great job! You have no pending tasks. Enjoy your day or add something new to conquer."}
                </p>
              </motion.div>
            ) : (
              <ul className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {filteredTodos?.map((todo: Todo) => (
                    <TodoItem 
                      key={todo.id} 
                      todo={todo} 
                      toggleTodo={toggleTodo} 
                      deleteTodo={deleteTodo} 
                      updateTodoNotes={updateTodoNotes} 
                    />
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

