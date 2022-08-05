const express = require("express");
const dotenv = require("dotenv")
const { graphqlHTTP } = require("express-graphql")
const connectDB = require("./config/db");
const schema = require("./schema/schema")
const cors = require("cors")
require("colors")

dotenv.config({ path: "./config.env" });

const app = express();
connectDB(app);

app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))


module.exports = app;
