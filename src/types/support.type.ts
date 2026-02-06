export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isReplied: boolean;
  createdAt: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Contact[];
}
