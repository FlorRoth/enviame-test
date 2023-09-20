const express = require('express');
const appRoot = require('app-root-path');
const Category = require('../entities/category');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");


function createCategoriesRouter(manageCategoriesUsecase) {

  const router = express.Router();

  router.get("/categories", async (req, res) => {
    try {
        const categories = await manageCategoriesUsecase.getCategories();
        if (categories.length === 0) {
          res.status(404).send("No se encontraron categorias.");
        } else {
          res.status(200).send(categories);
        }
        
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }


  });

  router.get("/categories/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const category = await manageCategoriesUsecase.getCategory(id);
      
      if (!category) {
        res.status(404).send("Categoria no encontrada.");
      } else {
        res.status(200).send(category);
      }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }
;
    
  });

  router.get("/categories/buyer/:buyer_id", async (req, res) => {
    try {
      const buyer_id = req.params.buyer_id;
      const categories = await manageCategoriesUsecase.getCategoryBuyer(buyer_id);
      if (categories.length === 0) {
        res.status(404).send("No se encontraron categorias.");
      } else {
        res.status(200).send(categories);
      }

    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }

  });
  
  router.post("/categories", async (req, res) => {
    try {
        validation = validateSchema(Category.schema, req);
        
        if (validation === true) {
          const category = await manageCategoriesUsecase.createCategory(req.body);
          res.status(201).send(category);
        } else {
          res.status(422).send(validation)
        }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }
 

  });

  router.put("/categories/:id", async (req, res) => {
    try {
      validation = validateSchema(Category.schema, req);
      if (validation === true) {
        const id = req.params.id;
        const categoryGet = await manageCategoriesUsecase.getCategory(id);
      
        if (!categoryGet) {
          res.status(404).send("Categoria no encontrada.");
        } else {
          const category = await manageCategoriesUsecase.updateCategory(id, req.body);
          res.status(200).send(category);
        }
      } else {
        res.status(422).send(validation);
      }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }

  });

  router.delete("/categories/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const category = await manageCategoriesUsecase.getCategory(id);
      
      if (!category) {
        res.status(404).send(`Categoria con ID ${id} no encontrada.`);
      }
      else {
        await manageCategoriesUsecase.deleteCategory(id);
        res.status(200).send(`Categoria con ID ${id} eliminada`);
      }
      
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }

  });

  return router;

}

module.exports = createCategoriesRouter;