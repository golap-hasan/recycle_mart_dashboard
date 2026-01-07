export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  role: string;
  isActive: boolean;
  isVerifiedByOTP?: boolean;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt?: string;
  passwordChangedAt?: string;
}
