const CategoryHandler = require('../../handlers/CategoryHandler');

class Response {
  constructor() {
    this.statusCode = null;
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  send(obj) {
    return {
      statusCode: this.statusCode,
      body: obj
    };
  }
}

describe('CategoryHandler', () => {
  let res;
  let categoryHandler;
  let postCategorySpy;
  let updateCategorySpy;
  let deleteCategorySpy;
  let getCategoriesSpy;
  let postCategoryBody;
  let updateCategoryBody;
  let deleteCategoryBody;
  beforeAll(() => {
    res = new Response();
    categoryHandler = new CategoryHandler();
    postCategorySpy = jest.spyOn(categoryHandler, 'postCategory');
    updateCategorySpy = jest.spyOn(categoryHandler, 'updateCategory');
    deleteCategorySpy = jest.spyOn(categoryHandler, 'deleteCategory');
    getCategoriesSpy = jest.spyOn(categoryHandler, 'getCategories');

    postCategoryBody = {
      body: { category: { category_name: 'some name' } }
    };
    updateCategoryBody = {
      body: { category: { id: '1', category_name: 'some name' } }
    };
    deleteCategoryBody = {
      body: { category: { id: '1' } }
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
    await categoryHandler.getCategories({}, res);
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
});
