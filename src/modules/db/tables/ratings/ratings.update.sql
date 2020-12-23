UPDATE ratings
  SET value = :value::INTEGER
WHERE hotel_id = :hotelId AND user_id = :userId
RETURNING
  hotel_id,
  user_id,
  value;