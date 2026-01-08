export interface Plan {
  _id: string;
  name: "Free" | "Basic" | "Premium";
  price: number;
  currency: "BDT";
  durationUnit: "MONTH" | "YEAR";
  durationValue: number;
  adsLimit: number;
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
