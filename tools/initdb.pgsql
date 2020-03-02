-- Drops items table
DROP TABLE IF EXISTS items;

-- Creates items table
CREATE TABLE IF NOT EXISTS items (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , name varchar(50) NOT NULL
);