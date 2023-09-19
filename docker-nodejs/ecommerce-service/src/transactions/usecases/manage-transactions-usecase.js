const Transaction = require('../entities/transaction');


class ManageTransactionsUsecase {

  constructor(transactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  async getTransactions() {
    return await this.transactionsRepository.getTransactions();
  }

  async getTransaction(id) {
    return await this.transactionsRepository.getTransaction(id);
  }

  async createTransaction(data) {

    const transaction = new Transaction(undefined, data.UserId)
    const id = await this.transactionsRepository.createTransaction(transaction);
    
    transaction.id = id;
    return transaction;
    

  }

  async updateTransaction(id, data) {

    const transaction = new Transaction(id ,UserId);
    await this.transactionsRepository.updateTransaction(transaction);

    return transaction;

  }

  async deleteTransaction(id) {
    await this.transactionsRepository.deleteTransaction(id);
  }

}

module.exports = ManageTransactionsUsecase;