CREATE TABLE IF NOT EXISTS favorites (
  user_id UUID,
  hotel_id UUID,
  PRIMARY KEY (user_id, hotel_id),
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (hotel_id) REFERENCES hotels (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);