const mongoose = require("mongoose");

// connect to the database
async function connectDB(server) {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `database connection established on port:${conn.connection.port}  host:${conn.connection.host}`
        .cyan.underline.bold
    );
    await server.listen(process.env.PORT || 3000, () => {
      console.log(`server listening on port ${process.env.PORT || 3000}!`.yellow);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
