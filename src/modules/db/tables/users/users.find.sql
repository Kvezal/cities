SELECT
  users.id AS id,
  users.name AS name,
  users.email AS email,
  users.password AS password,
  TO_JSON(images) AS image,
  TO_JSON(user_types) AS type
FROM users
LEFT JOIN user_types ON users.user_type_id = user_types.id
LEFT JOIN images ON users.image_id = images.id
  WHERE (:id = '' OR users.id = :id::UUID)
    AND (:name = '' OR users.name = :name)
    AND (:email = '' OR users.email = :email)
    AND (:type::JSON->>'id' IS NULL OR user_types.id = UUID(:type::JSON->>'id'))
    AND (:type::JSON->>'title' IS NULL OR user_types.title = :type::JSON->>'title');