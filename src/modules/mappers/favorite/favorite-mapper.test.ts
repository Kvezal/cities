// import { FavoriteEntity, IFavorite } from 'domains/entities';
// import { FavoriteOrmEntity } from 'modules/orm-entities';
//
// import { FavoriteMapper } from './favorite-mapper';
//
//
// const favoriteEntityParams: IFavorite = {
//   value: true,
//   userId: `1`,
//   hotelId: `1`,
// };
//
// describe(`City Mapper`, () => {
//   const entity: FavoriteEntity = FavoriteEntity.create(favoriteEntityParams);
//   const ormEntity = new FavoriteOrmEntity;
//   ormEntity.value = favoriteEntityParams.value;
//   ormEntity.user = favoriteEntityParams.userId;
//   ormEntity.hotel = favoriteEntityParams.hotelId;
//
//   describe(`mapToDomain`, () => {
//     it('should call create method of FavoriteEntity', function() {
//       FavoriteEntity.create = jest.fn(FavoriteEntity.create);
//       FavoriteMapper.mapToDomain(ormEntity);
//       expect(FavoriteEntity.create).toHaveBeenCalledTimes(1);
//     });
//
//     it('should call create method of FavoriteEntity with params', function() {
//       FavoriteEntity.create = jest.fn(FavoriteEntity.create);
//       FavoriteMapper.mapToDomain(ormEntity);
//       expect(FavoriteEntity.create).toHaveBeenCalledWith(favoriteEntityParams);
//     });
//
//     it('should return create method result of FavoriteEntity', function() {
//       FavoriteEntity.create = jest.fn(FavoriteEntity.create).mockReturnValue(entity);
//       const result = FavoriteMapper.mapToDomain(ormEntity);
//       expect(result).toEqual(entity);
//     });
//   });
//
//   describe(`mapToOrmEntity`, () => {
//     it('should return FavoriteOrmEntity', function() {
//       const result = FavoriteMapper.mapToOrmEntity(entity);
//       expect(result).toEqual(ormEntity);
//     });
//
//     it.each([`value`, `user`, `hotel`])('should have %p property in result', function(property) {
//       const result = FavoriteMapper.mapToOrmEntity(entity);
//       expect(result).toHaveProperty(property);
//     });
//   });
// });
