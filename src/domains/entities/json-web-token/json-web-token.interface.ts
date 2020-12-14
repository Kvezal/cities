export interface IJsonWebToken {
  accessToken: string;
  refreshToken: string;
}

export interface IJsonWebTokenParams {
  id: string;
  name: string;
  email: string;
  image: string;
}
