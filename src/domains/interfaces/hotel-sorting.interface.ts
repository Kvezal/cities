export enum ESortingType {
  POPULAR = `popular`,
  RATING = `rating`,
  HIGH_PRICE= `high-price`,
  LOW_PRICE = `low-price`,
  NEARBY = `nearby`,
}

export interface IHotelSortingParams {
  cityId?: string;
  userId?: string;
  hotelId?: string;
  isFavorite?: boolean;
  type?: ESortingType;
}
