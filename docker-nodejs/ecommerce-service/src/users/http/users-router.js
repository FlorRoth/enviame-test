const express = require('express');
const appRoot = require('app-root-path');
const User = require('../entities/user');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");


function createUsersRouter(manageUsersUsecase) {

  const router = express.Router();

  router.get("/users", async (req, res) => {
    try {
      const users = await manageUsersUsecase.getUsers();

      if (users.length === 0) {
        res.status(404).send("No se encontraron usuarios.");
      } else {
        res.status(200).send(users);
      }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }

  });

  router.get("/users/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const user = await manageUsersUsecase.getUser(id);

      if (!user) {
        res.status(404).send("Usuario no encontrado.");
      } else {
        res.status(200).send(user);
      }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }
    
    
  });

  router.get("/users/type/:type_user", async (req, res) => {
    try {
      const type_user = req.params.type_user;
      let users = [];

      if (type_user === 'seller') {
        users = await manageUsersUsecase.getUsersSeller();
      } else if (type_user === 'buyer') {
        users = await manageUsersUsecase.getUsersBuyer();
      } else {
        res.status(400).send("Tipo de usuario no válido.");
        return;
      }

      if (users.length === 0) {
        res.status(404).send("No se encontraron usuarios.");
      } else {
        res.status(200).send(users);
      }

    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }
    
  });
  
  router.post("/users", async (req, res) => {
    
    try {
      const validation = validateSchema(User.schema, req);

      if (validation === true) {
        const user = await manageUsersUsecase.createUser(req.body);
        res.status(201).send(user);
      } else {
        res.status(422).send(validation);
      }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }

  });

  router.put("/users/:id", async (req, res) => {
    
    try {
      validation = validateSchema(User.schema, req);
      if (validation === true) {
        const id = req.params.id;
        const userGet = await manageUsersUsecase.getUser(id);

        if (!userGet) {
          res.status(404).send("Usuario no encontrado.");
        } else {
          const user = await manageUsersUsecase.updateUser(id, req.body);
          res.status(200).send(user);
        }
      } else {
        res.status(422).send(validation);
      }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }

  });

  router.delete("/users/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const user = await manageUsersUsecase.getUser(id);

      if (!user) {
        res.status(404).send(`Usuario con ID ${id} no encontrado`);
      } else {
        await manageUsersUsecase.deleteUser(id);
        res.status(200).send(`Usuario con ID ${id} eliminado`);
      }

    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }

  });

  return router;

}

module.exports = createUsersRouter;