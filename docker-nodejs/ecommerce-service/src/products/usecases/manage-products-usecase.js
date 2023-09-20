const Product = require('../entities/product');


class ManageProductsUsecase {

  constructor(productsRepository,userRepository,categoryRepository) {
    this.productsRepository = productsRepository;
    this.userRepository = userRepository;
    this.categoryRepository = categoryRepository;
  }

  async getProducts() {
    return await this.productsRepository.getProducts();
  }

  async getProduct(id) {
    return await this.productsRepository.getProduct(id);
  }

  async createProduct(data) {
    const user = await this.userRepository.getUser(data.UserId);
    if (!user) {
      throw new Error('El usuario especificado no existe.');
    }
  
    const category = await this.categoryRepository.getCategory(data.CategoryId);
    if (!category) {
      throw new Error('La categoría especificada no existe.');
    }

    const product = new Product(undefined, data.name, data.description,data.quantity,data.status,data.UserId,data.CategoryId)
    const id = await this.productsRepository.createProduct(product);
    
    product.id = id;
    return product;

  }

  async updateProduct(id, data) {

    const user = await this.userRepository.getUser(data.UserId);
    if (!user) {
      throw new Error('El usuario especificado no existe.');
    }
  
    const category = await this.categoryRepository.getCategory(data.CategoryId);
    if (!category) {
      throw new Error('La categoría especificada no existe.');
    }

    const product = new Product(id, data.name, data.description,data.quantity,data.status,data.UserId,data.CategoryId);
    await this.productsRepository.updateProduct(product);

    return product;

  }

  async deleteProduct(id) {
    await this.productsRepository.deleteProduct(id);
  }

}

module.exports = ManageProductsUsecase;