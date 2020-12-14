import { ApiProperty } from '@nestjs/swagger';


export  class LocationOutput {
  @ApiProperty({
    description: `location id`,
    example: `0b88066e-c543-451f-b4a0-67c0729335da`,
  })
  id: string;

  @ApiProperty({
    description: `latitude on the map`,
    example: 53.550341,
  })
  latitude: number;

  @ApiProperty({
    description: `longitude on the map`,
    example: 10.000654,
  })
  longitude: number;

  @ApiProperty({
    description: `zoom of the map`,
    example: 8,
  })
  zoom: number;
}
