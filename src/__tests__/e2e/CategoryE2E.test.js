require('dotenv').config();
const { Pool } = require('pg');
const { request, response } = require('express');
const CategoryHandler = require('../../handlers/CategoryHandler');

const { DATABASE_URL } = process.env;
const client = new Pool({ connectionString: DATABASE_URL });

const categoryHandler = new CategoryHandler(client);

describe('Category E2E', () => {
  it('should work', () => {
    expect(true).toBe(true)
  })
});
