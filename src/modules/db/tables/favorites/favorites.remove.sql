DELETE FROM favorites WHERE favorites.hotel_id = :hotel_id::UUID AND favorites.user_id = :user_id::UUID
RETURNING hotel_id, user_id;