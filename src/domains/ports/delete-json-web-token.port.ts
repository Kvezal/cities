export interface DeleteJsonWebTokenPort {
  deleteJsonWebToken(refreshToken: string): Promise<void>;
}
