import { IsNumber, IsString, Length, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export const comment = {
  text: {
    MIN_LENGTH: 20,
    MAX_LENGTH: 1000,
  },
  hotelId: {
    LENGTH: 36,
  },
  rating: {
    MIN: 1,
    MAX: 5,
  },
};

export class CommentDto {
  @ApiProperty({
    description: `comment text`,
    example: `This is a comment example to describe a user impression`,
  })
  @IsString()
  @MinLength(comment.text.MIN_LENGTH)
  @MaxLength(comment.text.MAX_LENGTH)
  public text: string;

  @ApiProperty({
    description: `identifier of the commented hotel`,
    example: `023dda52-f07b-47ef-a44c-2301f8743149`,
  })
  @IsString()
  @Length(comment.hotelId.LENGTH)
  public hotelId: string;

  @ApiProperty({
    description: `hotel rating`,
    example: 5,
  })
  @IsNumber()
  @Min(comment.rating.MIN)
  @Max(comment.rating.MAX)
  public rating: number;
}
