require('dotenv').config();
const { Client } = require('pg');
const Category = require('./index');

const { DATABASE_URL } = process.env;

describe('Category Model', () => {
  let client;
  let categoryModel;
  beforeAll(async () => {
    client = new Client({ connectionString: DATABASE_URL });
    await client.connect();
    categoryModel = new Category(client);
  });
  afterEach(async () => {
    const r = await client.query('DELETE FROM CATEGORY');
    console.log('Empty table', r.command);
  });
  it('should insert a category on the database', async () => {
    const categoryToInsert = 'huevos';
    const r = await categoryModel.insertCategory('huevos');
    const [data] = r;
    expect(data.category_name).toEqual(categoryToInsert);
  });

  it('should update a category', async () => {
    const r = await categoryModel.insertCategory('tallarines');
    const [data] = r;
    const { id } = data;
    const categoryUpdated = 'esparragos';
    const rr = await categoryModel.updateCategory(categoryUpdated, id);
    const [data2] = rr;
    const { updatedat } = data2;
    expect(updatedat).not.toBe(null);
  });

  it('should delete a category', async () => {
    const r = await categoryModel.insertCategory('zapallos');
    const [data] = r;
    const { id } = data;
    const rr = await categoryModel.deleteCategory(id);
    const [data2] = rr;
    const { deletedat } = data2;
    expect(deletedat).not.toBe(null);
  });

  it('should get all the categories', async () => {
    const categories = ['huevos', 'zapallos', 'esparragos'];
    categories.forEach(async item => categoryModel.insertCategory(item));

    const getCategories = await categoryModel.getCategories();
    expect(getCategories.length).toBe(3);
  });
});
