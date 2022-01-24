# teasas_backend
Teasas Technical Test

This project demonstrates the teasas technical test requirement as received via email

## Stacks
```Database```   : PostgreSQL
```Language```   : Javascript/ES6^
```Unit Test```   :  Mocha, Chai, Sinon
```Framework / Environment```   :  Node.js && Express
```version control```   : Git/Github

## Installation
1. Ensure you have all the below listed stacks on your machine
2. From you terminal run ```git clone https://github.com/torsami77/teasas_backend.git```
3. After cloning run ```cd teasas_backend``` to navigate to cloned directory
4. run ```npm install``` to install all the devDevpendencies. **See "devDependencies" section in package.json file for list of all packages that will be installed**
5. run ```npm run migrate``` to run database migrations
6. run ```npm run seed``` to seed the database with prepared "lessons" seeds
7. run ```npm test``` or ```npm t``` to run test

## Scripts
```npm run start:dev```   : To run development mode
```npm run build```   : To run build
```npm start```   : To run production mode
```npm test```   :  To run test
See the **scripts** section of **package.json** file for all available configured scripts. 

## Models and Database
Setup to use Postgres and Sequelise ORM.
```npm run migrate``` : to run models migration to database
```npm run undo-migrate``` : to undo models migration to database
```npm run seed``` : to run seed
```npm run undo-seed``` : to undo seed
**See sequelise documentation below for more guides on creating and managing models https://sequelize.org/master/manual/migrations.html**

## API Documentation
### Routes
```/api/v1/auth/sign_in```: Sign in
```/api/v1/auth/sign_up```: Sign up
```/api/v1/lessons/get_all_lessons```: get all lessons

Please refer to **teasas.postman_collection.json** file in the root folder to see saved postman API request/response example, please do not hesitate to reach out to **torsami77@gmail.com** for questions/comments.

## Thank you
