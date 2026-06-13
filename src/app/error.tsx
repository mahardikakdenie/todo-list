"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50/50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-rose-100 text-center space-y-6">
        <div className="bg-rose-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-10 h-10 text-rose-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800">Something went wrong!</h2>
          <p className="text-slate-500">
            An unexpected error occurred while loading the application.
          </p>
        </div>
        <Button
          onClick={() => reset()}
          className="bg-rose-600 hover:bg-rose-700 text-white px-8 h-12 rounded-xl transition-all active:scale-95"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Try again
        </Button>
      </div>
    </div>
  );
}
