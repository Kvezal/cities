export interface IComment {
  id?: string;
  text: string;
  createdAt?: Date;
  hotelId: string;
  userId: string;
  rating: number;
}
