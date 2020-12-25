CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title CHARACTER VARYING (50) NOT NULL,
  location_id UUID,
  FOREIGN KEY (location_id) REFERENCES locations (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);