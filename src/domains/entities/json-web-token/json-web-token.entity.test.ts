import { JsonWebTokenEntity } from './json-web-token.entity';
import { IJsonWebTokenParams } from './json-web-token.interface';


describe(`Json Web Token entity`, () => {
  const jsonWebTokenEntityParams = {
    accessToken: `accessToken`,
    refreshToken: `refreshToken`,
  };

  const jsonWebTokenParams: IJsonWebTokenParams = {
    id: `1`,
    name: `name`,
    email: `email@gmail.com`,
    image: {
      id: `1`,
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
    )(`should create a new JsonWebTokenEntity instance with correct %p property`, (property: string) => {
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
    )(`should create a new JsonWebTokenEntity instance with correct %p property`, (property: string) => {
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
    )(`should create a new JsonWebTokenEntity instance with property`, (property: string) => {
      expect(jsonWebTokenEntity).toHaveProperty(property);
    });
  });

  describe(`checkAccessToken method`, () => {
    it(`result should return "true" if JWT is valid`, async () => {
      const jsonWebTokenEntity = JsonWebTokenEntity.generate(jsonWebTokenParams);
      const result = await JsonWebTokenEntity.checkAccessToken(jsonWebTokenEntity.accessToken);
      expect(result).toBeTruthy();
    });

    it(`result should return "false" if JWT is invalid`, async () => {
      const jsonWebTokenEntity = JsonWebTokenEntity.create({
        accessToken: `invalid access JWT token`,
        refreshToken: ``,
      });
      const result = await JsonWebTokenEntity.checkAccessToken(jsonWebTokenEntity.accessToken);
      expect(result).toBeFalsy();
    });
  });

  describe(`decodeAccessToken method`, () => {
    it.each(
      [`id`, `name`, `email`, `image`]
    )(`result should have correct %p property value`, async (property: string) => {
      const jsonWebTokenEntity = JsonWebTokenEntity.generate(jsonWebTokenParams);
      const result = await JsonWebTokenEntity.decodeAccessToken(jsonWebTokenEntity.accessToken);
      expect(result[property]).toEqual(jsonWebTokenParams[property]);
    });
  });

  describe(`checkRefreshToken method`, () => {
    it(`result should return "true" if JWT is valid`, async () => {
      const jsonWebTokenEntity = JsonWebTokenEntity.generate(jsonWebTokenParams);
      const result = await JsonWebTokenEntity.checkRefreshToken(jsonWebTokenEntity.refreshToken);
      expect(result).toBeTruthy();
    });

    it(`result should return "false" if JWT is invalid`, async () => {
      const jsonWebTokenEntity = JsonWebTokenEntity.create({
        accessToken: `invalid access JWT token`,
        refreshToken: ``,
      });
      const result = await JsonWebTokenEntity.checkRefreshToken(jsonWebTokenEntity.refreshToken);
      expect(result).toBeFalsy();
    });
  });

  describe(`refresh method`, () => {
    const jsonWebTokenEntity = JsonWebTokenEntity.generate(jsonWebTokenParams);

    it(`should call generate method`, async () => {
      const generate = jest.fn();
      const generateJsonWebTokenEntity = JsonWebTokenEntity.generate;
      JsonWebTokenEntity.generate = (params) => {
        generate();
        return generateJsonWebTokenEntity(params);
      };
      await JsonWebTokenEntity.refresh(jsonWebTokenEntity.refreshToken);
      expect(generate).toHaveBeenCalledTimes(1);
    });

    it.each([`accessToken`, `refreshToken`])(`result should return new JsonWebTokenEntity with %p property`, async (property: string) => {
      const result = await JsonWebTokenEntity.refresh(jsonWebTokenEntity.refreshToken);
      expect(result).toHaveProperty(property);
    });
  });
});
