const mongoose = require("mongoose");

// connect to the database
const connectDB = async (dbURI, server, serverPort) => {
  try {
    const conn = await mongoose.connect(dbURI);
    const { port, host } = conn?.connection;
    console.log(
      `database connection established on port:${port}  host:${host}`.cyan
        .underline.bold
    );
    await server.listen(serverPort, () => {
      console.log(`server listening on port ${serverPort}!`.yellow);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
