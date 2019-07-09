require('dotenv').config();
const { Pool } = require('pg');
const { request, response } = require('express');
const CategoryHandler = require('../../handlers/CategoryHandler');

const { DATABASE_URL } = process.env;
const client = new Pool({ connectionString: DATABASE_URL });

const categoryHandler = new CategoryHandler(client);

class Response {
  constructor() {
    this.statusCode = null;
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  send(obj) {
    return {
      statusCode: this.statusCode,
      body: obj
    };
  }
}

describe('Category E2E', () => {
  let res;

  beforeAll(() => {
    res = new Response();
  });
  it('should insert one category', async () => {
    const categoryToInsert = {
      category: {
        category_name: 'fideos'
      }
    };

    const req = {
      body: categoryToInsert
    };

    const r = await categoryHandler.postCategory(req, res);
    expect(r.body.data instanceof Array).toBe(true);
  });

  it('should fail to insert a category provided the wrong body and return 422 status code', async () => {
    const categoryToInsert = {
      category: {}
    };
    const req = {
      body: categoryToInsert
    };

    const r = await categoryHandler.postCategory(req, res);
    expect(r.body.error).toBe(true);
  });
});
