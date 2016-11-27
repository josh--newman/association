const players = [
  {id: 1, firstName: 'Michael', lastName: 'Jordan'},
  {id: 2, firstName: 'Kobe', lastName: 'Bryant'},
  {id: 3, firstName: 'Russell', lastName: 'Westbrook'}
];

const schema = `
type Player {
  id: ID!
  firstName: String!
  lastName: String!
}

type Query {
  players: [Player]
}

type Mutation {
  createPlayer(
    firstName: String!
    lastName: String!
  ): Player
}

schema {
  query: Query
  mutation: Mutation
}
`;

const resolveFunctions = {
  Query: {
    players() {
      return players;
    }
  },

  Mutation: {
    createPlayer(_, { firstName, lastName }) {
      const newPlayer = {
        id: Math.ceil(Math.random() * 100),
        firstName,
        lastName
      };
      players.push(newPlayer);
      return newPlayer;
    }
  }
}

module.exports = {
  resolvers: resolveFunctions,
  schema: schema
};
