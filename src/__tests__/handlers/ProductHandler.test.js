const util = require('util');
const MetaApeiron = require('meta-apeiron');
const ProductHandler = require('../../handlers/ProductHandler');
const Response = require('../../testsUtils/Response');

class FakeProductModel {
  constructor() {
    this.attributes = new Set()
      .add('id')
      .add('fk_category_id')
      .add('fk_stock_id')
      .add('product_name')
      .add('product_price')
      .add('product_description')
      .add('createdat')
      .add('updatedat')
      .add('deletedat');
  }

  async insert(param) {
    return param;
  }

  async update(param, id) {
    return param;
  }

  async delete(id) {
    return param;
  }

  async get(param, id) {
    return param;
  }
}

class FakeCategoryModel {
  constructor() {
    this.attributes = new Set()
      .add('id')
      .add('category_name')
      .add('createdat')
      .add('updatedat')
      .add('deletedat');
  }

  async insert(param) {
    return param;
  }

  async update(param, id) {
    return param;
  }

  async delete(id) {
    return id;
  }

  async get(param, id) {
    return param;
  }
}

class FakeStockModel {
  constructor() {
    this.attributes = new Set().add('id').add('stock_quantity');
  }

  async insert(quantity) {
    return quantity;
  }

  async update(quantity, id) {
    return quantity;
  }

  async get(params, id) {
    return params;
  }
}

const fakeProductModel = new FakeProductModel();
const fakeCategoryModel = new FakeCategoryModel();
const fakeStockModel = new FakeStockModel();

const fakeProxiedProductModel = MetaApeiron.setDependency(fakeProductModel).proxyInstance();
const fakeProxiedCategoryModel = MetaApeiron.setDependency(fakeCategoryModel).proxyInstance();
const fakeProxiedStockModel = MetaApeiron.setDependency(fakeStockModel).proxyInstance();

function ProxyConstructor(target) {
  const internalHandler = {
    construct(Target, args) {
      const instance = new Target(...args);
      instance.productModel = fakeProxiedProductModel;
      instance.categoryModel = fakeProxiedCategoryModel;
      instance.stockModel = fakeProxiedStockModel;
      return instance;
    }
  };

  return new Proxy(target, internalHandler);
}

describe('ProductHandler', () => {
  let productHandler;
  let postProductSpy;
  let updateProductSpy;
  let deleteProductSpy;
  let getProductSpy;
  let postProductBody;
  let updateProductBody;
  let deleteProductBody;
  let getProductBody;
  let re;

  beforeAll(() => {
    res = new Response();
    const mockClient = {
      query: async param => param
    };
    const ProductHandlerProxied = ProxyConstructor(ProductHandler);
    productHandler = new ProductHandlerProxied(mockClient);

    postProductSpy = jest.spyOn(productHandler, 'postProduct');
    updateProductSpy = jest.spyOn(productHandler, 'updateProduct');
    deleteProductSpy = jest.spyOn(productHandler, 'deleteProduct');
    getProductSpy = jest.spyOn(productHandler, 'getProduct');

    postProductBody = {
      body: {
        product: {
          product_name: 'some product',
          product_price: 'some price',
          product_description: 'some lorem description'
        },
        category: {
          id: '1'
        },
        stock: {
          id: '1',
          quantity: '23'
        }
      }
    };

    // productHandler.postProduct(postProductBody).then(d => console.log('POST PRODUCT RESULT:', d));

    updateProductBody = {
      body: {
        product: {
          id: '1',
          product_name: 'some updated name',
          product_description: 'some updated description'
        }
      }
    };

    deleteProductBody = {
      body: {
        product: {
          id: '1'
        }
      }
    };

    getProductBody = {
      body: {
        product: ['product_name', 'product_price', 'product_description']
      }
    };
  });
  it('should have three proxy instances of the models that are hold internally by the class', () => {
    const { productModel, categoryModel, stockModel } = productHandler;
    // console.log(productHandler);
    expect(util.types.isProxy(productModel)).toBe(true);
    expect(util.types.isProxy(categoryModel)).toBe(true);
    expect(util.types.isProxy(stockModel)).toBe(true);
  });
  it('should call the postProduct method', async () => {
    await productHandler.postProduct(postProductBody, res);
    expect(postProductSpy).toHaveBeenCalled();
  });
  it('should call the updateProduct method', async () => {
    await productHandler.updateProduct(updateProductBody, res);
    expect(updateProductSpy).toHaveBeenCalled();
  });
  it('should call the deleteProduct method', async () => {
    await productHandler.deleteProduct(deleteProductBody, res);
    expect(deleteProductSpy).toHaveBeenCalled();
  });
  it('shoudl call the getProduct method', async () => {
    await productHandler.getProduct(getProductBody, res);
    expect(getProductSpy).toHaveBeenCalled();
  });
  it('should return 200 when we passed the body to post a product', async () => {
    const r = await productHandler.postProduct(postProductBody, res);
    const {
      statusCode,
      body: { data }
    } = r;
    expect(statusCode).toBe(200);
    expect(typeof data).toBe('object');
  });
  it('should return 200 when we passed the body to update a product', async () => {
    const r = await productHandler.updateProduct(updateProductBody, res);
    const {
      statusCode,
      body: { data }
    } = r;
    expect(statusCode).toBe(200);
    expect(typeof data).toBe('string');
  });
  it('should return 200 when we passed the body to delete a product', async () => {});
  it('should return 200 when we passed the body to get a product', async () => {});
});
