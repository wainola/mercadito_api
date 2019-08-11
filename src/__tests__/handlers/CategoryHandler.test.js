const CategoryHandler = require('../../handlers/CategoryHandler');
const QueryBuilderProxy = require('../../services/QueryBuilderProxy');
const Response = require('../../testsUtils/Response');

class FakeCategoryModel {
  constructor() {
    this.attributes = new Set()
      .add('id')
      .add('category_name')
      .add('createdat')
      .add('updatedat')
      .add('deletedat');
  }

  async insertCategory(param) {
    return param;
  }

  async updateCategory(param, id) {
    return param;
  }

  async deleteCategory(id) {
    return param;
  }

  async getCategory(param, id) {
    return param;
  }
}

const fkc = new FakeCategoryModel();
const queryB = new QueryBuilderProxy([fkc]);
const fkcProxied = queryB.setProxy(fkc);

function ProxyHandler(target) {
  const internalHandler = {
    construct(Target, args) {
      const instance = new Target(...args);
      instance.categoryModel = fkcProxied;
      return instance;
    }
  };
  return new Proxy(target, internalHandler);
}

describe('CategoryHandler unit test', () => {
  let res;
  let categoryHandler;
  let postCategorySpy;
  let updateCategorySpy;
  let deleteCategorySpy;
  let getCategoriesSpy;
  let postCategoryBody;
  let updateCategoryBody;
  let deleteCategoryBody;
  let getCategoryBody;
  beforeAll(() => {
    res = new Response();
    const mockClient = {
      query: async param => param
    };
    const CategoryHandlerProxied = ProxyHandler(CategoryHandler);
    categoryHandler = new CategoryHandlerProxied(mockClient);
    postCategorySpy = jest.spyOn(categoryHandler, 'postCategory');
    updateCategorySpy = jest.spyOn(categoryHandler, 'updateCategory');
    deleteCategorySpy = jest.spyOn(categoryHandler, 'deleteCategory');
    getCategoriesSpy = jest.spyOn(categoryHandler, 'getCategory');

    postCategoryBody = {
      body: { category: { category_name: 'some name' } }
    };
    updateCategoryBody = {
      body: { category: { id: '1', category_name: 'some name' } }
    };
    deleteCategoryBody = {
      body: { category: { id: '1' } }
    };
    getCategoryBody = {
      body: {
        category: {
          id: 1,
          params: ['category_name', 'createdat']
        }
      }
    };
  });

  it('should call the postCategory method', async () => {
    await categoryHandler.postCategory(postCategoryBody, res);
    expect(postCategorySpy).toHaveBeenCalled();
  });
  it('should call the updateCategory method', async () => {
    await categoryHandler.updateCategory(updateCategoryBody, res);
    expect(updateCategorySpy).toHaveBeenCalled();
  });
  it('should call the deleteCategory method', async () => {
    await categoryHandler.deleteCategory(deleteCategoryBody, res);
    expect(deleteCategorySpy).toHaveBeenCalled();
  });
  it('should call the getCategories method', async () => {
    await categoryHandler.getCategory(getCategoryBody, res);
    expect(getCategoriesSpy).toHaveBeenCalled();
  });
  it('should return 200 when passed the body', async () => {
    const categoryToSend = {
      category: {
        category_name: 'tallarines'
      }
    };

    const req = { body: categoryToSend };
    const r = await categoryHandler.postCategory(req, res);
    expect(r.statusCode).toBe(200);
  });
  it('should return 200 if passed a category to insert', async () => {
    const r = await categoryHandler.postCategory(postCategoryBody, res);
    const {
      statusCode,
      body: { data }
    } = r;
    expect(statusCode).toBe(200);
    expect(typeof data === 'string').toBe(true);
  });
  it('should return 200 if passed a category to update', async () => {
    const r = await categoryHandler.updateCategory(updateCategoryBody, res);
    const {
      statusCode,
      body: { data }
    } = r;
    expect(statusCode).toBe(200);
    expect(typeof data).toBe('string');
  });
  it('should return 200 if passed an id to delete on category table', async () => {
    const r = await categoryHandler.deleteCategory(deleteCategoryBody, res);
    const {
      statusCode,
      body: { data }
    } = r;
    expect(statusCode).toBe(200);
    expect(typeof data).toBe('string');
  });
  it('should return 200 if passed some data to get a category', async () => {
    const r = await categoryHandler.getCategory(getCategoryBody, res);
    const {
      statusCode,
      body: { data }
    } = r;
    expect(statusCode).toBe(200);
    expect(typeof data).toBe('string');
  });
});
