import { User } from "./users.type";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Ad {
  _id: string;
  user: User;
  categoryId: Category | null;
  condition: "new" | "used" | "refurbished";
  title: string;
  description: string;
  price: number;
  negotiable: boolean;
  location: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  images: string[];
  status: "ACTIVE" | "PENDING" | "REJECTED" | "EXPIRED" | "DELETED";
  rejectReason: string | null;
  rejectNote: string | null;
  isFeatured: boolean;
  isUrgent: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}
