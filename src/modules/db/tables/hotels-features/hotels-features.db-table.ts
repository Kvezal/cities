import { DbTable } from 'nd-sql';
import { HotelsDbTable } from '../hotels';
import { UsersDbTable } from '../users';


@DbTable({
  dependencies: [
    HotelsDbTable,
    UsersDbTable,
  ],
  init: `hotels-features.init.sql`,
  drop: `hotels-features.drop.sql`,
})
export class HotelsFeaturesDbTable {}
