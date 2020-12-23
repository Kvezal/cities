INSERT INTO ratings(user_id, hotel_id, value) VALUES
  [[(:userId::UUID, :hotelId::UUID, :value::INTEGER)]]:list:
RETURNING user_id, hotel_id, value;