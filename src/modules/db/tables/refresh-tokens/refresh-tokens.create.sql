INSERT INTO refresh_tokens(value) VALUES
  (:value)
RETURNING id, value, created_at;