"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center gap-6">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/5 shadow-2xl ring-1 ring-primary/20 backdrop-blur-sm">
        {/* Pulsing Background */}
        <div className="absolute inset-0 animate-pulse rounded-3xl bg-primary/10" />
        
        {/* Spinning Icon */}
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        
        {/* Orbiting Dot (Optical Flair) */}
        <div className="absolute -top-1 -right-1 h-3 w-3 animate-bounce rounded-full bg-primary shadow-lg" />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-xl font-semibold tracking-tight">
          Loading Subscribers...
        </h3>
        <p className="text-sm text-muted-foreground animate-pulse">
          Fetching the latest data for you
        </p>
      </div>
    </div>
  );
}
