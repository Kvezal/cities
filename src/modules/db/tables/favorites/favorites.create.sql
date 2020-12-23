INSERT INTO favorites (hotel_id, user_id) VALUES [[(:hotelId::UUID, :userId::UUID)]]:list:
RETURNING
  hotel_id,
  user_id;