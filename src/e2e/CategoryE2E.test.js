require('dotenv').config();
const { Pool } = require('pg');
const moment = require('moment');
const CategoryHandler = require('../handlers/CategoryHandler');
const Response = require('../testsUtils/Response');

const { DATABASE_URL } = process.env;
const client = new Pool({ connectionString: DATABASE_URL });
client.connect();

const categoryHandler = new CategoryHandler(client);

describe('Category E2E', () => {
  let res;
  let postCategorybody;
  beforeAll(() => {
    res = new Response();
    postCategorybody = {
      body: {
        category: { category_name: 'verduras', createdat: moment().format('YYYY-MM-DD HH:mm:ss') }
      }
    };
  });
  afterAll(async () => {
    await client.query('DELETE FROM CATEGORY;');
  });
  it('should insert data to the category table', async () => {
    const r = await categoryHandler.postCategory(postCategorybody, res);
    const {
      body: { data }
    } = r;
    const [dataReturned] = data;
    const keys = Object.keys(dataReturned);
    const kepx = ['id', 'category_name', 'createdat', 'updatedat', 'deletedat'];
    expect(keys).toEqual(kepx);
  });
  it('should update a category', async () => {
    let updateBody = {
      body: { category: { category_name: 'abarrotes' } }
    };
    return categoryHandler
      .postCategory(postCategorybody, res)
      .then(r => {
        const {
          body: { data }
        } = r;
        const [dataReturned] = data;
        const { id } = dataReturned;
        updateBody = {
          body: {
            category: {
              id,
              ...updateBody.body.category
            }
          }
        };
        return updateBody;
      })
      .then(async body => {
        const r2 = await categoryHandler.updateCategory(body, res);
        expect(r2.statusCode).toBe(200);
      });
  });
  it('should delete a category', () =>
    categoryHandler
      .postCategory(postCategorybody, res)
      .then(r => {
        const {
          body: { data }
        } = r;
        const [dataReturned] = data;
        const { id } = dataReturned;
        return id;
      })
      .then(async id => {
        const deleteBody = { body: { category: { id } } };
        const r2 = await categoryHandler.deleteCategory(deleteBody, res);
        expect(r2.statusCode).toBe(200);
      }));
  it('should get one category', () =>
    categoryHandler
      .postCategory(postCategorybody, res)
      .then(d => {
        const {
          body: { data }
        } = d;
        const [dataReturned] = data;
        const { id } = dataReturned;
        return id;
      })
      .then(async id => {
        const getBody = {
          body: { category: { id, params: ['id', 'category_name', 'createdat'] } }
        };
        const r = await categoryHandler.getCategory(getBody, res);
        const {
          body: { data }
        } = r;
        const [dataReturned] = data;
        const keys = Object.keys(dataReturned);
        expect(keys).toEqual(['id', 'category_name', 'createdat']);
      }));
});
