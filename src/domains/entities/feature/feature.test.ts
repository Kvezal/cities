import { FeatureEntity } from './feature.entity';
import { IFeature } from './feature.interface';


const featureParams: IFeature = {
  id: 1,
  title: `title`,
};

describe(`Feature entity`, () => {
  describe(`constructor`, () => {
    let feature: FeatureEntity;

    beforeAll(() => {
      feature = new FeatureEntity(
        featureParams.id,
        featureParams.title
      );
    });

    it.each([`id`, `title`])(`should create a new Feature instance with correct %p property`, (property) => {
      expect(feature[property]).toBe(featureParams[property]);
    });
  });

  describe(`create method`, () => {
    let feature: FeatureEntity;

    beforeAll(() => {
      feature = FeatureEntity.create(featureParams);
    });

    it(`should create a new Feature instance`, () => {
      expect(feature).toBeInstanceOf(FeatureEntity);
    });

    it.each([`id`, `title`])(`should create a new Feature instance with correct %p property`, (property) => {
      expect(feature[property]).toBe(featureParams[property]);
    });
  })
});
