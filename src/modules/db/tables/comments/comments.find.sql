SELECT
  comments.id AS id,
  TO_JSON(users) AS user,
  comments.hotel_id AS hotel_id,
  comments.text AS text,
  ratings.value AS rating,
  comments.created_at AS created_at
FROM comments
LEFT JOIN ratings ON
  (comments.hotel_id = ratings.hotel_id)
  AND (comments.user_id = ratings.user_id)
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
) AS users ON comments.user_id = users.id
WHERE (:id = '' OR comments.id = :id::UUID)
  AND (:user::JSON->>'id' IS NULL OR users.id = UUID(:user::JSON->>'id'))
  AND (:hotel_id = '' OR comments.hotel_id = UUID(:hotel_id));
