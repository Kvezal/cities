WITH
  comments_data(id, user_id, hotel_id, text, rating) AS (
    VALUES [[(:id::UUID, :userId::UUID, :hotelId::UUID, :text, :rating::INTEGER)]]:list:
  ),
  ratings_result AS (
    INSERT INTO ratings(user_id, hotel_id, value)
    SELECT
      comments_data.user_id,
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
      comments_data.user_id,
      comments_data.hotel_id,
      comments_data.text
    FROM comments_data
    RETURNING id, user_id, hotel_id, text, created_at
  )
SELECT
  comments_result.id AS id,
  comments_result.user_id AS user_id,
  comments_result.hotel_id AS hotel_id,
  comments_result.text AS text,
  ratings_result.value AS rating,
  comments_result.created_at AS created_at
FROM comments_result
LEFT JOIN ratings_result ON
  (comments_result.hotel_id = ratings_result.hotel_id)
  AND (comments_result.user_id = ratings_result.user_id);