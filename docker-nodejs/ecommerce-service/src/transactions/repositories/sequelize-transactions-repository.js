const { DataTypes } = require('sequelize');


class SequelizeTransactionsRepository {

  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;
    
  

    let tableName = "transactions";
    

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      }


    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.transactionModel = sequelizeClient.sequelize.define('Transaction', columns, options);
    

  }

  async getTransactions() {

    const transactions = await this.transactionModel.findAll({
      raw: true
    });

    return transactions;

  }

  async getTransaction(id) {

    return await this.transactionModel.findByPk(id);

  }

  async getTransactionsBuyer() {
    const transactions = await this.transactionModel.findAll({
      include: [{
        model: this.sequelizeClient.sequelize.models.User,
        as: 'users',
        required: true,
        attributes: []
      }],
      raw: true
    });

    return transactions;

  }
  async getTransactionsSeller() {
    const transactions = await this.transactionModel.findAll({
      include: [{
        model: this.sequelizeClient.sequelize.models.User,
        as: 'users',
        required: true,
        attributes: [],
        include: [{
          model: this.sequelizeClient.sequelize.models.Product, 
          as: 'products',
          required: true,
          attributes: []
        }],
      }],
      raw: true
    });

    return transactions;

  }

  async createTransaction(transactionData, productData = []) {
    try {

      const transaction = await this.transactionModel.create(transactionData, {
        include: [{ model: this.sequelizeClient.sequelize.models.Product, as: 'products', through: 'product_transaction' }],
      });
  
  
      if (productData.length > 0) {
        await transaction.setProducts(productData);
      }

      return transaction;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateTransaction(transaction) {

    const options = {
      where: {
        id: transaction.id,
      }
    };

    await this.transactionModel.update(transaction, options);

  }

  async deleteTransaction(id) {

    const options = {
      where: {
        id: id,
      }
    };

    await this.transactionModel.destroy(options);

  }

  async deleteAllTransactions() {

    if (this.test) {

      const options = {
        truncate: true
      };

      await this.transactionModel.destroy(options);

    }

  }

  async dropTransactionsTable() {

    if (this.test) {
      await this.transactionModel.drop();
    }

  }

}

module.exports = SequelizeTransactionsRepository;