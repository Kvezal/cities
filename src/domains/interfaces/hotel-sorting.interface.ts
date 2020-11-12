export enum ESortingType {
  POPULAR = `popular`,
  RATING = `rating`,
  HIGN_PRICE= `high-price`,
  LOW_PRICE = `low-price`,
}

export interface IHotelSortingParams {
  cityId: number,
  type?: ESortingType,
}
