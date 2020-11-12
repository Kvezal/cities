import { IImage } from '../image';


export interface IJsonWebToken {
  accessToken: string;
  refreshToken: string;
}

export interface IJsonWebTokenParams {
  id: number;
  name: string;
  email: string;
  image: IImage;
}
