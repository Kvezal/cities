import 'dotenv/config';


export class ConfigService {
  private _env = process.env;

  public getGlobalEnvironmentVariable(name: string): string {
    return this._env[name];
  }
}
