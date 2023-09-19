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

  async createTransaction(transaction) {
  
    try {
      const data = await this.transactionModel.create(transaction); 
      return data.id;
    } catch (error) {
      console.log(error)
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