import { CommentEntity } from './comment.entity';
import { IComment } from './comment.interface';


const commentParams: IComment = {
  id: `1`,
  text: `text`,
  createdAt: new Date(),
  hotelId: `1`,
  userId: `1`,
  rating: 4,
};

describe(`Comment entity`, () => {
  describe(`constructor`, () => {
    let comment: CommentEntity;

    beforeAll(() => {
      comment = CommentEntity.create(commentParams);
    });

    it.each(
      [`id`, `text`, `date`, `hotelId`, `userId`],
    )(`should create a new Comment instance with correct %p property`, (property) => {
      expect(comment[property]).toBe(commentParams[property]);
    });
  });

  describe(`create method`, () => {
    let comment: CommentEntity;

    beforeAll(() => {
      comment = CommentEntity.create(commentParams);
    });

    it.each(
      [`id`, `text`, `date`, `hotelId`, `userId`],
    )(`should create a new Comment instance with correct %p property`, (property) => {
      expect(comment[property]).toBe(commentParams[property]);
    });
  });
});
