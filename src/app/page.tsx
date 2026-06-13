import { TodoList } from '@/src/components/TodoList';

export default function Home() {
  return (
    <main className="min-h-screen bg-rose-50/50 flex items-center justify-center p-4 md:p-8 font-sans selection:bg-rose-200 overflow-x-hidden">
      <div className="w-full relative">
        <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[size:20px_20px]" />
        <div className="absolute top-0 right-0 -mt-10 sm:-mt-20 -mr-10 sm:-mr-20 w-48 h-48 sm:w-72 sm:h-72 bg-rose-300/20 rounded-full blur-2xl sm:blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-0 -mb-10 sm:-mb-20 -ml-10 sm:-ml-20 w-48 h-48 sm:w-72 sm:h-72 bg-indigo-300/20 rounded-full blur-2xl sm:blur-3xl opacity-70" />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <TodoList />
        </div>
      </div>
    </main>
  );
}
