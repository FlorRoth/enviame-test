const createExpressApp = require('./frameworks/http/express');

const SequelizeClient = require('./frameworks/db/sequelize');

const createBooksRouter = require('./books/http/books-router');
const createUsersRouter = require('./users/http/users-router');
const createCategoriesRouter = require('./categories/http/categories-router');

const ManageBooksUsecase = require('./books/usecases/manage-books-usecase');
const ManageUsersUsecase = require('./users/usecases/manage-users-usecase');
const ManageCategoriesUsecase = require('./categories/usecases/manage-categories-usecase');

const SequelizeBooksRepository = require('./books/repositories/sequelize-books-repository');
const SequelizeUsersRepository = require('./users/repositories/sequelize-users-repository');
const SequelizeCategoriesRepository = require('./categories/repositories/sequelize-categories-repository');

// Instanciar dependencias.

// En el caso de uso de de libros, es es posible pasarle como parámetro el repositorio
// de Firestore o el repositorio con Sequelize, y en ambos casos debería funcionar,
// incluso si el cambio se hace mientras la aplicación está en ejecución.



const sequelizeClient = new SequelizeClient();

const sequelizeBooksRepository = new SequelizeBooksRepository(sequelizeClient);
const sequelizeUsersRepository = new SequelizeUsersRepository(sequelizeClient);
const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(sequelizeClient);

sequelizeClient.syncDatabase();

const manageBooksUsecase = new ManageBooksUsecase(sequelizeBooksRepository);
const manageUsersUsecase = new ManageUsersUsecase(sequelizeUsersRepository);
const manageCategoriesUsecase = new ManageCategoriesUsecase(sequelizeCategoriesRepository);

let routers = [
  createBooksRouter(manageBooksUsecase),
  createUsersRouter(manageUsersUsecase),
  createCategoriesRouter(manageCategoriesUsecase)
];
  
// Crear aplicación Express con dependencias inyectadas.

const app = createExpressApp(routers);