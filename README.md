# teasas_backend
Teasas Technical Test

This project demonstrates the teasas technical test requirement as received via email


## Installation

After cloning this repo, check into this root directory and run ``` npm install``` to install all the devDevpendencies. **See "devDependencies" section in package.json file for list of all packages that will be installed**

## Stacks

```Database```   : PostgreSQL
```Language```   : Javascript/ES6^
```Unit Test```   :  Mocha
```Framework / Environment```   :  Node.js && Express

## Scripts

```npm run start:dev```   : To run development mode
```npm start```   : To run production mode
```npm test```   :  To run test

See the **scripts** section of **package.json** file for all available configured scripts. 

## Models and Database

Setup to use Postgres and Sequelise ORM.
```npm run migrate``` : to run models migration to database
```npm run undo-migrate``` : to undo models migration to database
**See sequelise documentation below for more guides on creating and managing models https://sequelize.org/master/manual/migrations.html**

## API Documentation
Use browser to view ```/``` root route on running version to see API documentation template, this can also be updated by modifying **docs.json** file in the ```./api-docs``` directory. 

