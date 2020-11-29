import { Connection, ViewColumn, ViewEntity } from 'typeorm';

import { CommentOrmEntity, RatingOrmEntity } from '../orm-entities';


@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select(`comments.id`, `id`)
    .addSelect(`comments.text`, `text`)
    .addSelect(`comments.createdAt`, `createdAt`)
    .addSelect(`ratings.value`, `rating`)
    .addSelect(`comments.hotelId`, `hotelId`)
    .addSelect(`comments.userId`, `userId`)
    .from(CommentOrmEntity, `comments`)
    .leftJoin(RatingOrmEntity, `ratings`, `ratings.hotelId = comments.hotelId AND ratings.userId = comments.userId`)
})
export class CommentViewOrmEntity {
  @ViewColumn()
  public id: string;

  @ViewColumn()
  public text: string;

  @ViewColumn()
  public createdAt?: Date;

  @ViewColumn()
  public rating: number;

  @ViewColumn()
  public hotelId: string;

  @ViewColumn()
  public userId: string;
}
