const express = require("express");
const dotenv = require("dotenv")
const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema/schema")

dotenv.config();

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port ${process.env.PORT || 3000}`);
});
