import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import resolvers from "./graphql/resolvers/index.js";
import graphqlSchema from "./graphql/schema/index.js";
import isAuth from "./middlewares/is-auth.js";

const app = express();

dotenv.config({ path: "./env/.env" });
app.use(express.json());
app.use(isAuth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: resolvers,
    graphiql: true,
  })
);

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    const PORT = process.env.PORT ? process.env.PORT : 3000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
