const express = require('express');
const appRoot = require('app-root-path');
const Transaction = require('../entities/transaction');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");


function createTransactionsRouter(manageTransactionsUsecase) {

  const router = express.Router();

  router.get("/transactions", async (req, res) => {
    try {
      const transactions = await manageTransactionsUsecase.getTransactions();
      if (transactions.length === 0) {
        res.status(404).send("No se encontraron transacciones.");
      } else {
        res.status(200).send(transactions);
      }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }
  });

  router.get("/transactions/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const transaction = await manageTransactionsUsecase.getTransaction(id);
      if (!transaction) {
        res.status(404).send("Transaccion no encontrada.");
      } else {
        res.status(200).send(transaction);
      }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }
    
  });

  router.get("/transactions/users/:type_user", async (req, res) => {
    try { 
      const type_user = req.params.type_user;
      let transactions  = [];
      if(type_user === 'seller'){
        transactions =  await manageTransactionsUsecase.getTransactionsSeller();
      }
      else if (type_user === 'buyer') {
        transactions =  await manageTransactionsUsecase.getTransactionsBuyer();
      }
      else {
        res.status(400).send("Tipo de usuario no válido.");
        return;
      }
      if (transactions.length === 0) {
        res.status(404).send("No se encontraron transacciones.");
      } else {
        res.status(200).send(transactions);
      }

    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }
   
    
  });
  
  router.post("/transactions", async (req, res) => {
    try {
      const validation = validateSchema(Transaction.schema, req);
      
      if (validation === true) {
        const transaction = await manageTransactionsUsecase.createTransaction(req.body);
        res.status(201).send(transaction);
      } else {
        res.status(422).send(validation)
      }

    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }


  });

  router.put("/transactions/:id", async (req, res) => {
    try {
      const validation = validateSchema(Transaction.schema, req);
      if (validation === true) {
        const id = req.params.id;
        const transactionGet = await manageTransactionsUsecase.getTransaction(id);
        if (!transactionGet) {
          res.status(404).send("Transaccion no encontrada.");
        } else {
          const transaction = await manageTransactionsUsecase.updateTransaction(id, req.body);
          res.status(200).send(transaction);
        }
      } else {
        res.status(422).send(validation);
      }
    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }

  });

  router.delete("/transactions/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const transaction= await manageTransactionsUsecase.getTransaction(id);
      if (!transaction) {
        res.status(404).send(`Transaccion con ID ${id} no encontrada`);
      } else {
        await manageTransactionsUsecase.deleteTransaction(id);
        res.status(200).send(`Transaccion con ID ${id} eliminada`);
      }

    } catch (error) {
      res.status(500).send("Error interno del servidor: " + error.message);
    }
;

  });

  return router;

}

module.exports = createTransactionsRouter;