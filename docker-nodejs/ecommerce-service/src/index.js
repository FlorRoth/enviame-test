const createExpressApp = require('./frameworks/http/express');

const SequelizeClient = require('./frameworks/db/sequelize');

const createBooksRouter = require('./books/http/books-router');
const createUsersRouter = require('./users/http/users-router');
const createCategoriesRouter = require('./categories/http/categories-router');
const createProductsRouter = require('./products/http/products-router');
const createTransactionsRouter = require('./transactions/http/transactions-router');

const ManageBooksUsecase = require('./books/usecases/manage-books-usecase');
const ManageUsersUsecase = require('./users/usecases/manage-users-usecase');
const ManageCategoriesUsecase = require('./categories/usecases/manage-categories-usecase');
const ManageProductsUsecase = require('./products/usecases/manage-products-usecase');
const ManageTransactionsUsecase = require('./transactions/usecases/manage-transactions-usecase');


const SequelizeBooksRepository = require('./books/repositories/sequelize-books-repository');
const SequelizeUsersRepository = require('./users/repositories/sequelize-users-repository');
const SequelizeCategoriesRepository = require('./categories/repositories/sequelize-categories-repository');
const SequelizeProductsRepository = require('./products/repositories/sequelize-products-repository');
const SequelizeTransactionsRepository = require('./transactions/repositories/sequelize-transactions-repository');




// Instanciar dependencias.

// En el caso de uso de de libros, es es posible pasarle como parámetro el repositorio
// de Firestore o el repositorio con Sequelize, y en ambos casos debería funcionar,
// incluso si el cambio se hace mientras la aplicación está en ejecución.



const sequelizeClient = new SequelizeClient();

const sequelizeBooksRepository = new SequelizeBooksRepository(sequelizeClient);
const sequelizeUsersRepository = new SequelizeUsersRepository(sequelizeClient);
const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(sequelizeClient);
const sequelizeProductsRepository = new SequelizeProductsRepository(sequelizeClient);
const sequelizeTransactionsRepository = new SequelizeTransactionsRepository(sequelizeClient);

//Relaciones

sequelizeClient.sequelize.models.User.hasMany(sequelizeClient.sequelize.models.Product);

sequelizeClient.sequelize.models.Product.belongsTo(sequelizeClient.sequelize.models.User);


sequelizeClient.sequelize.models.Category.hasMany(sequelizeClient.sequelize.models.Product);

 sequelizeClient.sequelize.models.Product.belongsTo(sequelizeClient.sequelize.models.Category);


sequelizeClient.sequelize.models.User.hasMany(sequelizeClient.sequelize.models.Transaction);

sequelizeClient.sequelize.models.Transaction.belongsTo(sequelizeClient.sequelize.models.User);

sequelizeClient.sequelize.models.Transaction.belongsToMany(sequelizeClient.sequelize.models.Product, {
  through: 'product_transaction',
});

sequelizeClient.sequelize.models.Product.belongsToMany(sequelizeClient.sequelize.models.Transaction, {
  through: 'product_transaction',
});



sequelizeClient.syncDatabase();

const manageBooksUsecase = new ManageBooksUsecase(sequelizeBooksRepository);
const manageUsersUsecase = new ManageUsersUsecase(sequelizeUsersRepository);
const manageCategoriesUsecase = new ManageCategoriesUsecase(sequelizeCategoriesRepository);
const manageProductsUsecase = new ManageProductsUsecase(sequelizeProductsRepository);
const manageTransactionsUsecase = new ManageTransactionsUsecase(sequelizeTransactionsRepository);

let routers = [
  createBooksRouter(manageBooksUsecase),
  createUsersRouter(manageUsersUsecase),
  createCategoriesRouter(manageCategoriesUsecase),
  createProductsRouter(manageProductsUsecase),
  createTransactionsRouter(manageTransactionsUsecase)
];
  
// Crear aplicación Express con dependencias inyectadas.

const app = createExpressApp(routers);