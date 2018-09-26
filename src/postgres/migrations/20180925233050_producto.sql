-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE productos(
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) not null,
  name text not null,
  price text not null,
  product_type text not null,
  description text not null,
  created_at timestamp default now()
)


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE productos;
