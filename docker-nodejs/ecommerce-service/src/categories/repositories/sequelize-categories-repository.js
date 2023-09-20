const { DataTypes } = require('sequelize');


class SequelizeCategoriesRepository {

  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;
    
  

    let tableName = "categories";

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
      description: DataTypes.STRING,

    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.categoryModel = sequelizeClient.sequelize.define('Category', columns, options);

  }

  async getCategories() {

    const categories = await this.categoryModel.findAll({
      raw: true
    });

    return categories;

  }

  async getCategory(id) {

    return await this.categoryModel.findByPk(id);

  }
  async getCategoryBuyer(buyer_id) {
    const categories = await this.categoryModel.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: this.sequelizeClient.sequelize.models.Product, 
          as: 'products',
          attributes: [],
          required: true,
          include: [
            {
              model: this.sequelizeClient.sequelize.models.Transaction, 
              as: 'transactions',
              required: true,
              where: {
                UserId: buyer_id,
              },
              through: {
                attributes: []
              },
              attributes: []
            }
          ],
        },
      ],
      raw: true,
      group: ['Category.id']
    });
  
    return categories;
  }
  

  async createCategory(category) {

    const data = await this.categoryModel.create(category);    
    return data.id;

  }

  async updateCategory(category) {

    const options = {
      where: {
        id: category.id,
      }
    };

    await this.categoryModel.update(category, options);

  }

  async deleteCategory(id) {

    const options = {
      where: {
        id: id,
      }
    };

    await this.categoryModel.destroy(options);

  }

  async deleteAllCategories() {

    if (this.test) {

      const options = {
        truncate: true
      };

      await this.categoryModel.destroy(options);

    }

  }

  async dropCategoriesTable() {

    if (this.test) {
      await this.categoryModel.drop();
    }

  }

}

module.exports = SequelizeCategoriesRepository;