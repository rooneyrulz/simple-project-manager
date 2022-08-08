const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const schema = require("./schema/schema");
const useAuth = require("./middleware/auth")
require("colors");

dotenv.config({ path: "./config.env" });

process.env.NODE_ENV === "production" && console.log == function () {};

const app = express();
connectDB(app);

app.use(useAuth)
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

module.exports = app;
