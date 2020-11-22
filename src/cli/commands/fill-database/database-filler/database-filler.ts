import { hash } from 'bcrypt';
import { Connection } from 'typeorm';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { v4 as uuidv4 } from 'uuid';

import {
  CityOrmEntity,
  FeatureOrmEntity,
  HotelOrmEntity,
  HotelTypeOrmEntity,
  ImageOrmEntity,
  LocationOrmEntity,
  RatingOrmEntity,
  UserOrmEntity,
  UserTypeOrmEntity,
} from '../../../../modules/orm-entities';
import { IDatabaseFillerParams, ICityParam } from './database-filler.interface';
import { getRandomEmail, getRandomInt, getRandomString, shuffle } from '../utils';
import { userParams } from '../data';


export class DatabaseFiller {
  private _cityOrmEntities: CityOrmEntity[];
  private _userTypesOrmEntities: UserTypeOrmEntity[];
  private _hotelTypeOrmEntities: HotelTypeOrmEntity[];
  private _featureOrmEntities: FeatureOrmEntity[];
  private _userOrmEntities: UserOrmEntity[];
  private _hotelOrmEntities: HotelOrmEntity[];


  constructor(
    private readonly _connection: Connection,
    private readonly _params: IDatabaseFillerParams
  ) {}


  public async fill(count: number): Promise<void> {
    this._cityOrmEntities = await this.fillCitiesTable();
    this._userTypesOrmEntities = await this.fillUserTypesTable();
    this._hotelTypeOrmEntities = await this.fillHotelTypesTable();
    this._featureOrmEntities = await this.fillFeaturesTable();
    if (count !== 0) {
      this._userOrmEntities = await this.fillUsersTable(count);
      this._hotelOrmEntities = await this.fillHotelsTable(count);
      await this.fillRatingsTable();
    }
  }


  public async fillCitiesTable() {
    const newCities = this._params.cities.map((city: ICityParam): CityOrmEntity => ({
      id: uuidv4(),
      title: city.name,
      location: {
        ...city.location,
        id: uuidv4(),
      },
    }));
    const newLocations = newCities.map((city: CityOrmEntity) => city.location);
    await this.save(LocationOrmEntity, newLocations);
    return this.save(CityOrmEntity, newCities);
  }


  public async fillUserTypesTable(): Promise<UserTypeOrmEntity[]> {
    const userTypeOrmEntities: UserTypeOrmEntity[] = this._params.users.types.map((userType: string): UserTypeOrmEntity => ({
      id: uuidv4(),
      title: userType,
    }));
    return this.save(UserTypeOrmEntity, userTypeOrmEntities);
  }


  public async fillHotelTypesTable(): Promise<HotelTypeOrmEntity[]> {
    const hotelTypeOrmEntities: HotelTypeOrmEntity[] = this._params.hotels.types.map((hotelType: string): HotelTypeOrmEntity => ({
      id: uuidv4(),
      title: hotelType,
    }));
    return this.save(HotelTypeOrmEntity, hotelTypeOrmEntities);
  }


  public async fillFeaturesTable(): Promise<FeatureOrmEntity[]> {
    const featureOrmEntities: FeatureOrmEntity[] = this._params.hotels.features.map((feature: string): FeatureOrmEntity => ({
      id: uuidv4(),
      title: feature,
    }));
    return this.save(FeatureOrmEntity, featureOrmEntities);
  }


  public async fillUsersTable(count: number): Promise<UserOrmEntity[]> {
    const password = await hash(getRandomString(6), 10);
    const proUserType: UserTypeOrmEntity = this._userTypesOrmEntities.find((userTypeOrmEntity: UserTypeOrmEntity) => userTypeOrmEntity.title === `pro`);
    const standardUserType: UserTypeOrmEntity = this._userTypesOrmEntities.find((userTypeOrmEntity: UserTypeOrmEntity) => userTypeOrmEntity.title === `standard`);
    const usersOrmEntities: UserOrmEntity[] = Array(count).fill(``).map((item: string, index: number) => {
      const email = getRandomEmail(15, [`ru`, `com`]);
      return {
        id: uuidv4(),
        password,
        email,
        name: email.split(`@`)[0],
        type: index === 0 ? proUserType : standardUserType,
        image: {
          id: uuidv4(),
          title: userParams.images[getRandomInt(0, userParams.images.length - 1)]
        },
      }
    });

    const imageOrmEntities = usersOrmEntities.map((usersOrmEntity: UserOrmEntity) => usersOrmEntity.image);
    await this.save(ImageOrmEntity, imageOrmEntities);
    return this.save(UserOrmEntity, usersOrmEntities);
  }


