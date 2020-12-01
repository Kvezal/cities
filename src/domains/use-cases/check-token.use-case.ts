export interface CheckTokenUseCase {
  checkAccessToken(token: string): Promise<boolean>;
}
