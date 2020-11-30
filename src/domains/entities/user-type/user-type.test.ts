import { UserTypeEntity } from './user-type.entity';
import { IUserType } from './user-type.interface';


const userTypeParams: IUserType = {
  id: `1`,
  title: `title`,
};

describe(`UserType entity`, () => {
  describe(`constructor`, () => {
    let userType: UserTypeEntity;

    beforeAll(() => {
      userType = new UserTypeEntity(
        userTypeParams.id,
        userTypeParams.title
      );
    });

    it.each([`id`, `title`])(`should create a new UserType instance with correct %p property`, (property) => {
      expect(userType[property]).toBe(userTypeParams[property]);
    });
  });

  describe(`create method`, () => {
    let userType: UserTypeEntity;

    beforeAll(() => {
      userType = UserTypeEntity.create(userTypeParams);
    });

    it(`should create a new UserType instance`, () => {
      expect(userType).toBeInstanceOf(UserTypeEntity);
    });

    it.each([`id`, `title`])(`should create a new UserType instance with correct %p property`, (property) => {
      expect(userType[property]).toBe(userTypeParams[property]);
    });
  })
});
