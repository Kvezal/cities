SELECT
  images.id,
  images.title
FROM images
WHERE (:id = '' OR images.id = :id::UUID)
  AND (:title = '' OR images.title = :title);