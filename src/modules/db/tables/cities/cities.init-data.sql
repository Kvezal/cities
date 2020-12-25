WITH
  cities_data(title, coords, zoom) AS (
    VALUES
    ('Dusseldorf', ST_POINT(51.225402, 6.776314), 13),
    ('Amsterdam', ST_POINT(52.37454, 4.897976), 13),
    ('Hamburg', ST_POINT(53.550341, 10.000654), 13),
    ('Cologne', ST_POINT(50.938361, 6.959974), 13),
    ('Brussels', ST_POINT(50.846557, 4.351697), 13),
    ('Paris', ST_POINT(48.85661, 2.351499), 13)
  ),
  location_result AS (
  INSERT INTO locations(coords, zoom)
  SELECT
    cities_data.coords AS coords,
    cities_data.zoom AS zoom
  FROM cities_data
  RETURNING
    id,
    coords
  )
  INSERT INTO cities(title, location_id)
  SELECT
    cities_data.title AS title,
    location_result.id AS location_id
  FROM cities_data
  LEFT JOIN location_result ON location_result.coords = cities_data.coords;