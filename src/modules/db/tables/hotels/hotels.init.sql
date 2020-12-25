CREATE TABLE IF NOT EXISTS hotels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title CHARACTER VARYING (150) NOT NULL,
  description CHARACTER VARYING NOT NULL,
  bedroom_count INTEGER NOT NULL,
  max_adult_count INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  hotel_type_id UUID,
  city_id UUID,
  location_id UUID,
  host_id UUID,
  FOREIGN KEY (hotel_type_id) REFERENCES hotel_types (id)
    ON DELETE SET NULL
    ON UPDATE SET NULL,
  FOREIGN KEY (city_id) REFERENCES cities (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (location_id) REFERENCES locations (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (host_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);