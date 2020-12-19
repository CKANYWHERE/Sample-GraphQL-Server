
import "reflect-metadata";
import "dotenv/config";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import compression from "compression";
import { UserResolver } from './resolvers/resolver.user';
import router from './api_controller/refreshToken';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

(async () => {
  const app = express();
  await createConnection("gamepartner");

  app.use(compression());
  app.use(cookieParser())
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  app.use(bodyParser.urlencoded({ extended: true })); 
  app.use(router)

  const options = {
    host: "0.0.0.0",
    port: 4000
  }
  
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false ,path:"/api/v1"});

  app.listen(options, () => {
    console.log("server on 🚀");
  });
})();