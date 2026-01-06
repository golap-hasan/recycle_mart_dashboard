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
  Megaphone,
  Layers,
  MapPin,
  CreditCard,
  Headphones,
  Image,
  ShieldAlert,
  Ticket,
  ChevronRight,
  Asterisk,
  LogOut,
  FileText,
  Shield,
} from "lucide-react";
import { cn, SuccessToast, ErrorToast } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { logOut } from "@/services/auth";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
  expandable?: boolean;
  children?: { label: string; href: string }[];
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    title: "Admin Management",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/" },
      { icon: Users, label: "User Management", href: "/users" },
      { icon: Megaphone, label: "Ads Management", href: "/ads" },
      { icon: Layers, label: "Category & Subcategory", href: "/categories" },
      { icon: MapPin, label: "Locations", href: "/locations" },
      { icon: CreditCard, label: "Packages / Plans", href: "/packages" },
    ],
  },
  {
    title: "System Configuration",
    items: [
      { icon: Headphones, label: "Support Management", href: "/support" },
      { icon: Image, label: "Content Management", href: "/content" },
      { icon: ShieldAlert, label: "Admin & Roles", href: "/roles" },
      { icon: Ticket, label: "Lottery Management", href: "/lottery" },
    ],
  },
  {
    title: "Settings",
    items: [
      { icon: FileText, label: "About Us", href: "/about-us" },
      { icon: Shield, label: "Privacy Policy", href: "/privacy-policy" },
      // { icon: Image, label: "Terms & Conditions", href: "/terms-conditions" },
      // { icon: Image, label: "FAQ", href: "/faq" },
    ],
  },
];

interface SidebarProps {
  isCollapsed: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logOut();
      SuccessToast("Logged out successfully!");
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
      ErrorToast("Failed to logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "relative h-screen bg-background border-r border-border transition-all duration-300 hidden md:flex flex-col overflow-hidden",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 h-16">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Asterisk className="w-5 h-5 text-background" />
              </div>
              <span className="text-foreground font-semibold text-lg">
                Analytics
              </span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
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
                  const active = isActive(item.href);

                  const menuButton = (
                    <Button
                      key={itemIndex}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start transition-colors",
                        active
                          ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted",
                        isCollapsed ? "px-0 justify-center" : "px-3"
                      )}
                      onClick={() => {
                        if (item.expandable) {
                          toggleExpand(item.label);
                        } else {
                          router.push(item.href);
                        }
                      }}
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
                            <Link
                              href={child.href}
                              key={childIndex}
                              className="block"
                            >
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start text-sm px-3 py-1 h-8",
                                  isActive(child.href)
                                    ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                              >
                                {child.label}
                              </Button>
                            </Link>
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
              onClick={handleLogout}
              disabled={isLoggingOut}
              loading={isLoggingOut}
              loadingText="Logging out..."
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
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  loading={isLoggingOut}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{isLoggingOut ? "Logging out..." : "Log out"}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
