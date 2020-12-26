export interface LogoutUseCase {
  logout(refreshToken: string): Promise<void>;
}
