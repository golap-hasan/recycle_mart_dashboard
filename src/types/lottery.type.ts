export interface Lottery {
  _id: string;
  title: string;
  description?: string;
  drawDate: string;
  ticketPrice: number;
  participantsCount: number;
  prize: string | null;
  image: string | null;
  status: "ACTIVE" | "INACTIVE" | "COMPLETED";
  winnerToken: string | null;
  createdAt: string;
  updatedAt: string;
}
