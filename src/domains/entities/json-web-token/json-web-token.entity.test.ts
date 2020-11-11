import { JsonWebTokenEntity } from './json-web-token.entity';


describe(`Json Web Token entity`, () => {
  const jsonWebTokenEntityParams = {
    accessToken: `accessToken`,
    refreshToken: `refreshToken`,
  };

  const jsonWebTokenParams = {
    id: 1,
    name: `name`,
    email: `email@gmail.com`,
    type: {
      id: 1,
      title: `title`,
    },
    image: {
      id: 1,
      title: `title`,
    },
  };

  describe(`constructor`, () => {
    let jsonWebTokenEntity: JsonWebTokenEntity;

    beforeAll(() => {
      jsonWebTokenEntity = new JsonWebTokenEntity(
        jsonWebTokenEntityParams.accessToken,
        jsonWebTokenEntityParams.refreshToken
      );
    });

    it.each(
      [`accessToken`, `refreshToken`]
    )(`should create a new JsonWebTokenEntity instance with correct %p property`, (property) => {
      expect(jsonWebTokenEntity[property]).toBe(jsonWebTokenEntityParams[property]);
    });
  });

  describe(`create method`, () => {
    let jsonWebTokenEntity: JsonWebTokenEntity;

    beforeAll(() => {
      jsonWebTokenEntity = JsonWebTokenEntity.create(jsonWebTokenEntityParams);
    });

    it.each(
      [`accessToken`, `refreshToken`]
    )(`should create a new JsonWebTokenEntity instance with correct %p property`, (property) => {
      expect(jsonWebTokenEntity[property]).toBe(jsonWebTokenEntityParams[property]);
    });
  });

  describe(`generate method`, () => {
    let jsonWebTokenEntity: JsonWebTokenEntity;

    beforeAll(() => {
      jsonWebTokenEntity = JsonWebTokenEntity.generate(jsonWebTokenParams);
    });

    it.each(
      [`accessToken`, `refreshToken`]
    )(`should create a new JsonWebTokenEntity instance with property`, (property) => {
      expect(jsonWebTokenEntity).toHaveProperty(property);
    });
  });
});