  public async fillHotelsTable(count: number): Promise<HotelOrmEntity[]> {
    const hotelOrmEntities: HotelOrmEntity[] = Array(count).fill(``).map(() => {
      const city = this._cityOrmEntities[getRandomInt(0, this._cityOrmEntities.length - 1)];
      const locationParams = this._params.cities.find((cityParams: ICityParam) => cityParams.name === city.title);
      return {
        id: uuidv4(),
        title: this._params.hotels.titles[getRandomInt(0, this._params.hotels.titles.length - 1)],
        description: this._params.hotels.descriptions[getRandomInt(0, this._params.hotels.descriptions.length - 1)],
        bedroomCount: getRandomInt(1, 3),
        maxAdultCount: getRandomInt(1, 8),
        price: getRandomInt(50, 2000),
        isPremium: Math.random() > 0.5,
        features: shuffle(this._featureOrmEntities).slice(0, getRandomInt(0, this._params.hotels.features.length - 1)),
        type: this._hotelTypeOrmEntities[getRandomInt(0, this._hotelTypeOrmEntities.length - 1)],
        host: this._userOrmEntities.find((user: UserOrmEntity) => user.type.title === `pro`),
        images: shuffle(this._params.hotels.images).slice(0, getRandomInt(1, 10)).map((title: string) => ({
          id: uuidv4(),
          title,
        })),
        city,
        location: {
          id: uuidv4(),
          latitude: getRandomInt(locationParams.from.latitude * 100000, locationParams.to.latitude * 100000) / 100000,
          longitude: getRandomInt(locationParams.from.longitude * 100000, locationParams.to.longitude * 100000) / 100000,
          zoom: 10,
        },
      }
    });

    const locationOrmEntities: LocationOrmEntity[] = [];
    const imageOrmEntities: ImageOrmEntity[] = [];
    hotelOrmEntities.forEach((hotel: HotelOrmEntity) => {
      locationOrmEntities.push(hotel.location);
      imageOrmEntities.push(...hotel.images);
    });
    await this.save(LocationOrmEntity, locationOrmEntities);
    await this.save(ImageOrmEntity, imageOrmEntities);
    return this.save(HotelOrmEntity, hotelOrmEntities);
  }


  public async fillRatingsTable(): Promise<RatingOrmEntity[]> {
    const standardUsers: UserOrmEntity[] = this._userOrmEntities.filter((user: UserOrmEntity) => user.type.title === `standard`);
    const ratingOrmEntities: RatingOrmEntity[] = standardUsers.reduce((acc: RatingOrmEntity[], user: UserOrmEntity) => {
      const ratingEntities: RatingOrmEntity[] = shuffle(this._hotelOrmEntities)
        .slice(0, getRandomInt[this._hotelOrmEntities.length - 1])
        .map((hotel: HotelOrmEntity): RatingOrmEntity => ({
          value: getRandomInt(1, 5),
          hotelId: hotel.id,
          userId: user.id,
        }));
      acc.push(...ratingEntities);
      return acc;
    }, []);
    return this.save(RatingOrmEntity, ratingOrmEntities);
  }


  public async save<Entity, DateType>(OrmEntity: EntityTarget<Entity>, date: DateType[]): Promise<Entity[]> {
    const repository = this._connection.getRepository(OrmEntity);
    const newEntity: Entity[] = repository.create(date);
    return repository.save(newEntity);
  }
}
