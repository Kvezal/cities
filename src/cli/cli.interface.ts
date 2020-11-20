export interface ICli {
  name: string,
  alias: string,
  description: {
    text: string,
    option: string,
  },
  run(...args: string[]): Promise<void>,
}
