# Full Stack open CI/CD

This repository is used for the last two questions of the CI/CD module of the Full stack open course. The base project is a solution to [Part 4](https://fullstackopen.com/en/part4) and [Part 5](https://fullstackopen.com/en/part5) of the course.

## Commands

Start by running `npm run install-all` inside the root folder

`npm run build` to make a production build\
`npm start` to run the project\
`npm run lint-client` to run eslint on client\
`npm run lint-server` to run eslint on server\
`npm run test-client` to run unit tests on client\
`npm run test-server` to test the api\
`npm run start-cypress-mode` run before e2e testing\
`npm run cypress` to run e2e testing\

## Environment variables

Add the following variables in `/blog-server/.env`. Note that a Mongo database must be connected\

```
DB_URL
PORT
DB_NAME 
TEST_DB_NAME
SECRET

```

Add the above secrets into the projects Github action secrets. In addition to the above secrets, also add the following secrets to the Github action secrets\

```
DISCORD_WEBHOOK
FLY_API_TOKEN
```