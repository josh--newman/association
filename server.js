const express = require('express');
const bodyParser = require('body-parser');
const graphqlExpress = require('graphql-server-express').graphqlExpress;
const graphiqlExpress = require('graphql-server-express').graphiqlExpress;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const schema = require('./schema.js').schema;
const resolvers = require('./schema.js').resolvers;

// Set up schema
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers
});

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

const PORT = process.env.PORT || 4444;
app.listen(PORT);
console.log(`API started on port ${PORT}`);
