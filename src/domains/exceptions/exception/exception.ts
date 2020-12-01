import { IExceptionParams } from './exception.interface';


export class Exception<EField = null, EType = null> extends Error {
  public field: EField;
  public type: EType;
  public description: string;

  constructor(params: IExceptionParams<EField, EType>) {
    super(params.message);
    this.field = params.field;
    this.type = params.type;
    this.description = params.message;
    this.name = this.constructor.name;
  }
}
