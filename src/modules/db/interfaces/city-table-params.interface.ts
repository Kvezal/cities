import { ILocationTableParams } from './location-table-params.interface';


export interface ICityTableParams {
  id: string;
  title: string;
  location: ILocationTableParams
}
