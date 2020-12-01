import { Exception } from '../exception';
import { ECommentField } from './comment.error.interface';
import { CommentError } from './comment.error';


describe(`Comment Error`, () => {
  it.each(Object.values(ECommentField))(`should create with %p field`, (field: ECommentField) => {
    const error = new CommentError({
      field,
      message: `test`,
    });
    expect(error.field).toBe(field);
  });

  it(`should have correct name`, () => {
    const error = new CommentError({
      field: ECommentField.TEXT,
      message: `test`,
    });
    expect(error.name).toBe(`CommentError`);
  });

  it(`should be instance of Exception`, () => {
    const error = new CommentError({
      field: ECommentField.TEXT,
      message: `test`,
    });
    expect(error).toBeInstanceOf(Exception);
  });
});
