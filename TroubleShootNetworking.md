## Docker Compose
___
This is some troubleshooting tips if you are running with docker compose. All the urls are given
as they would appear inside docker compose network. You will need the following .env files. Constants
in the .evn point to end point in the backend as well as mongodb server. You need to add your own .env
files so that you can local veritable. If you were not using docker compose, you will still need these 
files, but you need to fill them with the values that are needed on your system. 

##### required env files
    - Frontend: path ./client/.env
        REACT_BASE=http://backend:5000/
        REACT_AUTH=http://backend:5000/auth  

    - Backend: path ./server/.env
        MONGO_URI=mongodb://user:12345678@mongodb:27017/testdb?authSource=admin
        JWT_SECRET=<your-super-secret-jwt-key-here-dont-use-production>
        TOKEN_KEY=<token_key_dont_use_in_production>
        REACT_FRONTEND=http://frontend:3000 
    
    - Project: ./
        MONGODB_USER = 'user'
        MONGODB_PASSWORD = 12345678
        MONGODB_DATABASE = 'testdb'
        MONGODB_DOCKER_PORT = 27017
        MONGODB_URL = "/localhost:27017"
##### Troubleshoot running containers:
When ruing all three containers with the docker compose command, you can double-check connective 
by running the following command. If you have created the .env files, they should work to define the
network, but nonetheless, you can check by using creating interactive in the individual containers. 

- for either the frontend ot backend

    `sudo docker exec -it <name of continer backend || frontend> /bin/bash`

    example: 'check var with `printenv |  grep REACT_APP`
- DB
    
    `docker exec -it mongodb_server mongosh`

## Project Organization: 

### Frontend 
    └── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── Button.js
    ├── Components
    │   └── SignUp
    │   └── LoginComponent 
    ├── features        -Data Store Please dont delete
    │   └── user  /
    ├── index.css
    ├── index.js  
    ├── logo.svg
    ├── pages
    │   ├── AIRes.js
    │   ├── Home.js
    │   ├── Layout.js
    │   ├── Login.js
    │   ├── NoPage.js
    │   ├── Profile.js
    │   └── Resume.js
    ├── reportWebVitals.js
    ├── Resume.css 
    ├── setupTests.js
    ├── store.js
    └── Style
        └── Login.css

    


### Backend

you can use this script to call between the containers: 
`curl -X POST http://server:5000/signup -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "pass", "username": "un"}' -v`

    .
    ├── Controlers
    │   └── AuthControllers.js
    ├── Dockerfile
    ├── index.js
    ├── Models
    │   └── UserModel.js
    ├── package.json
    ├── package-lock.json
    ├── Routes
    │   └── AuthRoute.js
    └── util
    └── SecretToken.js


### Mongodb_server
 This gets handled with in the backend /server/Models 
