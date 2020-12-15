
import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./resolvers/HellowordResolver";
import compression from "compression";
import * as typeorm from "typeorm";
//import { MovieResolver } from "./resolvers/MovieResolver";
import { Container } from "typedi";
import { UserResolver } from './resolvers/resolver.user';

useContainer(Container);
typeorm.useContainer(Container);

(async () => {
  const app = express();
  app.use(compression()); 

  await createConnection("gamepartner");

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver,UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false ,path:"/api/v1"});

  app.listen(4000, () => {
    console.log("server on 🚀");
  });
})();