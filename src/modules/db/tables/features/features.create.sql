INSERT INTO features (id, title) VALUES [[(:id, :title)]]:list:
RETURNING
  features.id,
  features.title;