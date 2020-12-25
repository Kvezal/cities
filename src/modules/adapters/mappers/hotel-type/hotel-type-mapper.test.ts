import {
  HotelTypeEntity,
  IHotelType,
} from 'domains/entities';

import { HotelTypeMapper } from './hotel-type-mapper';
import { IHotelTypeTableParams } from 'modules/db/interfaces';


const hotelTypeTableParams: IHotelTypeTableParams = {
  id: `1008131ec-cb07-499a-86e4-6674afa31532`,
  title: `title`,
};

const hotelTypeEntityParams: IHotelType = {
  id: hotelTypeTableParams.id,
  title: hotelTypeTableParams.title,
};


describe(`Hotel type Mapper`, () => {
  const entity: HotelTypeEntity = HotelTypeEntity.create(hotelTypeEntityParams);

  describe(`mapToDomain`, () => {
    it('should call create method of HotelTypeEntity', function() {
      HotelTypeEntity.create = jest.fn(HotelTypeEntity.create);
      HotelTypeMapper.mapToDomain(hotelTypeTableParams);
      expect(HotelTypeEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of HotelTypeEntity with params', function() {
      HotelTypeEntity.create = jest.fn(HotelTypeEntity.create);
      HotelTypeMapper.mapToDomain(hotelTypeTableParams);
      expect(HotelTypeEntity.create).toHaveBeenCalledWith(hotelTypeTableParams);
    });

    it('should return create method result of HotelTypeEntity', function() {
      HotelTypeEntity.create = jest.fn(HotelTypeEntity.create).mockReturnValue(entity);
      const result: HotelTypeEntity = HotelTypeMapper.mapToDomain(hotelTypeTableParams);
      expect(result).toEqual(entity);
    });

    it.each([`id`, `title`])('should have %p property in result', function(property: string) {
      const result: HotelTypeEntity = HotelTypeMapper.mapToDomain(hotelTypeTableParams);
      expect(result).toHaveProperty(property);
    });
  });

  describe(`mapToOrmEntity`, () => {
    it('should return FeatureOrmEntity', function() {
      const result: IHotelTypeTableParams = HotelTypeMapper.mapToTableParams(entity);
      expect(result).toEqual(hotelTypeEntityParams);
    });

    it.each([`id`, `title`])('should have %p property in result', function(property: string) {
      const result: IHotelTypeTableParams = HotelTypeMapper.mapToTableParams(entity);
      expect(result).toHaveProperty(property);
    });
  });
});
