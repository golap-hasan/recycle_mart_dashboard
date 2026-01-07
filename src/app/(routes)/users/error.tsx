"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

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
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center p-6">
      <div className="relative z-10 flex max-w-md flex-col items-center justify-center gap-6 rounded-3xl border bg-background/50 p-10 text-center shadow-2xl backdrop-blur-xl">
        {/* Ambient Glow */}
        <div className="absolute inset-0 -z-10 bg-linear-to-tr from-destructive/20 via-transparent to-orange-500/10 opacity-50 blur-3xl" />
        
        <div className="relative grid place-items-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-destructive/20 opacity-75 duration-1000" />
          <div className="relative grid h-20 w-20 place-items-center rounded-2xl bg-linear-to-br from-destructive/10 to-destructive/20 shadow-inner ring-1 ring-destructive/20">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Access Denied</h2>
          <p className="text-muted-foreground">
             {error.message || "You don't have permission to access this resource."}
          </p>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={() => reset()} 
            size="lg" 
            className="group relative overflow-hidden bg-linear-to-r from-primary to-primary/80 transition-all hover:scale-105 hover:shadow-lg"
          >
            <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" />
            Try Again
          </Button>
          <Button 
            onClick={() => window.location.href = '/'} 
            variant="outline" 
            size="lg"
            className="hover:bg-muted/50"
          >
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
