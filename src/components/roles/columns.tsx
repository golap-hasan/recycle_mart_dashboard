"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { Admin } from "@/types/admin.type";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { deleteAdmin } from "@/services/admin";
import { ErrorToast, SuccessToast } from "@/lib/utils";
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
import { EditAdminModal } from "./EditAdminModal";
import { getCurrentUser } from "@/services/auth";

const CellAction = ({ data }: { data: Admin }) => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getCurrentUser();
      setIsSuperAdmin(user?.role === "SUPER_ADMIN");
    };
    checkUser();
  }, []);

  if (!isSuperAdmin) return null;

  const onDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteAdmin(data._id);
      if (res.success) {
        SuccessToast("Admin deleted successfully!");
      } else {
        ErrorToast(res.message || "Failed to delete admin");
      }
    } catch {
      ErrorToast("Something went wrong");
    } finally {
      setLoading(false);
      setAlertOpen(false);
    }
  };

  return (
    <>
      <EditAdminModal
        admin={data}
        open={open}
        onOpenChange={setOpen}
      />
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the admin
              account and remove their access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="text-right flex gap-2 justify-end">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setOpen(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-destructive"
          onClick={() => setAlertOpen(true)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export const rolesColumns: ColumnDef<Admin>[] = [
  {
    accessorKey: "name",
    header: "Admin",
    cell: ({ row }) => {
      const admin = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border bg-muted">
            <Image
              src={admin.image || "/placeholder.png"}
              alt={admin.name}
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium leading-none">{admin.name}</span>
            <span className="text-xs text-muted-foreground mt-1">
              {admin.phone || "No phone"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <Badge variant={role === "SUPER_ADMIN" ? "default" : "secondary"}>
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge variant={isActive ? "success" : "destructive"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

