

class Category {

  static schema = {
    type: "object",
      properties: {
        name : {type: "string",errorMessage:'must be of string type'},
        description :{type: "string",errorMessage:'must be of string type'},
      },
      required: ["name","description"],
      additionalProperties: false,
  }

  constructor(id, name, description) {

    this.id = id;
    this.name = name;
    this.description = description;

  }

}

module.exports = Category;