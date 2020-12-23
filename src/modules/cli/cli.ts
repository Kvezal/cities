import { readdir } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import { green, red } from 'chalk';


class Cli {
  private readonly _commandMap = new Map();
  private readonly _commandsDir = resolve(__dirname, `./commands`);

  constructor(
    private readonly _userCommand: string,
    private readonly _userArgs: string[] = []
  ) {}

  static async run(): Promise<void> {
    const argv = process.argv.slice(2);
    const [userCommand, ...userArgs] = argv;
    const cli = new Cli(userCommand, userArgs);
    await cli.initCommands();
    await cli.runUserCommand();
  }

  public async initCommands(): Promise<void> {
    const filePaths = await this._getCommandsInDirectory(this._commandsDir);
    for (const filePath of filePaths) {
      const command = await import(filePath).then((res) => res.command);
      this._commandMap.set(command.name, command.run);
      this._commandMap.set(command.alias, command.run);
    }
  }

  private async _getCommandsInDirectory(path: string): Promise<string[]> {
    const directoryContentList = await promisify(readdir)(path);
    const filePaths = [];
    for (const content of directoryContentList) {
      if (content.match(`.command.ts`)) {
        filePaths.push(resolve(path, content));
        continue;
      }
      try {
        const subFilePath = await this._getCommandsInDirectory(resolve(path, content));
        filePaths.push(...subFilePath);
      } catch (error) {}
    }
    return filePaths;
  }

  public async runUserCommand(): Promise<void> {
    const command = this._commandMap.get(this._userCommand);
    if (!command) {
      console.error(red(`${this._userCommand} command is not existed`));
      process.exit(1);
    }
    await command(...this._userArgs);
    console.info(green(`${this._userCommand} command completed successfully`));
    process.exit(0);
  }
}

Cli.run();
