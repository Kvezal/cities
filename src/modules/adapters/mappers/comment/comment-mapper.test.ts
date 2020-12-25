import {
  CommentEntity,
  IComment,
  IUser,
} from 'domains/entities';

import { CommentMapper } from './comment-mapper';
import { ICommentTableParams } from 'modules/db/interfaces';
import { UserMapper } from 'modules/adapters';


const userParams: IUser = {
  id: `1008131ec-cb07-499a-86e4-6674afa31532`,
  name: `name`,
  email: `email@gmail.com`,
  password: `password`,
  image: {
    id: `1`,
    title: `title`,
  },
  type: {
    id: `1`,
    title: `title`,
  },
};

const commentTableParams: ICommentTableParams = {
  id: `008131ec-cb07-499a-86e4-6674afa31532`,
  text: `text`,
  created_at: `2020-12-25T02:07:14.730Z`,
  rating: 4,
  user: userParams,
  hotel_id: `008131ec-cb07-499a-86e4-6674afa31532`,
};

const commentEntityParams: IComment = {
  id: commentTableParams.id,
  text: commentTableParams.text,
  createdAt: new Date(commentTableParams.created_at),
  rating: commentTableParams.rating,
  user: UserMapper.mapToDomain(commentTableParams.user),
  hotelId: commentTableParams.hotel_id,
}

describe(`CommentMapper`, () => {
  const commentEntity: CommentEntity = CommentEntity.create(commentEntityParams);

  describe(`mapToDomain`, () => {
    it('should call create method of CommentEntity', function() {
      CommentEntity.create = jest.fn(CommentEntity.create);
      CommentMapper.mapToDomain(commentTableParams);
      expect(CommentEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of CommentEntity with params', function() {
      CommentEntity.create = jest.fn(CommentEntity.create);
      CommentMapper.mapToDomain(commentTableParams);
      expect(CommentEntity.create).toHaveBeenCalledWith(commentEntityParams);
    });

    it('should return create method result of CommentEntity', function() {
      CommentEntity.create = jest.fn(CommentEntity.create).mockReturnValue(commentEntity);
      const result = CommentMapper.mapToDomain(commentTableParams);
      expect(result).toEqual(commentEntity);
    });

    it.each([
      `id`,
      `text`,
      `createdAt`,
      `rating`,
      `user`,
      `hotelId`,
    ])('should have %p property in result', function(property: string) {
      const result = CommentMapper.mapToDomain(commentTableParams);
      expect(result).toHaveProperty(property);
    });
  });

  describe(`mapToTableParams`, () => {
    it('should return CommentViewOrmEntity', function() {
      const result = CommentMapper.mapToTableParams(commentEntity);
      expect(result).toEqual(commentTableParams);
    });

    it.each([
      `id`,
      `text`,
      `created_at`,
      `rating`,
      `user`,
      `hotel_id`,
    ])('should have %p property in result', function(property: string) {
      const result = CommentMapper.mapToTableParams(commentEntity);
      expect(result).toHaveProperty(property);
    });
  });
});
