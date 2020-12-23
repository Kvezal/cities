SELECT
  cities.id AS id,
  cities.title AS title,
  JSON_BUILD_OBJECT(
    'id', locations.id,
    'latitude', ST_X(locations.coords),
    'longitude', ST_Y(locations.coords),
    'zoom', locations.zoom
  ) AS location
FROM cities
LEFT JOIN locations ON cities.location_id = locations.id
WHERE (:id = '' OR cities.id = :id::UUID)
  AND (:title = '' OR cities.title = :title);