const createExpressApp = require('./frameworks/http/express');

const SequelizeClient = require('./frameworks/db/sequelize');


const createUsersRouter = require('./users/http/users-router');
const createCategoriesRouter = require('./categories/http/categories-router');
const createProductsRouter = require('./products/http/products-router');
const createTransactionsRouter = require('./transactions/http/transactions-router');


const ManageUsersUsecase = require('./users/usecases/manage-users-usecase');
const ManageCategoriesUsecase = require('./categories/usecases/manage-categories-usecase');
const ManageProductsUsecase = require('./products/usecases/manage-products-usecase');
const ManageTransactionsUsecase = require('./transactions/usecases/manage-transactions-usecase');


const SequelizeUsersRepository = require('./users/repositories/sequelize-users-repository');
const SequelizeCategoriesRepository = require('./categories/repositories/sequelize-categories-repository');
const SequelizeProductsRepository = require('./products/repositories/sequelize-products-repository');
const SequelizeTransactionsRepository = require('./transactions/repositories/sequelize-transactions-repository');



const sequelizeClient = new SequelizeClient();


const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(sequelizeClient);
const sequelizeProductsRepository = new SequelizeProductsRepository(sequelizeClient);
const sequelizeTransactionsRepository = new SequelizeTransactionsRepository(sequelizeClient);
const sequelizeUsersRepository = new SequelizeUsersRepository(sequelizeClient);

//Relaciones

sequelizeClient.sequelize.models.User.hasMany(sequelizeClient.sequelize.models.Product,{ foreignKey: 'UserId', as: 'products' });

sequelizeClient.sequelize.models.Product.belongsTo(sequelizeClient.sequelize.models.User);


sequelizeClient.sequelize.models.Category.hasMany(sequelizeClient.sequelize.models.Product,{ foreignKey: 'CategoryId', as: 'products' });

 sequelizeClient.sequelize.models.Product.belongsTo(sequelizeClient.sequelize.models.Category,{ foreignKey: 'CategoryId', as: 'category' });


sequelizeClient.sequelize.models.User.hasMany(sequelizeClient.sequelize.models.Transaction);

sequelizeClient.sequelize.models.Transaction.belongsTo(sequelizeClient.sequelize.models.User,{ foreignKey: 'UserId', as: 'users' });

sequelizeClient.sequelize.models.Transaction.belongsToMany(sequelizeClient.sequelize.models.Product, {
  through: 'product_transaction',
  as: 'products'
});

sequelizeClient.sequelize.models.Product.belongsToMany(sequelizeClient.sequelize.models.Transaction, {
  through: 'product_transaction',
  as: 'transactions'
});





sequelizeClient.syncDatabase();


const manageUsersUsecase = new ManageUsersUsecase(sequelizeUsersRepository);
const manageCategoriesUsecase = new ManageCategoriesUsecase(sequelizeCategoriesRepository);
const manageProductsUsecase = new ManageProductsUsecase(sequelizeProductsRepository);
const manageTransactionsUsecase = new ManageTransactionsUsecase(sequelizeTransactionsRepository);

let routers = [
  createUsersRouter(manageUsersUsecase),
  createCategoriesRouter(manageCategoriesUsecase),
  createProductsRouter(manageProductsUsecase),
  createTransactionsRouter(manageTransactionsUsecase)
];
  


const app = createExpressApp(routers);