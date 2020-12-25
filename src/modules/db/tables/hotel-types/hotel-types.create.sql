INSERT INTO hotel_types (id, title) VALUES [[(:id::UUID, :title)]]:list:
RETURNING
  hotel_types.id,
  hotel_types.title;