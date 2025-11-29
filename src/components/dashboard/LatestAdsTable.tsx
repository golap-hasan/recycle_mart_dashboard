"use client";
import Image from "next/image";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type AdRow = {
  id: number;
  photo: string;
  title: string;
  user: string;
  category: string;
  status: "approved" | "pending" | "rejected";
  date: string;
};

const rows: AdRow[] = [
  { id: 1, photo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop", title: "iPhone 14 Pro Max", user: "John Doe", category: "Electronics", status: "approved", date: "2025-11-21" },
  { id: 2, photo: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=80&fit=crop", title: "MacBook Pro 16", user: "Jane Smith", category: "Computers", status: "pending", date: "2025-11-20" },
  { id: 3, photo: "https://images.unsplash.com/photo-1512446816042-444d641267ee?w=80&h=80&fit=crop", title: "Sony WH-1000XM5", user: "Mike Johnson", category: "Audio", status: "approved", date: "2025-11-19" },
  { id: 4, photo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop", title: "iPad Air", user: "Sarah Williams", category: "Tablets", status: "rejected", date: "2025-11-18" },
  { id: 5, photo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop", title: "Apple Watch Series 9", user: "Tom Brown", category: "Wearables", status: "pending", date: "2025-11-17" },
];

const badgeClass = (status: AdRow["status"]) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function LatestAdsTable() {
  const columns: ColumnDef<AdRow>[] = [
    {
      accessorKey: "index",
      header: "Index",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "photo",
      header: "Photo",
      cell: ({ row }) => (
        <Image src={row.original.photo} alt="ad" width={48} height={48} className="rounded-md object-cover" />
      ),
      enableSorting: false,
    },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "user", header: "User" },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ getValue }) => (
        <span className="inline-flex px-2 py-1 rounded bg-blue-100 text-blue-700">{String(getValue())}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const v = getValue() as AdRow["status"]; 
        return <span className={`inline-flex px-2 py-1 rounded ${badgeClass(v)}`}>{v}</span>;
      },
    },
    { accessorKey: "date", header: "Date" },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("view", row.original.id)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("edit", row.original.id)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("delete", row.original.id)} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
  ];

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-3">Latest Ads</h2>
      <DataTable columns={columns} data={rows} pageSize={5} />
    </div>
  );
}
