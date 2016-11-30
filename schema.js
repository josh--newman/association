const players = [
  {id: 1, firstName: 'Michael', lastName: 'Jordan'},
  {id: 2, firstName: 'Kobe', lastName: 'Bryant'},
  {id: 3, firstName: 'Russell', lastName: 'Westbrook'}
];

const teams = [
  {id: 1, name: 'Chicago Bulls'},
  {id: 2, name: 'Golden State Warriors'}
];

const schema = `
type Player {
  id: ID!
  firstName: String!
  lastName: String!
  teams: [Team!]
}

type Team {
  id: ID!
  name: String!
  players: [Player!]
}

type Query {
  players: [Player]
  teams: [Team]
}

type Mutation {
  createPlayer(
    firstName: String!
    lastName: String!
  ): Player

  createTeam(
    name: String!
  ): Team
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
    },
    teams() {
      return teams;
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
    },

    createTeam(_, { name }) {
      const team = {
        id: Math.ceil(Math.random() * 100),
        name
      };
      teams.push(team);
      return team;
    }
  }
}

module.exports = {
  resolvers: resolveFunctions,
  schema: schema
};
