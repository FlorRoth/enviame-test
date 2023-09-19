// Entidad usuario

class Transaction {

  static schema = {
    type: "object",
      properties: {
        UserId: { type: "integer",errorMessage:'must be of integer type'},
       
      },
      required: ["UserId"],
      additionalProperties: false,
  }

  constructor(id,UserId) {

    this.id = id;
    this.UserId = UserId;

  }

}

module.exports = Transaction;