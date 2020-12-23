--SELECT
--  comments.user_id,
--  comments.hotel_id,
--  comments.value,
--  comments.created_at
--FROM comments
--WHERE (:userId = '' OR comments.user_id = :userId::UUID)
--  AND (:hotelId = '' OR comments.hotel_id = :hotelId::UUID);


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
  AND (:userId = '' OR comments.user_id = :userId::UUID)
  AND (:hotelId = '' OR comments.hotel_id = :hotelId::UUID);
