export enum ESortingType {
  POPULAR = `popular`,
  RATING = `rating`,
  HIGH_PRICE= `high-price`,
  LOW_PRICE = `low-price`,
}

export enum ESortingFilter {
  NEARBY = `nearby`,
  FAVORITE = `favorite`,
}

export interface IHotelSortingParams {
  cityId?: string,
  userId?: string,
  hotelId?: string,
  type?: ESortingType,
  filter?: ESortingFilter,
}
