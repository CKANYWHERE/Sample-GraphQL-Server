
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./resolvers/HellowordResolver";
import compression from "compression";
//import { MovieResolver } from "./resolvers/MovieResolver";
import { UserResolver } from './resolvers/resolver.user';

(async () => {
  const app = express();
  app.use(compression()); 

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver,UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false ,path:"/api/v1"});

  app.listen(4000, () => {
    console.log("express server started");
  });
})();