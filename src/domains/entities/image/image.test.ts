import {Image} from './image';
import { IImage } from './image.interface';


const imageParams: IImage = {
  id: 1,
  title: `title`,
};

describe(`Image entity`, () => {
  describe(`constructor`, () => {
    let image: Image;

    beforeAll(() => {
      image = new Image(
        imageParams.id,
        imageParams.title,
      );
    });

    it.each([`id`, `title`])(`should create a new Image instance with correct %p property`, (property) => {
      expect(image[property]).toBe(imageParams[property]);
    });
  });

  describe(`create method`, () => {
    let image: Image;

    beforeAll(() => {
      image = Image.create(imageParams);
    });

    it(`should create a new Image instance`, () => {
      expect(image).toBeInstanceOf(Image);
    });

    it.each([`id`, `title`])(`should create a new Image instance with correct %p property`, (property) => {
      expect(image[property]).toBe(imageParams[property]);
    });
  })
});
