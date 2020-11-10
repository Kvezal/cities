import { UserType } from './user-type';
import { IUserType } from './user-type.interface';


const userTypeParams: IUserType = {
  id: 1,
  title: `title`,
};

describe(`UserType entity`, () => {
  describe(`constructor`, () => {
    let userType: UserType;

    beforeAll(() => {
      userType = new UserType(
        userTypeParams.id,
        userTypeParams.title
      );
    });

    it.each([`id`, `title`])(`should create a new UserType instance with correct %p property`, (property) => {
      expect(userType[property]).toBe(userTypeParams[property]);
    });
  });

  describe(`create method`, () => {
    let userType: UserType;

    beforeAll(() => {
      userType = UserType.create(userTypeParams);
    });

    it(`should create a new UserType instance`, () => {
      expect(userType).toBeInstanceOf(UserType);
    });

    it.each([`id`, `title`])(`should create a new UserType instance with correct %p property`, (property) => {
      expect(userType[property]).toBe(userTypeParams[property]);
    });
  })
});
