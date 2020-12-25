WITH
  user_data(id, name, email, password, image, type) AS (
    VALUES
    [[(:id::UUID, :name, :email, :password, :image::JSON, :type::JSON)]]:list:
  ),
  images_result AS (
    INSERT INTO images(id, title)
    SELECT
      UUID(user_data.image->>'id') AS id,
      user_data.image->>'title' AS title
    FROM user_data
    RETURNING id, title
  ),
  users_result AS (
    INSERT INTO users
    SELECT
      user_data.id AS id,
      user_data.name AS name,
      user_data.email AS email,
      user_data.password AS password,
      UUID(user_data.image->>'id') AS image_id,
      user_types.id AS user_type_id
    FROM user_data
    INNER JOIN user_types ON
      (user_data.type->>'title' IS NULL OR user_types.title = user_data.type->>'title')
      AND (user_data.type->>'id' IS NULL OR user_types.id = UUID(user_data.type->>'id'))
    RETURNING
      id,
      name,
      email,
      password,
      image_id,
      user_type_id
  )
SELECT
  users_result.id AS id,
  users_result.name AS name,
  users_result.email AS email,
  users_result.password AS password,
  TO_JSON(images_result) AS image,
  TO_JSON(user_types) AS type
  FROM users_result
  INNER JOIN images_result ON users_result.image_id = images_result.id
  INNER JOIN user_types ON users_result.user_type_id = user_types.id;