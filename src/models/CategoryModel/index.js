class Category {
  buildQuery(data, type) {
    switch (type) {
      case 'insert':
        return `INSERT INTO CATEGORY (category_name) VALUES ('${data}') RETURNING *;`;
      default:
        return null;
    }
  }

  async postCategory(category, database) {
    try {
      const query = this.buildQuery(category, 'insert');
      const queryToExec = await database.queryToExec(query);

      if (!Array.isArray(queryToExec)) {
        throw new Error('Error on executing the query');
      }

      return query;
    } catch (err) {
      return { error: true, meta: err };
    }
  }
}

module.exports = new Category();
