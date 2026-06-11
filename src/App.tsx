import { TodoList } from './components/TodoList';

export default function App() {
  return (
    <div className="min-h-screen bg-rose-50/50 flex items-center justify-center p-4 md:p-8 font-sans selection:bg-rose-200">
      <div className="w-full relative">
        <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[size:20px_20px]" />
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-72 h-72 bg-rose-300/20 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl opacity-70" />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <TodoList />
        </div>
      </div>
    </div>
  );
}
