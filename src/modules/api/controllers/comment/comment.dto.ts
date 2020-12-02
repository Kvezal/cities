import { IsNumber, IsString, Length, Max, MaxLength, Min, MinLength } from 'class-validator';


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
  @IsString()
  @MinLength(comment.text.MIN_LENGTH)
  @MaxLength(comment.text.MAX_LENGTH)
  public text: string;

  @IsString()
  @Length(comment.hotelId.LENGTH)
  public hotelId: string;

  @IsNumber()
  @Min(comment.rating.MIN)
  @Max(comment.rating.MAX)
  public rating: number;
}
