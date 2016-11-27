const express = require('express');
const bodyParser = require('body-parser');
const graphqlExpress = require('graphql-server-express').graphqlExpress;
const graphiqlExpress = require('graphql-server-express').graphiqlExpress;

const PORT = process.env.PORT || 4444;

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: {}
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.listen(PORT);
