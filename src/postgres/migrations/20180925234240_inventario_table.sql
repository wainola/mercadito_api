-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE stock(
  id uuid primary key default gen_random_uuid(),
  producto_id uuid references productos(id) not null,
  quantity numeric not null,
  updated_at 
)


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back


