export interface Subscribers {
  _id: string;
  user: {
    _id: string;
    name: string;
    phone: string;
    image: string;
    email: string;
    otp: string;
    otpExpiry: string;
    isVerifiedByOTP: boolean;
    role: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    passwordChangedAt: string;
  };
  autoRenew: boolean;
  createdAt: string;
  credits: number;
  plan: {
    _id: string;
    name: string;
    price: number;
    currency: string;
    durationUnit: string;
    durationValue: number;
    adsLimit: number;
    features: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  renewsAt: string;
  status: "ACTIVE" | "INACTIVE" | "EXPIRED";
  updatedAt: string;
}