import { CommentEntity } from 'domains/entities';

import { CommentViewOrmEntity } from '../../view-orm-entities';


export class CommentViewMapper {
  static mapToDomain(ormEntity: CommentViewOrmEntity): CommentEntity {
    return CommentEntity.create({
      id: ormEntity.id,
      text: ormEntity.text,
      createdAt: ormEntity.createdAt,
      rating: ormEntity.rating,
      hotelId: ormEntity.hotelId,
      userId: ormEntity.userId,
    });
  }

  static mapToOrmEntity(domain: CommentEntity): CommentViewOrmEntity {
    const ormEntity = new CommentViewOrmEntity();
    ormEntity.id = domain.id;
    ormEntity.text = domain.text;
    ormEntity.createdAt = domain.createdAt;
    ormEntity.rating = domain.rating;
    ormEntity.hotelId = domain.hotelId;
    ormEntity.userId = domain.userId;
    return ormEntity;
  }
}
