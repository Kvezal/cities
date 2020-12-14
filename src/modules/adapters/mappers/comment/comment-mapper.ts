import { CommentEntity } from 'domains/entities';

import { CommentOrmEntity } from '../../orm-entities';
import { UserMapper } from '../user';
import { HotelMapper } from '../hotel';


export class CommentMapper {
  static mapToDomain(ormEntity: CommentOrmEntity): CommentEntity {
    return CommentEntity.create({
      id: ormEntity.id,
      text: ormEntity.text,
      createdAt: ormEntity.createdAt,
      rating: ormEntity.rating,
      hotel: HotelMapper.mapToDomain(ormEntity.hotel),
      user: UserMapper.mapToDomain(ormEntity.user),
    });
  }

  static mapToOrmEntity(domain: CommentEntity): CommentOrmEntity {
    const ormEntity = new CommentOrmEntity();
    ormEntity.id = domain.id;
    ormEntity.text = domain.text;
    ormEntity.createdAt = domain.createdAt;
    ormEntity.rating = domain.rating;
    ormEntity.hotel = HotelMapper.mapToOrmEntity(domain.hotel);
    ormEntity.user = UserMapper.mapToOrmEntity(domain.user);
    return ormEntity;
  }
}
