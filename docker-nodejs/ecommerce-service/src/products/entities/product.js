// Entidad usuario

class Product {

  static schema = {
    type: "object",
      properties: {
        name : {type: "string",errorMessage:'must be of string type'},
        description :{type: "string",errorMessage:'must be of string type'},
        quantity :{type: "integer",errorMessage:'must be of integer type'},
        status: { type: "string", enum: ["active", "inactive"], errorMessage: 'must be "active" or "inactive"' },
        UserId: { type: "integer",errorMessage:'must be of integer type'},
        CategoryId: { type: "integer",errorMessage:'must be of integer type'},
      },
      required: ["name","description","quantity","status","UserId","CategoryId"],
      additionalProperties: true,
  }

  constructor(id, name, description, quantity,status,UserId,CategoryId) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.status = status
    this.UserId = UserId;
     this.CategoryId = CategoryId;
  }

}

module.exports = Product;