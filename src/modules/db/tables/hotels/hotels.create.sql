WITH
  hotel_data(
    id,
    title,
    description,
    bedroom_count,
    max_adult_count,
    price,
    is_premium,
    type,
    city,
    location,
    host,
    images,
    features
  ) AS (
    VALUES
    [[(
      :id::UUID,
      :title,
      :description,
      :bedroom_count::INTEGER,
      :max_adult_count::INTEGER,
      :price::NUMERIC,
      :is_premium::BOOLEAN,
      :type::JSON,
      :city::JSON,
      :location::JSON,
      :host::JSON,
      :images::JSON[],
      :features::JSON[]
    )]]:list:
  ),
  images_result AS (
    INSERT INTO images
    SELECT
      UUID(UNNEST(hotel_data.images)->>'id') AS id,
      UNNEST(hotel_data.images)->>'title' AS title
    FROM hotel_data
    RETURNING id, title
  ),
  locations_result AS (
    INSERT INTO locations(id, coords, zoom)
    SELECT
      UUID(hotel_data.location->>'id') AS id,
      ST_POINT(CAST(hotel_data.location->>'latitude' as FLOAT8), CAST(hotel_data.location->>'longitude' AS FLOAT8)) AS coords,
      CAST(hotel_data.location->>'zoom' AS INTEGER) AS zoom
    FROM hotel_data
    RETURNING id, coords, zoom
  ),
  hotels_result AS (
    INSERT INTO hotels(
      id,
      title,
      description,
      bedroom_count,
      max_adult_count,
      price,
      is_premium,
      hotel_type_id,
      city_id,
      location_id,
      host_id
    )
    SELECT
      hotel_data.id AS id,
      hotel_data.title AS title,
      hotel_data.description AS description,
      hotel_data.bedroom_count AS bedroom_count,
      hotel_data.max_adult_count AS max_adult_count,
      hotel_data.price AS price,
      hotel_data.is_premium AS is_premium,
      hotel_types.id AS hotel_type_id,
      cities.id AS city_id,
      UUID(hotel_data.location->>'id') AS location_id,
      UUID(hotel_data.host->>'id') AS host_id
    FROM hotel_data
    LEFT JOIN hotel_types ON
      (hotel_data.type->>'id' IS NULL OR hotel_types.id = UUID(hotel_data.type->>'id'))
      AND (hotel_data.type->>'title' IS NULL OR hotel_types.title = hotel_data.type->>'title')
    LEFT JOIN cities ON
      (hotel_data.city->>'id' IS NULL OR cities.id = UUID(hotel_data.city->>'id'))
      AND (hotel_data.city->>'title' IS NULL OR cities.title = hotel_data.city->>'title')
    RETURNING
      id,
      title,
      description,
      bedroom_count,
      max_adult_count,
      price,
      is_premium,
      hotel_type_id,
      city_id,
      location_id,
      host_id
  ),
  hotels_images_result AS (
    INSERT INTO hotels_images
    SELECT
      hotel_data.id AS hotel_id,
      UUID(UNNEST(hotel_data.images)->>'id') AS image_id
    FROM hotel_data
    RETURNING hotel_id, image_id
  ),
  hotels_features_result AS (
    INSERT INTO hotels_features
    SELECT
      hotel_data.id AS hotel_id,
      UUID(UNNEST(hotel_data.features)->>'id') AS feature_id
    FROM hotel_data
    RETURNING hotel_id, feature_id
  )
SELECT
  hotels_result.id,
  hotels_result.title,
  hotels_result.description,
  hotels_result.bedroom_count,
  hotels_result.max_adult_count,
  FLOAT8(hotels_result.price) AS price,
  hotels_result.is_premium,
  TO_JSON(hotel_types) AS type,
  TO_JSON(locations_result) AS location,
  TO_JSON(users) AS host,
  TO_JSON(cities) AS city,
  image_list.value AS images,
  feature_list.value AS features,
  rating.value AS rating,
  FALSE AS isFavorite
FROM hotels_result
LEFT JOIN hotel_types ON hotels_result.hotel_type_id = hotel_types.id
LEFT JOIN locations_result ON hotels_result.location_id = locations_result.id
LEFT JOIN users ON hotels_result.host_id = users.id
LEFT JOIN (
  SELECT
    cities.id AS id,
    cities.title AS title,
    TO_JSON(locations) AS location
  FROM cities
  LEFT JOIN locations ON cities.location_id = locations.id
) AS cities ON hotels_result.city_id = cities.id
LEFT JOIN (
  SELECT
    hotels_result.id AS hotel_id,
    COALESCE(
      JSON_AGG(images_result) FILTER (WHERE images_result IS NOT NULL), '[]'
    ) AS value
  FROM hotels_result
  LEFT JOIN hotels_images_result ON hotels_result.id = hotels_images_result.hotel_id
  LEFT JOIN images_result ON hotels_images_result.image_id = images_result.id
  GROUP BY hotels_result.id
) AS image_list ON hotels_result.id = image_list.hotel_id
LEFT JOIN (
  SELECT
    hotels_result.id AS hotel_id,
    COALESCE(
      JSON_AGG(features) FILTER (WHERE features IS NOT NULL), '[]'
    ) AS value
  FROM hotels_result
  LEFT JOIN hotels_features_result ON hotels_result.id = hotels_features_result.hotel_id
  LEFT JOIN features ON hotels_features_result.feature_id = features.id
  GROUP BY hotels_result.id
) AS feature_list ON hotels_result.id = feature_list.hotel_id
LEFT JOIN (
  SELECT
    hotels_result.id AS hotel_id,
    COALESCE(AVG(ratings.value), 0)::INTEGER AS value
  FROM hotels_result
  LEFT JOIN ratings ON hotels_result.id = ratings.hotel_id
  GROUP BY hotels_result.id
) AS rating ON hotels_result.id = rating.hotel_id;