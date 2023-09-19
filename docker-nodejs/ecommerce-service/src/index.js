const createExpressApp = require('./frameworks/http/express');

const SequelizeClient = require('./frameworks/db/sequelize');

const createBooksRouter = require('./books/http/books-router');
const createUsersRouter = require('./users/http/users-router');
const createCategoriesRouter = require('./categories/http/categories-router');
const createProductsRouter = require('./products/http/products-router');

const ManageBooksUsecase = require('./books/usecases/manage-books-usecase');
const ManageUsersUsecase = require('./users/usecases/manage-users-usecase');
const ManageCategoriesUsecase = require('./categories/usecases/manage-categories-usecase');
const ManageProductsUsecase = require('./products/usecases/manage-products-usecase');


const SequelizeBooksRepository = require('./books/repositories/sequelize-books-repository');
const SequelizeUsersRepository = require('./users/repositories/sequelize-users-repository');
const SequelizeCategoriesRepository = require('./categories/repositories/sequelize-categories-repository');
const SequelizeProductsRepository = require('./products/repositories/sequelize-products-repository');




// Instanciar dependencias.

// En el caso de uso de de libros, es es posible pasarle como parámetro el repositorio
// de Firestore o el repositorio con Sequelize, y en ambos casos debería funcionar,
// incluso si el cambio se hace mientras la aplicación está en ejecución.



const sequelizeClient = new SequelizeClient();

const sequelizeBooksRepository = new SequelizeBooksRepository(sequelizeClient);
const sequelizeUsersRepository = new SequelizeUsersRepository(sequelizeClient);
const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(sequelizeClient);
const sequelizeProductsRepository = new SequelizeProductsRepository(sequelizeClient);

//Relaciones

sequelizeClient.sequelize.models.User.hasMany(sequelizeClient.sequelize.models.Product);

sequelizeClient.sequelize.models.Product.belongsTo(sequelizeClient.sequelize.models.User, {
  foreignKey: 'seller_user',
  as: 'seller',
});

sequelizeClient.sequelize.models.Category.hasMany(sequelizeClient.sequelize.models.Product);

 sequelizeClient.sequelize.models.Product.belongsTo(sequelizeClient.sequelize.models.Category, {
   foreignKey: 'category',
   as: 'category_product',
 });




sequelizeClient.syncDatabase();

const manageBooksUsecase = new ManageBooksUsecase(sequelizeBooksRepository);
const manageUsersUsecase = new ManageUsersUsecase(sequelizeUsersRepository);
const manageCategoriesUsecase = new ManageCategoriesUsecase(sequelizeCategoriesRepository);
const manageProductsUsecase = new ManageProductsUsecase(sequelizeProductsRepository);

let routers = [
  createBooksRouter(manageBooksUsecase),
  createUsersRouter(manageUsersUsecase),
  createCategoriesRouter(manageCategoriesUsecase),
  createProductsRouter(manageProductsUsecase)
];
  
// Crear aplicación Express con dependencias inyectadas.

const app = createExpressApp(routers);