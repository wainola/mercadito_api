-- +goose Up
-- SQL in this section is executed when the migration is applied.
ALTER TABLE client RENAME TO clients;

-- +goose Down
-- SQL in this section is executed when the migration is rolled back.
ALTER TABLE clients RENAME TO client;
