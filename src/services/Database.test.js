require('dotenv').config();
const Database = require('./Database');

const { DATABASE_URL } = process.env;

describe('Database Service', () => {
  let database;
  beforeAll(() => {
    database = new Database(DATABASE_URL);
  });

  it('should connect to the database', async () => {
    try {
      const connect = await database.connect();
      expect(connect.connected).toBe(true);
    } catch (err) {
      console.error('Error:', err);
    }
  });

  it('should run a simple query', async () => {
    try {
      await database.connect();
      const res = await database.queryToExec('SELECT NOW();');

      expect(Array.isArray(res)).toBe(true);
    } catch (err) {
      console.error('Error:', err);
    }
  });
});
