import { CommentEntity, IComment } from 'domains/entities';
import { CommentViewOrmEntity } from 'modules/adapters/view-orm-entities';

import { CommentViewMapper } from './comment-view-mapper';


const entityParams: IComment = {
  id: `1`,
  text: `text`,
  createdAt: new Date(),
  rating: 4,
  userId: `1`,
  hotelId: `1`,
};

describe(`Comment View Mapper`, () => {
  const entity: CommentEntity = CommentEntity.create(entityParams);
  const ormEntity = new CommentViewOrmEntity;
  ormEntity.id = entityParams.id;
  ormEntity.text = entityParams.text;
  ormEntity.createdAt = entityParams.createdAt;
  ormEntity.rating = entityParams.rating;
  ormEntity.userId = entityParams.userId;
  ormEntity.hotelId = entityParams.hotelId;

  describe(`mapToDomain`, () => {
    it('should call create method of CommentEntity', function() {
      CommentEntity.create = jest.fn(CommentEntity.create);
      CommentViewMapper.mapToDomain(ormEntity);
      expect(CommentEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of CommentEntity with params', function() {
      CommentEntity.create = jest.fn(CommentEntity.create);
      CommentViewMapper.mapToDomain(ormEntity);
      expect(CommentEntity.create).toHaveBeenCalledWith(entityParams);
    });

    it('should return create method result of CommentEntity', function() {
      CommentEntity.create = jest.fn(CommentEntity.create).mockReturnValue(entity);
      const result = CommentViewMapper.mapToDomain(ormEntity);
      expect(result).toEqual(entity);
    });
  });

  describe(`mapToOrmEntity`, () => {
    it('should return CommentViewOrmEntity', function() {
      const result = CommentViewMapper.mapToOrmEntity(entity);
      expect(result).toEqual(ormEntity);
    });

    it.each([
      `id`,
      `text`,
      `createdAt`,
      `rating`,
      `userId`,
      `hotelId`
    ])('should have %p property in result', function(property: string) {
      const result = CommentViewMapper.mapToOrmEntity(entity);
      expect(result).toHaveProperty(property);
    });
  });
});
