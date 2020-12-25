WITH
  comments_data(id, "user", hotel_id, text, rating, created_at) AS (
    VALUES [[(
      :id::UUID,
      :user::JSON,
      :hotel_id::UUID,
      :text, :rating::INTEGER,
      :created_at::TIMESTAMPTZ
    )]]:list:
  ),
  ratings_result AS (
    INSERT INTO ratings(user_id, hotel_id, value)
    SELECT
      UUID(comments_data."user"->>'id') AS user_id,
      comments_data.hotel_id,
      comments_data.rating
    FROM comments_data
    ON CONFLICT (user_id, hotel_id) DO UPDATE
      SET value = EXCLUDED.value
    RETURNING user_id, hotel_id, value
  ),
  comments_result AS (
    INSERT INTO comments(id, user_id, hotel_id, text)
    SELECT
      comments_data.id,
      UUID(comments_data."user"::JSON->>'id') AS user_id,
      comments_data.hotel_id,
      comments_data.text
    FROM comments_data
    RETURNING id, user_id, hotel_id, text, created_at
  )
SELECT
  comments_result.id AS id,
  TO_JSON(users) AS "user",
  comments_result.hotel_id AS hotel_id,
  comments_result.text AS text,
  ratings_result.value AS rating,
  comments_result.created_at AS created_at
FROM comments_result
LEFT JOIN ratings_result ON
  (comments_result.hotel_id = ratings_result.hotel_id)
  AND (comments_result.user_id = ratings_result.user_id)
LEFT JOIN (
  SELECT
    users.id,
    users.name,
    users.email,
    users.password,
    TO_JSON(user_types) AS type,
    TO_JSON(images) AS image
  FROM users
  LEFT JOIN user_types ON users.user_type_id = user_types.id
  LEFT JOIN images ON users.image_id = images.id
) AS users ON comments_result.user_id = users.id;