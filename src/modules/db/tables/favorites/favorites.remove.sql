DELETE FROM favorites WHERE favorites.hotel_id = :hotelId AND favorites.user_id = :userId
RETURNING hotel_id, user_id;