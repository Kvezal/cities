export interface CheckExistedJsonWebTokenPort {
  checkExistedJsonWebToken(refreshToken: string): Promise<boolean>;
}
