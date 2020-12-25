import { Inject } from '@nestjs/common';
import {
  DeleteJsonWebTokenPort,
  CheckExistedJsonWebTokenPort,
  SaveJsonWebTokenPort,
} from 'domains/ports';
import { RefreshTokensDbTable } from 'modules/db';


export class AuthAdapterService implements CheckExistedJsonWebTokenPort,
  SaveJsonWebTokenPort,
  DeleteJsonWebTokenPort {
  constructor(
    @Inject(RefreshTokensDbTable) private readonly _refreshTokensDbTable: RefreshTokensDbTable,
  ) {
  }

  public async checkExistedJsonWebToken(token: string): Promise<boolean> {
    const refreshToken = await this._refreshTokensDbTable.findOne({
      value: token,
    });
    return Boolean(refreshToken);
  }

  public async saveJsonWebToken(token: string): Promise<void> {
    await this._refreshTokensDbTable.createOne({
      value: token,
    });
  }

  public async deleteJsonWebToken(token: string): Promise<void> {
    await this._refreshTokensDbTable.removeOne({
      value: token,
    });
  }
}
