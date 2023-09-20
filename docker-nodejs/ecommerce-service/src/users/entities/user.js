

class User {

  static schema = {
    type: "object",
      properties: {
        name : {type: "string",errorMessage:'must be of string type'},
        email :{type: "string",errorMessage:'must be of string type'},
        password : {type: "string",errorMessage:''},
        is_admin : {type: "boolean",errorMessage:'must be of boolean type'}
      },
      required: ["name","email","password","is_admin"],
      additionalProperties: false,
  }

  constructor(id, name, email, password,is_admin) {

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.is_admin = is_admin;

  }

}

module.exports = User;