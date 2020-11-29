export interface SaveJsonWebTokenPort {
  saveJsonWebToken(refreshToken: string): Promise<void>;
}
