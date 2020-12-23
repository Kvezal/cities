SELECT
  favorites.hotel_id,
  favorites.user_id
FROM favorites
WHERE (:hotelId = '' OR favorites.hotel_id = :hotelId::UUID)
  AND (:userId = '' OR favorites.user_id = :userId::UUID);