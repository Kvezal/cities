SELECT
  ratings.user_id,
  ratings.hotel_id,
  ratings.value
FROM ratings
WHERE (:userId = '' OR ratings.user_id = :userId::UUID)
  AND (:hotelId = '' OR ratings.hotel_id = :hotelId::UUID);