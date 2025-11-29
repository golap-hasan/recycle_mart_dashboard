"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  TrendingUp,
  BarChart3,
  FileText,
  AlertTriangle,
  ClipboardList,
  LogOut,
  Download,
  Link2,
  ChevronRight,
  Asterisk,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  badge?: string;
  expandable?: boolean;
  children?: { label: string }[];
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    title: "Core Pages",
    items: [
      { icon: LayoutDashboard, label: "Dashboard" },
      { icon: UserCircle, label: "User Behavior" },
      { icon: Users, label: "Audience" },
      { icon: TrendingUp, label: "Traffic Sources" },
      { icon: BarChart3, label: "Engagement Metrics" },
      { 
        icon: FileText, 
        label: "Custom Reports", 
        expandable: true,
        children: [
          { label: "Sales Report" },
          { label: "User Report" },
          { label: "Revenue Report" },
        ]
      },
      { icon: AlertTriangle, label: "Error Logs" },
      { icon: ClipboardList, label: "Survey Results" },
    ],
  },
  {
    title: "Visualization",
    items: [
      { icon: Download, label: "Data Export" },
      { 
        icon: Link2, 
        label: "Integrations", 
        expandable: true,
        children: [
          { label: "API Integrations" },
          { label: "Third-party Apps" },
          { label: "Webhooks" },
        ]
      },
    ],
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "relative h-screen bg-background border-r border-border transition-all duration-300 flex flex-col overflow-hidden",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 h-16">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <Asterisk className="w-5 h-5 text-background" />
              </div>
              <span className="text-foreground font-semibold text-lg">Analytics</span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center mx-auto">
              <Asterisk className="w-5 h-5 text-background" />
            </div>
          )}
        </div>

        {/* Menu Groups */}
        <div className="flex-1 overflow-y-auto px-3 space-y-6 py-4">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* Group Title */}
              {!isCollapsed && (
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-3">
                  {group.title}
                </div>
              )}

              {/* Menu Items */}
              <div className="space-y-1">
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const isExpanded = expandedItems.includes(item.label);
                  
                  const menuButton = (
                    <Button
                      key={itemIndex}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                        isCollapsed ? "px-0 justify-center" : "px-3"
                      )}
                      onClick={() => item.expandable && toggleExpand(item.label)}
                    >
                      <Icon className={cn("w-4 h-4", !isCollapsed && "mr-3")} />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded">
                              {item.badge}
                            </span>
                          )}
                          {item.expandable && (
                            <ChevronRight 
                              className={cn(
                                "w-4 h-4 ml-auto transition-transform",
                                isExpanded && "rotate-90"
                              )} 
                            />
                          )}
                        </>
                      )}
                    </Button>
                  );

                  const menuItemContent = isCollapsed ? (
                    <Tooltip key={itemIndex}>
                      <TooltipTrigger asChild>{menuButton}</TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <div key={itemIndex}>
                      {menuButton}
                      {/* Submenu Items */}
                      {item.children && isExpanded && (
                        <div className="ml-9 mt-1 space-y-1">
                          {item.children.map((child, childIndex) => (
                            <Button
                              key={childIndex}
                              variant="ghost"
                              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted text-sm px-3 py-1 h-8"
                            >
                              {child.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  );

                  return menuItemContent;
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-3 border-t border-border">
          {!isCollapsed ? (
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted px-3"
            >
              <LogOut className="w-4 h-4 mr-3" />
              <span>Log out</span>
            </Button>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Log out</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
