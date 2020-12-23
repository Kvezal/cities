INSERT INTO user_types (id, title) VALUES [[(:id::UUID, :title)]]:list:
RETURNING
  user_types.id,
  user_types.title;