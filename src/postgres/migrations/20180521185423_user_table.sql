-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
create extension pgcrypto;
create extension citext;

create table users
(
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  hashed_password text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
drop extension pgcrypto;
drop extension citext;
drop table users;