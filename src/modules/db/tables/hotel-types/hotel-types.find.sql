SELECT
  hotel_types.id,
  hotel_types.title
FROM hotel_types
WHERE (:id = '' OR hotel_types.id = :id::UUID)
  AND (:title = '' OR hotel_types.title = :title);