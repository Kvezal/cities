SELECT
  user_types.id,
  user_types.title
FROM user_types
WHERE (:id = '' OR user_types.id = :id::UUID)
  AND (:title = '' OR user_types.title = :title);