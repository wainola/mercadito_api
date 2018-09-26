-- +goose Up
-- SQL in this section is executed when the migration is applied.
CREATE EXTENSION pgcrypto;
CREATE EXTENSION citext;

CREATE TABLE client(
id uuid primary key default gen_random_uuid(),
name text not null,
last_name text not null,
email text not null,
address text not null,
created_at timestamp default now()
);

-- +goose Down
-- SQL in this section is executed when the migration is rolled back.
DROP EXTENSION pgcrypto;
DROP EXTENSION citext;
DROP TABLE client;
