const { DataTypes } = require('sequelize');


class SequelizeUsersRepository {

  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;
    
  

    let tableName = "users";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,

    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.userModel = sequelizeClient.sequelize.define('User', columns, options);
    this.productModel = sequelizeClient.sequelize.models.Product
    this.transactionModel = sequelizeClient.sequelize.models.Transaction

  }

  async getUsers() {

    const users = await this.userModel.findAll({
      raw: true
    });

    return users;

  }
  async getUsersSeller() {
    const users = await this.userModel.findAll({
      attributes: ['id', 'name', 'email'],
      include: [{
        model: this.productModel, 
        as: 'products',
        required: true,
        attributes: []
      }],
      raw: true,
      group: ['User.id']
    });
    return users;

  }

  async getUsersBuyer() {
    const users = await this.userModel.findAll({
      attributes: ['id', 'name', 'email'],
      include: [{
        model: this.transactionModel, 
        as: 'transactions',
        required: true,
        attributes: []
      }],
      raw: true,
      group: ['User.id']
    });
    return users;

  }

  async getUser(id) {

    return await this.userModel.findByPk(id);

  }

  async getUserEmail(email) {

    return await this.userModel.findOne({where: {email: email}});

  }

  async createUser(user) {

    const data = await this.userModel.create(user);    
    return data.id;

  }

  async updateUser(user) {

    const options = {
      where: {
        id: user.id,
      }
    };

    await this.userModel.update(user, options);

  }

  async deleteUser(id) {

    const options = {
      where: {
        id: id,
      }
    };

    await this.userModel.destroy(options);

  }

  async deleteAllUsers() {

    if (this.test) {

      const options = {
        truncate: true
      };

      await this.userModel.destroy(options);

    }

  }

  async dropUsersTable() {

    if (this.test) {
      await this.userModel.drop();
    }

  }

}

module.exports = SequelizeUsersRepository;