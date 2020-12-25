INSERT INTO favorites (hotel_id, user_id) VALUES [[(:hotel_id::UUID, :user_id::UUID)]]:list:
RETURNING
  hotel_id,
  user_id;