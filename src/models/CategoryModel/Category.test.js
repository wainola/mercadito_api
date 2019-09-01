const MetaApeiron = require('meta-apeiron');
const CategoryModel = require('./index');
const ProxiedInstance = require('../../testsUtils/ProxyInstance');

describe('Category Model unit test', () => {
  let proxiedCategory;
  beforeAll(() => {
    const ProxiedCategory = ProxiedInstance(CategoryModel);
    const categoryModel = new ProxiedCategory();
    proxiedCategory = MetaApeiron.setDependency(categoryModel).proxyInstance();
  });
  it('should return an insertion query if provided a category to the insertMehod', async () => {
    const eps = `insert into category (category_name) values ('abarrotes') returning *;`;
    const r = await proxiedCategory.insert({ category_name: 'abarrotes' });
    expect(r.toLowerCase()).toEqual(eps);
  });
  it('should return an updation query if provided a category and a id to the updateCategory method', async () => {
    const eps = `update category set category_name='verduras', createdat='foo' where id = '23';`;
    const r = await proxiedCategory.update({ category_name: 'verduras', createdat: 'foo' }, 23);
    expect(r.toLowerCase()).toEqual(eps);
  });
  it('should return an deletion query if provided a id to the deleteCategory method. This query should include deteleAt word', async () => {
    const eps = `delete from category where id = '100';`;
    const r = await proxiedCategory.delete('100');
    expect(r.toLowerCase()).toEqual(eps);
  });
  it('should return selection query if provided with the params and the if on the getCategory method', async () => {
    const eps = `select category_name, createdat from category where id = '11';`;
    const r = await proxiedCategory.get(['category_name', 'createdat'], 11);
    expect(r.toLowerCase()).toEqual(eps);
  });
});
