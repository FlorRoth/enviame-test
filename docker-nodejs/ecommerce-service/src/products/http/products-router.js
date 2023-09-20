const express = require('express');
const appRoot = require('app-root-path');
const Product = require('../entities/product');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");
const { validateTokens } = require('../../JWT')

function createProductsRouter(manageProductsUsecase) {

  const router = express.Router();

  router.get("/products",validateTokens, async (req, res) => {
    try {
      const products = await manageProductsUsecase.getProducts();
      if (products.length === 0) {
        res.status(404).send("No se encontraron products.");
      } else {
        res.status(200).send(products);
      }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }
    

  });

  router.get("/products/:id",validateTokens, async (req, res) => {
    try {
      const id = req.params.id;
      const product = await manageProductsUsecase.getProduct(id);
      if (!product) {
        res.status(404).send("Producto no encontrado.");
      } else {
        res.status(200).send(product);
      }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }
    
    
  });
  
  router.post("/products",validateTokens, async (req, res) => {
    try {
      validation = validateSchema(Product.schema, req);
    
      if (validation === true) {
        const product = await manageProductsUsecase.createProduct(req.body);
        res.status(201).send(product);
      } else {
        res.status(422).send(validation)
      }

    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }

  });

  router.put("/products/:id",validateTokens, async (req, res) => {

    try {
      validation = validateSchema(Product.schema, req);
    
      if (validation === true) {
        const id = req.params.id;
        const productGet = await manageProductsUsecase.getProduct(id);
        if (!productGet) {
          res.status(404).send("Producto no encontrado.");
        } else {
          const product = await manageProductsUsecase.updateProduct(id, req.body);
          res.status(200).send(product);
        }
      } else {
        res.status(422).send(validation);
      }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }

  });

  router.delete("/products/:id",validateTokens, async (req, res) => {
    try {
      const id = req.params.id;
      const product = await manageProductsUsecase.getProduct(id);
      if (!product) {
        res.status(404).send(`Producto con ID ${id} no encontrado`);
      } else {
        await manageProductsUsecase.deleteProduct(id);
        res.status(404).send(`Producto con ID ${id} eliminado`);
      }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }


  });

  return router;

}

module.exports = createProductsRouter;