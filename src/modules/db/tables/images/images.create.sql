INSERT INTO images (id, title) VALUES [[(:id::UUID, :title)]]:list:
RETURNING
  images.id,
  images.title;