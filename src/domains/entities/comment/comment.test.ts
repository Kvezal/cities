import { CommentEntity } from './comment.entity';
import { IComment } from './comment.interface';


const commentParams: IComment = {
  id: `93498b22-73e4-40ab-a632-faf9ff7da893`,
  text: `text`,
  createdAt: new Date(),
  hotelId: `c17dab56-94f8-4d86-9835-221b5b7291f2`,
  user: {
    id: `cbf10244-cae7-47ac-b385-b2ceb103051a`,
    name: `name`,
    email: `email@gmail.com`,
    password: `password`,
    type: {
      id: `d3db316e-dbe7-43af-b1a9-b184d4baa264`,
      title: `title`,
    },
    image: {
      id: `d9f29621-4739-4305-a72f-90a04542cb28`,
      title: `title`,
    },
  },
  rating: 4,
};

describe(`Comment entity`, () => {
  describe(`constructor`, () => {
    let comment: CommentEntity;

    beforeAll(() => {
      comment = CommentEntity.create(commentParams);
    });

    it(`should create a new Comment instance with "user" property`, () => {
      expect(comment).toHaveProperty(`user`);
    })

    it.each(
      [`id`, `text`, `date`, `rating`, `hotelId`],
    )(`should create a new Comment instance with correct %p property`, (property) => {
      expect(comment[property]).toBe(commentParams[property]);
    });
  });

  describe(`create method`, () => {
    let comment: CommentEntity;

    beforeAll(() => {
      comment = CommentEntity.create(commentParams);
    });

    it(`should create a new Comment instance with "user" property`, () => {
      expect(comment).toHaveProperty(`user`);
    })

    it.each(
      [`id`, `text`, `date`, `hotelId`],
    )(`should create a new Comment instance with correct %p property`, (property) => {
      expect(comment[property]).toBe(commentParams[property]);
    });
  });
});
