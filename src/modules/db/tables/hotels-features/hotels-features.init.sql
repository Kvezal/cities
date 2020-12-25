CREATE TABLE IF NOT EXISTS hotels_features (
  hotel_id UUID,
  feature_id UUID,
  PRIMARY KEY (hotel_id, feature_id),
  FOREIGN KEY (hotel_id) REFERENCES hotels (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (feature_id) REFERENCES features (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);