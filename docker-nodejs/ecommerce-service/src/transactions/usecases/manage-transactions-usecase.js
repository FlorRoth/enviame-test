const Transaction = require('../entities/transaction');


class ManageTransactionsUsecase {

  constructor(transactionsRepository,userRepository,productsRepository) {
    this.transactionsRepository = transactionsRepository;
    this.userRepository = userRepository;
    this.productsRepository = productsRepository;
  }

  async getTransactions() {
    return await this.transactionsRepository.getTransactions();
  }

  async getTransaction(id) {
    return await this.transactionsRepository.getTransaction(id);
  }

  async getTransactionsBuyer() {
    return await this.transactionsRepository.getTransactionsBuyer();
  }

  async getTransactionsSeller() {
    return await this.transactionsRepository.getTransactionsSeller();
  }

  async createTransaction(data) {

    const user = await this.userRepository.getUser(data.UserId);
    if (!user) {
      throw new Error('El usuario especificado no existe.');
    }
    const productIds = data.products || [];

    await Promise.all(productIds.map(async (productId) => {
      const productExists = await this.productsRepository.getProduct(productId);
      if (!productExists) {
        throw new Error(`El producto ${productId} no existe.`);
      }
      if (productExists.quantity === 0) {
        throw new Error(`El producto ${productId} está agotado.`);
      }
      const quantity = productExists.quantity-1;
      await this.productsRepository.updateProductStatus(productExists,quantity);

  
    }));

    const transaction = new Transaction(undefined, data.UserId, data.products ?? []);
    const id = await this.transactionsRepository.createTransaction(transaction);
  
    transaction.id = id;
    return transaction;
    
  }

  async updateTransaction(id, data) {

    const user = await this.userRepository.getUser(data.UserId);
    if (!user) {
      throw new Error('El usuario especificado no existe.');
    }


    const productIds = data.products || [];

    await Promise.all(productIds.map(async (productId) => {
      const productExists = await this.productsRepository.getProduct(productId);
      if (!productExists) {
        throw new Error(`El producto ${productId} no existe.`);
      }
      if (productExists.quantity === 0) {
        throw new Error(`El producto ${productId} está agotado.`);
      }
      const quantity = productExists.quantity-1;
      await this.productsRepository.updateProductStatus(productExists,quantity);
    }));

    const transaction = new Transaction(id  ,data.UserId, data.products ?? []);
    await this.transactionsRepository.updateTransaction(transaction, data.products);


    return transaction;

  }

  async deleteTransaction(id) {
    await this.transactionsRepository.deleteTransaction(id);
  }

}

module.exports = ManageTransactionsUsecase;