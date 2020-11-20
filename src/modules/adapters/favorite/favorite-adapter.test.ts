// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
//
// import { FavoriteOrmEntity } from 'modules/orm-entities';
//
// import { FavoriteAdapterService } from './favorite-adapter.service';
// import { IFavorite } from 'domains/entities';
//
//
// const favoriteOrmEntity: FavoriteOrmEntity = {
//   user: `1`,
//   hotel: `1`,
//   value: true,
// };
//
// describe(`Favorite Adapter Service`, () => {
//   let service: FavoriteAdapterService;
//   let repositoryService: Repository<FavoriteOrmEntity>;
//
//   beforeEach(async () => {
//     const testModule: TestingModule = await Test.createTestingModule({
//       providers: [
//         FavoriteAdapterService,
//         {
//           provide: getRepositoryToken(FavoriteOrmEntity),
//           useClass: Repository
//         },
//       ],
//     }).compile();
//     service = testModule.get<FavoriteAdapterService>(FavoriteAdapterService);
//     repositoryService = testModule.get<Repository<FavoriteOrmEntity>>(getRepositoryToken(FavoriteOrmEntity));
//   });
//
//   describe(`loadUserStateOfHotel method`, () => {
//     it(`should call findOne method of repository`, () => {
//       const findOne = jest.spyOn(repositoryService, `findOne`).mockResolvedValueOnce(favoriteOrmEntity)
//     });
//   });
// });
