SELECT
  ratings.user_id,
  ratings.hotel_id,
  ratings.value
FROM ratings
WHERE (:user_id = '' OR ratings.user_id = :user_id::UUID)
  AND (:hotel_id = '' OR ratings.hotel_id = :hotel_id::UUID);