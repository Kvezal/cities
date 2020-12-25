UPDATE ratings
  SET value = :value::INTEGER
WHERE hotel_id = :hotel_id AND user_id = :user_id
RETURNING
  hotel_id,
  user_id,
  value;