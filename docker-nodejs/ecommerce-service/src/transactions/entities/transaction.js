

class Transaction {

  static schema = {
    type: "object",
      properties: {
        UserId: { type: "integer",errorMessage:'must be of integer type'},
        products: { 
          type: "array", 
          items: { type: "integer" }, 
          errorMessage: 'must be an array of integers' 
        },
      },
      required: ["UserId","products"],
      additionalProperties: true
  }

  constructor(id, UserId, products) {

    this.id = id;
    this.UserId = UserId;
    this.products = products;
  }


}

module.exports = Transaction;