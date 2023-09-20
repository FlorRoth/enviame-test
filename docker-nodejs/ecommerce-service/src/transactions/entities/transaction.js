

class Transaction {

  static schema = {
    type: "object",
      properties: {
        UserId: { type: "integer",errorMessage:'must be of integer type'},
       
      },
      required: ["UserId"],
      additionalProperties: true
  }

  constructor(id,UserId) {

    this.id = id;
    this.UserId = UserId;
    this.products = [];
  }


}

module.exports = Transaction;