# Backend Test Envíame

## Requirements
 - Docker installed
## Construction 🛠️
* **Language:** NodeJS 
* **Framework:** Express, Sequelize.

## Installation and execution
Run ```docker-compose``` command inside **docker-nodejs** folder.

1) Build the containers: 
```docker-compose build```

2) Run the database seeders: 
```docker-compose run --rm ecommerce-app npx sequelize-cli db:seed:all```

#### Starting the services: 
    docker-compose up 

#### Stoping the services: 
    docker-compose stop
    
#### Testing
    Endpoints can be tested with the attached postman collection.
    Disclaimer: get users endpoint is unprotected so it's easy for the tester to get user data and login/test.



