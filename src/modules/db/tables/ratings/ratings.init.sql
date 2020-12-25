CREATE TABLE IF NOT EXISTS ratings (
    value INTEGER NOT NULL,
    hotel_id UUID NOT NULL,
    user_id UUID NOT NULL,
    PRIMARY KEY (hotel_id, user_id),
    FOREIGN KEY (hotel_id) REFERENCES hotels (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);