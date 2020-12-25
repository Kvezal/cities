CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name CHARACTER VARYING (100) NOT NULL,
    email CHARACTER VARYING (250) NOT NULL,
    password CHARACTER (255) NOT NULL,
    image_id UUID DEFAULT NULL,
    user_type_id UUID,
    FOREIGN KEY (image_id) REFERENCES images (id)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    FOREIGN KEY (user_type_id) REFERENCES user_types (id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
);