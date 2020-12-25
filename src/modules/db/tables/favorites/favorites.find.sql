SELECT
  favorites.hotel_id,
  favorites.user_id
FROM favorites
WHERE (:hotel_id = '' OR favorites.hotel_id = :hotel_id::UUID)
  AND (:user_id = '' OR favorites.user_id = :user_id::UUID);