export interface ICoordinate {
  latitude: number;
  longitude: number;
}

export interface ILocationParam extends ICoordinate {
  zoom: number;
}

export interface ICityParam {
  name: string;
  location: ILocationParam;
  from: ICoordinate;
  to: ICoordinate;
}

export interface IHotelParams {
  titles: string[];
  descriptions: string[];
  images: string[];
  types: string[];
  features: string[];
}

export interface IUserParams {
  types: string[];
  images: string[];
}

export interface IDatabaseFillerParams {
  cities: ICityParam[];
  hotels: IHotelParams;
  users: IUserParams;
}
