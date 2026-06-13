"use client"

import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import { Todo } from '@/src/types';
import { CheckCircle2, ListTodo, Timer } from 'lucide-react';

interface SummaryDashboardProps {
  todos: Todo[] | undefined;
}

export function SummaryDashboard({ todos }: SummaryDashboardProps) {
  const stats = useMemo(() => {
    const total = todos?.length || 0;
    const completed = todos?.filter((t) => t.completed).length || 0;
    return { total, completed };
  }, [todos]);

  // Mocking data for the bar chart to show "activity" or completed tasks over the week
  const data = useMemo(() => {
    return [
      { day: 'Mon', completed: Math.max(0, stats.completed - 5), added: stats.total - 4 },
      { day: 'Tue', completed: Math.max(0, stats.completed - 3), added: stats.total - 2 },
      { day: 'Wed', completed: Math.max(0, stats.completed - 1), added: stats.total },
      { day: 'Thu', completed: Math.max(0, stats.completed - 2), added: stats.total - 1 },
      { day: 'Fri', completed: stats.completed, added: stats.total + 2 },
      { day: 'Sat', completed: Math.max(0, stats.completed + 1), added: stats.total + 1 },
      { day: 'Sun', completed: stats.completed + 2, added: stats.total + 3 },
    ];
  }, [stats]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
      <Card className="border-none shadow-sm bg-white/60 backdrop-blur-md">
        <CardContent className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
          <div className="bg-amber-100 p-2.5 sm:p-3 rounded-xl text-amber-600">
            <ListTodo className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-[11px] sm:text-sm font-medium text-slate-500 uppercase tracking-wider">Total Tasks</p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800">{stats.total}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm bg-white/60 backdrop-blur-md">
        <CardContent className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
          <div className="bg-rose-100 p-2.5 sm:p-3 rounded-xl text-rose-600">
            <Timer className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-[11px] sm:text-sm font-medium text-slate-500 uppercase tracking-wider">Avg. Time</p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800">2.4 hrs</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm bg-white/60 backdrop-blur-md sm:col-span-2 lg:col-span-1">
        <CardContent className="p-3 sm:p-4 flex flex-col justify-center h-full gap-2">
          <div className="flex items-center justify-between">
            <p className="text-[11px] sm:text-sm font-medium text-slate-500 uppercase tracking-wider">Weekly Activity</p>
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
          </div>
          <div className="h-[40px] sm:h-[48px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
                  cursor={{ fill: 'transparent' }}
                />
                <Bar dataKey="added" fill="#e2e8f0" radius={[2, 2, 2, 2]} barSize={4} />
                <Bar dataKey="completed" fill="#f43f5e" radius={[2, 2, 2, 2]} barSize={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
