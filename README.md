# Insurance-server

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/yatinkalra22/insurance-server)

The application receives the JSON payload through the API endpoint and transforms it into a risk profile by calculating a risk score for each line of insurance (life, disability, home & auto) based on the information provided by the user.

## [Furter Usecase Detail can be found here](https://github.com/ccrishi/backend-take-home-assignment/blob/master/README.md)

## Installation
Requires [Node.js](https://nodejs.org/) v12+ to run.
### Local
```sh
cd insurance-server
npm i
npm run dev
```
### Production
```sh
cd insurance-server
npm i
npm start
```

## Technical Implementation

```sh
express - To create rest apis
jest and supertest - To create unit-test cases
nodemon - To auto update the server with new changes
```

## Addtional Comments
```sh
Instead of using typescript I have declared all the type under types folder.
This project can updated to use typescript.
```