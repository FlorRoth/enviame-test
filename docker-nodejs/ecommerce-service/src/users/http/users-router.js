const express = require('express');
const appRoot = require('app-root-path');
const User = require('../entities/user');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");


function createUsersRouter(manageUsersUsecase) {

  const router = express.Router();

  router.get("/users", async (req, res) => {
    
    const users = await manageUsersUsecase.getUsers();
    res.status(200).send(users);

  });

  router.get("/users/:id", async (req, res) => {

    const id = req.params.id;
    const user = await manageUsersUsecase.getUser(id);
    
    res.status(200).send(user);
    
  });

  router.get("/users/type/:type_user", async (req, res) => {
    const type_user = req.params.type_user;
    let users = [];
    if(type_user === 'seller'){
       users = await manageUsersUsecase.getUsersSeller();
    }
    else if (type_user === 'buyer') {
      users = await manageUsersUsecase.getUsersBuyer();
    }
    
    res.status(200).send(users);
    
  });
  
  router.post("/users", async (req, res) => {
    
    validation = validateSchema(User.schema, req);
    
    if (validation === true) {
      const user = await manageUsersUsecase.createUser(req.body);
      res.status(201).send(user);
    } else {
      res.status(422).send(validation)
    }

  });

  router.put("/users/:id", async (req, res) => {
    
    validation = validateSchema(User.schema, req);
    
    if (validation === true) {
      const id = req.params.id;
      const user = await manageUsersUsecase.updateUser(id, req.body);
      res.status(200).send(user);
    } else {
      res.status(422).send(validation);
    }

  });

  router.delete("/users/:id", async (req, res) => {

    const id = req.params.id;
    await manageUsersUsecase.deleteUser(id);

    res.status(200).send(`Deleted ${id}`);

  });

  return router;

}

module.exports = createUsersRouter;