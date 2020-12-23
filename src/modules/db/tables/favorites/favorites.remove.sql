DELETE FROM favorites WHERE favorites.hotel_id = :hotel_id AND favorites.user_id = :user_id
RETURNING hotel_id, user_id;