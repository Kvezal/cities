import { Feature } from './feature';
import { IFeature } from './feature.interface';


const featureParams: IFeature = {
  id: 1,
  title: `title`,
};

describe(`Feature entity`, () => {
  describe(`constructor`, () => {
    let feature: Feature;

    beforeAll(() => {
      feature = new Feature(
        featureParams.id,
        featureParams.title
      );
    });

    it.each([`id`, `title`])(`should create a new Feature instance with correct %p property`, (property) => {
      expect(feature[property]).toBe(featureParams[property]);
    });
  });

  describe(`create method`, () => {
    let feature: Feature;

    beforeAll(() => {
      feature = Feature.create(featureParams);
    });

    it(`should create a new Feature instance`, () => {
      expect(feature).toBeInstanceOf(Feature);
    });

    it.each([`id`, `title`])(`should create a new Feature instance with correct %p property`, (property) => {
      expect(feature[property]).toBe(featureParams[property]);
    });
  })
});
