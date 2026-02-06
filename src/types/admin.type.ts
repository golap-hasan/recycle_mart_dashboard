export interface Admin {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  role: "ADMIN" | "SUPER_ADMIN";
  isActive: boolean;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}
