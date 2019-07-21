const Category = require('./index');

function ProxiedModel(target) {
  const internalHandler = {
    get(target, propName) {
      return async function internalCallProxiedInstance(...args) {
        let type;
        switch (propName) {
          case 'insertCategory':
            type = 'insert';
            const [data] = args;
            return target.buildQuery(type, data);
          case 'updateCategory':
            type = 'update';
            const [categoryUpdate, idUpdate] = args;
            return target.buildQuery(type, categoryUpdate, idUpdate);
          case 'deleteCategory':
            type = 'delete';
            const [idDelete] = args;
            return target.buildQuery(type, null, idDelete);
          case 'select':
            return target.buildQuery();
          default:
            return null;
        }
      };
    }
  };

  return new Proxy(target, internalHandler);
}

describe('Category Model unit test', () => {
  let proxiedCategoryModel;
  beforeAll(() => {
    const categoryModel = new Category();
    proxiedCategoryModel = ProxiedModel(categoryModel);
  });
  it('should return an insertion query if provided a category to the insertMehod', async () => {
    const expectedIncludedString = 'insert';
    const r = await proxiedCategoryModel.insertCategory('tallarines');
    expect(r.toLowerCase().includes(expectedIncludedString)).toBe(true);
  });
  it('should return an updation query if provided a category and a id to the updateCategory method', async () => {
    const expectedIncludedString = 'update';
    const r = await proxiedCategoryModel.updateCategory('fideos', '23');
    expect(r.toLowerCase().includes(expectedIncludedString)).toBe(true);
  });
  it('should return an updation query if provided a id to the deleteCategory method. This query should include deteleAt word', async () => {
    const expectedIncludedString = 'deletedAt';
    const r = await proxiedCategoryModel.deleteCategory('100');
    expect(r.includes(expectedIncludedString)).toBe(true);
  });
});
