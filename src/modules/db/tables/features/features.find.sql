SELECT
  features.id,
  features.title
FROM features
WHERE (:id = '' OR features.id = :id::UUID)
  AND (:title = '' OR features.title = :title);