const Category = require('../entities/category');


class ManageCategoriesUsecase {

  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async getCategories() {
    return await this.categoriesRepository.getCategories();
  }

  async getCategory(id) {
    return await this.categoriesRepository.getCategory(id);
  }

  async getCategoryBuyer(buyer_id) {
    return await this.categoriesRepository.getCategoryBuyer(buyer_id);
  }

  async createCategory(data) {
    
    const category = new Category(undefined, data.name, data.description)
    const id = await this.categoriesRepository.createCategory(category);
    category.id = id;

    return category;

  }

  async updateCategory(id, data) {

    const category = new Category(id, data.name, data.description);
    await this.categoriesRepository.updateCategory(category);

    return category;

  }

  async deleteCategory(id) {
    await this.categoriesRepository.deleteCategory(id);
  }

}

module.exports = ManageCategoriesUsecase;