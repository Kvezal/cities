SELECT
  id,
  value,
  created_at
FROM refresh_tokens
WHERE (refresh_tokens.value = :value);