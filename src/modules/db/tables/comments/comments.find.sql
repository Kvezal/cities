SELECT
  comments.id AS id,
  comments.user_id AS user_id,
  comments.hotel_id AS hotel_id,
  comments.text AS text,
  ratings.value AS rating,
  comments.created_at AS created_at
FROM comments
LEFT JOIN ratings ON
  (comments.hotel_id = ratings.hotel_id)
  AND (comments.user_id = ratings.user_id)
WHERE (:id = '' OR comments.id = :id::UUID)
  AND (:user_id = '' OR comments.user_id = :user_id::UUID)
  AND (:hotel_id = '' OR comments.hotel_id = :hotel_id::UUID);
