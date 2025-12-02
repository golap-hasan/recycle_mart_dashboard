"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export function ProfileHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-card rounded-lg border shadow-sm">
      <div className="relative">
        <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
          <AvatarImage src="" alt="John Doe" />
          <AvatarFallback className="text-2xl bg-muted text-muted-foreground">
            JD
          </AvatarFallback>
        </Avatar>
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-sm"
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 text-center md:text-left space-y-2">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <h2 className="text-2xl font-bold">John Doe</h2>
          <Badge variant="secondary">Super Admin</Badge>
        </div>
        <p className="text-muted-foreground">
          Manage your personal information and security settings.
        </p>
        <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
          <span>Member since Jan 2023</span>
          <span>•</span>
          <span>Dhaka, Bangladesh</span>
        </div>
      </div>
    </div>
  );
}
