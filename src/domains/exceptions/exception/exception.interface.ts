export interface IExceptionParams<EField = null, EType = null> {
  field?: EField;
  message: string;
  type?: EType;
}
