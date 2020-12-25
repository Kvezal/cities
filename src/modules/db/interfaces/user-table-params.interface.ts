import { IHotelTypeTableParams } from './hotel-type-table-params.interface';
import { IImageTableParams } from './image-table-params.interface';


export interface IUserTableParams {
  id: string;
  name: string;
  email: string;
  password: string;
  image: IImageTableParams;
  type: IHotelTypeTableParams;
}
