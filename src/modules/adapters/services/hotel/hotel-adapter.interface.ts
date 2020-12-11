export enum  EOrderType {
  ASC = `ASC`,
  DESC = `DESC`,
}

export interface IOrderParams {
  condition: string,
  type: EOrderType,
}