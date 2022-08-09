const mongoose = require("mongoose");

const DB_URI = process.env.MONGODB_URL || process.env.MONGODB_CLOUD_URL;
const SERVER_PORT = process.env.PORT || 3000;

// connect to the database
const connectDB = async (server) => {
  try {
    const conn = await mongoose.connect(DB_URI);
    const { port, host } = conn?.connection;
    console.log(
      `database connection established on port:${port}  host:${host}`.cyan
        .underline.bold
    );
    await server.listen(SERVER_PORT, () => {
      console.log(`server listening on port ${SERVER_PORT}!`.yellow);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
