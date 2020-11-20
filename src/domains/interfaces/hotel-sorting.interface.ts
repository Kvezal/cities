export enum ESortingType {
  POPULAR = `popular`,
  RATING = `rating`,
  HIGH_PRICE= `high-price`,
  LOW_PRICE = `low-price`,
}

export interface IHotelSortingParams {
  cityId: string,
  type?: ESortingType,
}
