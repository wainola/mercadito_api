const CategoryHandler = require('../../handlers/CategoriesHandler');

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

describe('CategoryHandler', () => {
  let res;
  beforeAll(() => {
    res = new Response();
  });
  it('should return 422 if passed the wrong body', async () => {
    const categorytoSend = {
      category: {
        category_name: false
      }
    };

    const req = {
      body: categorytoSend
    };

    const r = await CategoryHandler.postCategory(req, res);
    expect(r.statusCode).toBe(422);
  });

  it('should return 200 if passed the correct body', async () => {
    const categoryToSend = {
      category: {
        category_name: 'tallarines'
      }
    };

    const req = { body: categoryToSend };
    const r = await CategoryHandler.postCategory(req, res);
    expect(r.statusCode).toBe(200);
  });
});
