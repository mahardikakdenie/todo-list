import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50/50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-rose-500" />
        <p className="text-slate-500 font-medium animate-pulse">Loading application...</p>
      </div>
    </div>
  );
}
