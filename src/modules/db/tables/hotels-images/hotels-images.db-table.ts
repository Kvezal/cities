import { DbTable } from 'nd-sql';
import { HotelsDbTable } from '../hotels';
import { ImagesDbTable } from '../images';


@DbTable({
  dependencies: [
    HotelsDbTable,
    ImagesDbTable,
  ],
  init: `./hotels-images.init.sql`,
  drop: `./hotels-images.drop.sql`,
})
export class HotelsImagesDbTable {}
