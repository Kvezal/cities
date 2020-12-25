WITH
  cities_data(id, title, location) AS (
    VALUES
    [[(:id::UUID, :title, :location::JSON)]]:list:
  ),
  locations_result AS (
    INSERT INTO locations(id, coords, zoom)
    SELECT
      UUID(cities_data.location->>'id') AS id,
      ST_POINT(CAST(cities_data.location->>'latitude' AS FLOAT8), CAST(cities_data.location->>'longitude' AS FLOAT8)) AS coords,
      CAST(cities_data.location->>'zoom' AS INTEGER) AS zoom
    FROM cities_data
    RETURNING
      id,
      coords,
      zoom
  ),
  cities_result AS (
    INSERT INTO cities(id, title, location_id)
    SELECT
      cities_data.id AS id,
      cities_data.title AS title,
      UUID(cities_data.location->>'id') AS location_id
    FROM cities_data
    RETURNING
      id,
      title,
      location_id
  )
SELECT
  cities_result.id AS id,
  cities_result.title AS title,
  JSON_BUILD_OBJECT(
    'id', locations_result.id,
    'latitude', ST_X(locations_result.coords),
    'longitude', ST_Y(locations_result.coords),
    'zoom', locations_result.zoom
  ) AS location
FROM cities_result
LEFT JOIN locations_result ON cities_result.location_id = locations_result.id;