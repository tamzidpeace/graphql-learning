const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { readFileSync } = require('fs');
const resolvers = require('./resolvers');

// Load schema from file
const typeDefs = readFileSync('./schema.graphql', 'utf8');

async function startServer() {
  // Create Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start the server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at: ${url}`);
  console.log(`📖 Playground available at: ${url}`);
}

startServer().catch(error => {
  console.error('Error starting server:', error);
});