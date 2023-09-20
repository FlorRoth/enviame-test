const Transaction = require('../entities/transaction');


class ManageTransactionsUsecase {

  constructor(transactionsRepository,userRepository) {
    this.transactionsRepository = transactionsRepository;
    this.userRepository = userRepository;
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
    
    const transaction = new Transaction(undefined, data.UserId)
    const id = await this.transactionsRepository.createTransaction(transaction, data.products.length > 0 ? data.products : []);
  
    transaction.id = id;
    return transaction;
    
  }

  async updateTransaction(id, data) {

    const user = await this.userRepository.getUser(data.UserId);
    if (!user) {
      throw new Error('El usuario especificado no existe.');
    }


    const transaction = new Transaction(id ,data.UserId);

    if (data.products && data.products.length > 0) {
      await this.transactionsRepository.updateTransaction(transaction, data.products);
    } else {
      await this.transactionsRepository.updateTransaction(transaction, []);
    }

    return transaction;

  }

  async deleteTransaction(id) {
    await this.transactionsRepository.deleteTransaction(id);
  }

}

module.exports = ManageTransactionsUsecase;