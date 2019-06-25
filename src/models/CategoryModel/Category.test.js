require('dotenv').config();
const Database = require('../../services/Database');
const Category = require('./index');

const { DATABASE_URL } = process.env;

describe('Category Model', () => {
  let database;

  beforeAll(async () => {
    database = new Database(DATABASE_URL);
    await database.connect();
  });

  it('should insert a category and return the category inserted', async () => {
    const categoryName = 'huevos';

    try {
      const postCategory = await Category.postCategory(categoryName, database);
      console.log(postCategory);
    } catch (err) {
      console.error('Error:', err);
    }
  });

  it('should get a category provided the id', async () => {});

  it('should update the name of a category provided the id', async () => {});

  it('should delete a category from the table provided the id', async () => {});
});
