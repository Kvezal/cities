CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coords GEOMETRY NOT NULL,
    zoom INTEGER NOT NULL
);