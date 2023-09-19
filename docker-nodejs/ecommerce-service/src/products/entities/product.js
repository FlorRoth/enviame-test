// Entidad usuario

class Product {

  static schema = {
    type: "object",
      properties: {
        name : {type: "string",errorMessage:'must be of string type'},
        description :{type: "string",errorMessage:'must be of string type'},
        quantity :{type: "integer",errorMessage:'must be of integer type'},
        status: { type: "string", enum: ["active", "inactive"], errorMessage: 'must be "active" or "inactive"' },
        seller_user: { type: "integer",errorMessage:'must be of integer type'},
        category: { type: "integer",errorMessage:'must be of integer type'}
      },
      required: ["name","description","quantity","status","seller_user","category"],
      additionalProperties: false,
  }

  constructor(id, name, description, quantity,status,seller_user,category) {

    this.id = id;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.status = status;
    this.seller_user = seller_user;
    this.category = category;

  }

}

module.exports = Product;