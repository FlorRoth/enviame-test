const express = require('express');
const appRoot = require('app-root-path');
const User = require('../entities/user');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");
const bcrypt = require('bcrypt');
const { createTokens, validateTokens } = require('../../JWT')


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

  router.get("/users/:id",validateTokens, async (req, res) => {
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

  router.get("/users/type/:type_user",validateTokens, async (req, res) => {
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
  
  router.post("/register", async (req, res) => {
    
    try {
      const validation = validateSchema(User.schema, req);

      if (validation === true) {
        const {name, email , password , is_admin} = req.body;
        bcrypt.hash(password, 10).then(async (hash) => {
           await manageUsersUsecase.createUser({
            name: name,
            password: hash,
            email: email,
            is_admin: is_admin
          }).then(() => {
            res.json("Usuario registrado")
          }).catch ((error) => {
            if(error) {
              res.status(400).json({error: error});
            }
          })
        })
        
      } else {
        res.status(422).send(validation);
      }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }

  });

  router.post("/login", async (req, res) => {
    
    try {
        const {email, password } = req.body;
        const user = await manageUsersUsecase.getUserEmail(email);

        if(!user) {
          res.status(400).json({error: "El usuario no existe"})
        }
        const dbPassword = user.password;
        bcrypt.compare(password,dbPassword).then((match) =>{
          if(!match){
            res.status(400).json({error: "Combinación incorrecta de email y contraseña"});
          }
          else {
            const accessToken = createTokens(user);
            res.cookie("access-token", accessToken,{
              maxAge: 60*60*42*7*1000,
            });
            res.json("Usuario conectado")
          }
        });
        
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }

  });

  router.put("/users/:id",validateTokens, async (req, res) => {
    
    try {
      validation = validateSchema(User.schema, req);
      if (validation === true) {
        const id = req.params.id;
        const userGet = await manageUsersUsecase.getUser(id);

        if (!userGet) {
          res.status(404).send("Usuario no encontrado.");
        } 
        else {
          const {name, email , password , is_admin} = req.body;
          bcrypt.hash(password, 10).then(async (hash) => {
            await manageUsersUsecase.updateUser(id,{
              name: name,
              password: hash,
              email: email,
              is_admin: is_admin
            }).then(() => {
              res.json("Usuario actualizado")
            }).catch ((error) => {
              if(error) {
                res.status(400).json({error: error});
              }
            })
          })
        }
      } else {
        res.status(422).send(validation);
      }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }

  });

  router.delete("/users/:id",validateTokens, async (req, res) => {
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