const mongoose = require("mongoose");

// connect to the database
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `database connection established on port:${conn.connection.port}  host:${conn.connection.host}`
        .cyan.underline.bold
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
