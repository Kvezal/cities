CREATE TABLE IF NOT EXISTS hotels_images (
    hotel_id UUID,
    image_id UUID,
    PRIMARY KEY (hotel_id, image_id),
    FOREIGN KEY (hotel_id) REFERENCES hotels (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (image_id) REFERENCES images (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);