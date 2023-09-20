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

  async createTransaction(transactionData) {
    try {

      const existingProducts = await this.sequelizeClient.sequelize.models.Product.findAll({
        where: { id: transactionData.products },
      });


      const transaction = await this.transactionModel.create(transactionData);

      await transaction.addProducts(existingProducts);

      return transaction;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateTransaction(transactionData) {
    try {
      const existingProducts = await this.sequelizeClient.sequelize.models.Product.findAll({
        where: { id: transactionData.products },
      });
      const existingTransaction = await this.transactionModel.findByPk(transactionData.id);
      await existingTransaction.update(transactionData);
      await existingTransaction.setProducts(existingProducts);
  } catch (error) {
    console.error(error);
    throw error;
  }

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