import { Exception } from 'domains/exceptions';

import { EHotelField } from './hotel.exception.interface';


export class HotelException extends Exception<EHotelField> {}