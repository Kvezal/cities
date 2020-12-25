DELETE FROM refresh_tokens
WHERE refresh_tokens.value = :value
RETURNING id, value, created_at;