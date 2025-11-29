"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import {
  PanelLeft,
  UserCircle,
  Settings,
  CreditCard,
  Users,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

interface TopbarProps {
  onToggleSidebar: () => void;
}

export default function Topbar({ onToggleSidebar }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="h-16 bg-background border-b border-border flex items-center px-4 justify-between">
      {/* Left Section - Menu Toggle */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-muted"
          onClick={onToggleSidebar}
        >
          <PanelLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Right Section - Theme Switcher & User Menu */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt="John Doe" />
                <AvatarFallback className="bg-muted text-muted-foreground">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-popover border-border"
            align="end"
            forceMount
          >
            {/* User Info Header */}
            <div className="flex items-center gap-3 p-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt="John Doe" />
                <AvatarFallback className="bg-muted text-muted-foreground">JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </div>

            <DropdownMenuSeparator className="bg-border" />

            {/* Menu Items */}
            <DropdownMenuItem className="text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>My Account</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer">
              <Users className="mr-2 h-4 w-4" />
              <span>Manage Team</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-border" />

            <DropdownMenuItem className="text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
