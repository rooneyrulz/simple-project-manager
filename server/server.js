const express = require("express");
const dotenv = require("dotenv")
const { graphqlHTTP } = require("express-graphql")
const connectDB = require("./config/db");
const schema = require("./schema/schema")
const cors = require("cors")
require("colors")

dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();

app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port ${process.env.PORT || 3000}`.yellow);
});
