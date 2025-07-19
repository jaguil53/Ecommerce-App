const mongoose = require("mongoose");
const {DATABASE_URI} = require('../constants')

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`Database is connected have ${connection.connection.host} as host and ${connection.connection.port} as port`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectDatabase
