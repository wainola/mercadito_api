const MetaApeiron = require('meta-apeiron');
const Product = require('./index');
const ProxiedInstance = require('../../testsUtils/ProxyInstance');

describe('Product model unit test', () => {
  let proxiedProduct;
  beforeAll(() => {
    const ProxiedProduct = ProxiedInstance(Product);
    const productModel = new ProxiedProduct();
    proxiedProduct = MetaApeiron.setDependency(productModel).proxyInstance();
  });

  it('should return an insertion query if provided the parameters for the product model [fk_category_id, fk_stock_id, product_name, product_price, product_description, createdat]', async () => {
    const eps = `insert into product (fk_category_id, fk_stock_id, product_name, product_price, product_description, createdat) values (1, 1, 'tallarines', 599, 'some lorem ipsum', 'today') returning *;`;
    const r = await proxiedProduct.insert({
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
    const eps = `update product set fk_category_id=23, product_description='other lorem ipsum' where id = 'hele';`;
    const r = await proxiedProduct.update(
      { fk_category_id: 23, product_description: 'other lorem ipsum' },
      'hele'
    );
    expect(r.toLowerCase()).toEqual(eps);
  });
  it('should return a deletion query if provided the id to the deleteProduct method', async () => {
    const eps = `delete from product where id = 'popo';`;
    const r = await proxiedProduct.delete('popo');
    expect(r.toLowerCase()).toEqual(eps);
  });
  it('should return a selection query provided the parameters to the getProduct method', async () => {
    const eps = `select product_name, product_price, product_description, createdat from product where id = 'caca';`;
    const r = await proxiedProduct.get(
      ['product_name', 'product_price', 'product_description', 'createdat'],
      'caca'
    );
    expect(r.toLowerCase()).toEqual(eps);
  });
});
