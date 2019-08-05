const Product = require('./index');
const QueryBuilderProxy = require('../../services/QueryBuilderProxy');
const ProxiedInstance = require('../../testsUtils/ProxyInstance');

describe('Product model unit test', () => {
  let queryBuilderProxy;
  let proxiedProduct;
  beforeAll(() => {
    const ProxiedProduct = ProxiedInstance(Product);
    const productModel = new ProxiedProduct();
    queryBuilderProxy = new QueryBuilderProxy([productModel]);
    proxiedProduct = queryBuilderProxy.setProxy(productModel);
  });

  it('should return an insertion query if provided the parameters for the product model [fk_category_id, fk_stock_id, product_name, product_price, product_description, createdat]', async () => {
    const eps = `insert into product (fk_category_id, fk_stock_id, product_name, product_price, product_description, createdat) values ('1', '1', 'tallarines', '599', 'some lorem ipsum', 'today') returning *;`;
    const r = await proxiedProduct.insertProduct({
      fk_category_id: 1,
      fk_stock_id: 1,
      product_name: 'tallarines',
      product_price: 599,
      product_description: 'some lorem ipsum',
      createdat: 'today'
    });
    expect(r.toLowerCase()).toEqual(eps);
  });
  it('should return a updation query if provided some parameters to the updateProduct method', async () => {
    const eps = `update product set fk_category_id='23', product_description='other lorem ipsum' where id = 'hele';`;
    const r = await proxiedProduct.updateProduct(
      { fk_category_id: 23, product_description: 'other lorem ipsum' },
      'hele'
    );
    expect(r.toLowerCase()).toEqual(eps);
  });
  it('should return a deletion query if provided the id to the deleteProduct method', async () => {
    const eps = `delete from product where id = 'popo';`;
    const r = await proxiedProduct.deleteProduct('popo');
    expect(r.toLowerCase()).toEqual(eps);
  });
  it('should return a selection query provided the parameters to the getProduct method', async () => {
    const eps = `select product_name, product_price, product_description, createdat from product where id = 'caca';`;
    const r = await proxiedProduct.getProduct(
      ['product_name', 'product_price', 'product_description', 'createdat'],
      'caca'
    );
    expect(r.toLowerCase()).toEqual(eps);
  });
});
