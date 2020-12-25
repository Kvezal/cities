import { DbTable } from 'nd-sql';


@DbTable({
  init: `./locations.init.sql`,
  drop: `./locations.drop.sql`,
})
export class LocationsDbTable {}
