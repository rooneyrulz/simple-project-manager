const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const schema = require("./schema");
const useAuth = require("./middleware/auth");
require("colors");

dotenv.config({ path: "./config.env" });

const SERVER_PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "production";
const DB_URI = process.env.MONGODB_URL || process.env.MONGODB_CLOUD_URL;

if (NODE_ENV === "production") console.log = function () {};

const app = express();
connectDB(DB_URI, app, SERVER_PORT);

app.use(cors());
app.use(useAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: NODE_ENV === "development",
  })
);


module.exports = app;
