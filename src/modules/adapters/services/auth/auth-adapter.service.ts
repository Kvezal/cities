import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeleteJsonWebTokenPort, CheckExistedJsonWebTokenPort, SaveJsonWebTokenPort } from 'domains/ports';

import { JsonWebTokenOrmEntity } from '../../orm-entities';


export class AuthAdapterService implements
  CheckExistedJsonWebTokenPort,
  SaveJsonWebTokenPort,
  DeleteJsonWebTokenPort {
  constructor(
    @InjectRepository(JsonWebTokenOrmEntity) private readonly _jsonWebTokenRepository: Repository<JsonWebTokenOrmEntity>
  ) {}

  public async checkExistedJsonWebToken(refreshToken: string): Promise<boolean> {
    const refreshTokenOrmEntity = await this._jsonWebTokenRepository.findOne({
      token: refreshToken,
    });
    return Boolean(refreshTokenOrmEntity);
  }

  public async saveJsonWebToken(refreshToken: string): Promise<void> {
    const jsonWebTokenOrmEntity = this._jsonWebTokenRepository.create({
      token: refreshToken,
    });
    await this._jsonWebTokenRepository.save(jsonWebTokenOrmEntity);
  }

  public async deleteJsonWebToken(refreshToken: string): Promise<void> {
    await this._jsonWebTokenRepository.delete({
      token: refreshToken,
    });
  }
}
