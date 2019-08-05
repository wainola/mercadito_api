const Category = require('./index');
const QueryBuilderProxy = require('../../services/QueryBuilderProxy');
const ProxiedInstance = require('../../testsUtils/ProxyInstance');

describe('Category Model unit test', () => {
  let queryBuilderProxy;
  let proxiedCategory;
  beforeAll(() => {
    const ProxiedCategory = ProxiedInstance(Category);
    const categoryModel = new ProxiedCategory();
    queryBuilderProxy = new QueryBuilderProxy([categoryModel]);
    proxiedCategory = queryBuilderProxy.setProxy(categoryModel);
  });
  it('should return an insertion query if provided a category to the insertMehod', async () => {
    const eps = `insert into category (category_name) values ('abarrotes') returning *;`;
    const r = await proxiedCategory.insertCategory({ category_name: 'abarrotes' });
    expect(r.toLowerCase()).toEqual(eps);
  });
  it('should return an updation query if provided a category and a id to the updateCategory method', async () => {
    const eps = `update category set category_name='verduras', createdat='foo' where id = '23';`;
    const r = await proxiedCategory.updateCategory(
      { category_name: 'verduras', createdat: 'foo' },
      23
    );
    expect(r.toLowerCase()).toEqual(eps);
  });
  it('should return an updation query if provided a id to the deleteCategory method. This query should include deteleAt word', async () => {
    const eps = `delete from category where id = '100';`;
    const r = await proxiedCategory.deleteCategory('100');
    expect(r.toLowerCase()).toEqual(eps);
  });
});
