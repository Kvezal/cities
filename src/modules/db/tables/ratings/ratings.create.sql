INSERT INTO ratings(user_id, hotel_id, value) VALUES
  [[(:user_id::UUID, :hotel_id::UUID, :value::INTEGER)]]:list:
RETURNING user_id, hotel_id, value;