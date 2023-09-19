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

  async createCategory(data) {
    
    const category = new Category(undefined, data.name, data.description)
    const id = await this.categoriesRepository.createCategory(category);
    category.id = id;

    return category;

  }

  async updateCategory(id, data) {

    const category = new Category(id, data.name, data.email, data.password,data.is_admin);
    await this.categoriesRepository.updateCategory(category);

    return category;

  }

  async deleteCategory(id) {
    await this.categoriesRepository.deleteCategory(id);
  }

}

module.exports = ManageCategoriesUsecase;