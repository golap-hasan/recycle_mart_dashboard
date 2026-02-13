"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate, getInitials, SuccessToast, ErrorToast } from "@/lib/utils";
import { User } from "@/types/users.type";
import { useState } from "react";
import { toggleUserBlock } from "@/services/users";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Ban, LockOpen, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const UserActions = ({ user }: { user: User }) => {
  const [loading, setLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleToggleBlock = async () => {
    setLoading(true);
    try {
      const res = await toggleUserBlock(user._id);
      if (res.success) {
        SuccessToast(`User ${user.isActive ? "blocked" : "unblocked"} successfully`);
        setIsAlertOpen(false);
      } else {
        ErrorToast(res.message || "Something went wrong");
      }
    } catch {
      ErrorToast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => setIsAlertOpen(true)}
            className={user.isActive ? "text-destructive" : "text-blue-600"}
          >
            {user.isActive ? (
              <><Ban className="mr-2 h-4 w-4" /> Block User</>
            ) : (
              <><LockOpen className="mr-2 h-4 w-4" /> Unblock User</>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {user.isActive ? "Block User?" : "Unblock User?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {user.isActive ? "block" : "unblock"} this user? 
              {user.isActive 
                ? " They will no longer be able to access the platform." 
                : " They will regain access to the platform."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleToggleBlock();
              }} 
              disabled={loading}
              className={user.isActive ? "bg-destructive hover:bg-destructive/90" : "bg-blue-600 hover:bg-blue-700"}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground md:hidden">{user.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground hidden md:inline-block">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("phone") || "N/A"}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("role")}
      </Badge>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge
          variant={isActive ? "default" : "destructive"}
          className="capitalize"
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined Date",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatDate(row.getValue("createdAt"))}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
             <UserActions user={row.original} />
        </div>
      );
    },
  },
];
