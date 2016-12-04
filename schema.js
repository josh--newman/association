const playersData = [
  {id: 1, firstName: 'Michael', lastName: 'Jordan', teams: [1]},
  {id: 2, firstName: 'Kobe', lastName: 'Bryant', teams: []},
  {id: 3, firstName: 'Kevin', lastName: 'Durant', teams: [2]}
];

const teamsData = [
  {id: 1, name: 'Chicago Bulls', players: [1]},
  {id: 2, name: 'Golden State Warriors', players: [3]}
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
      return playersData;
    },
    teams() {
      return teamsData;
    }
  },

  Mutation: {
    createPlayer(_, { firstName, lastName }) {
      const newPlayer = {
        id: Math.ceil(Math.random() * 100),
        firstName,
        lastName
      };
      playersData.push(newPlayer);
      return newPlayer;
    },

    createTeam(_, { name }) {
      const team = {
        id: Math.ceil(Math.random() * 100),
        name
      };
      teamsData.push(team);
      return team;
    }
  },

  Player: {
    teams(player) {
      return teamsData.filter(team => (
        team.players.includes(player.id)
      ));
    }
  },

  Team: {
    players(team) {
      return playersData.filter(player => (
        player.teams.includes(team.id)
      ))
    }
  }
}

module.exports = {
  resolvers: resolveFunctions,
  schema: schema
};
