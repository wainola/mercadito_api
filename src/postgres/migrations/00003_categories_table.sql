-- +goose Up
-- SQL in this section is executed when the migration is applied.
CREATE TABLE categories(
  id uuid primarykeyt default gen_random_uuid(),
  name text not null,
  create_at timestamp default now()
)

-- +goose Down
-- SQL in this section is executed when the migration is rolled back.
DROP TABLE categories;