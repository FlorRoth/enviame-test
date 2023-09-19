const express = require('express');
const appRoot = require('app-root-path');
const Transaction = require('../entities/transaction');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");


function createTransactionsRouter(manageTransactionsUsecase) {

  const router = express.Router();

  router.get("/transactions", async (req, res) => {

    const transactions = await manageTransactionsUsecase.getTransactions();
    res.status(200).send(transactions);

  });

  router.get("/transactions/:id", async (req, res) => {

    const id = req.params.id;
    const transaction = await manageTransactionsUsecase.getTransaction(id);
    
    res.status(200).send(transaction);
    
  });
  
  router.post("/transactions", async (req, res) => {
    
    validation = validateSchema(Transaction.schema, req);
    
    if (validation === true) {
      const transaction = await manageTransactionsUsecase.createTransaction(req.body);
      res.status(201).send(transaction);
    } else {
      res.status(422).send(validation)
    }

  });

  router.put("/transactions/:id", async (req, res) => {
    
    validation = validateSchema(Transaction.schema, req);
    
    if (validation === true) {
      const id = req.params.id;
      const transaction = await manageTransactionsUsecase.updateTransaction(id, req.body);
      res.status(200).send(transaction);
    } else {
      res.status(422).send(validation);
    }

  });

  router.delete("/transactions/:id", async (req, res) => {

    const id = req.params.id;
    await manageTransactionsUsecase.deleteTransaction(id);

    res.status(200).send(`Deleted ${id}`);

  });

  return router;

}

module.exports = createTransactionsRouter;