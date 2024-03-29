const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const excelRead = require("../location");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log("MongoDB connected ...");

    //import Files
    // excelRead();
  } catch (error) {
    console.error(error.message);
    //Exit process
    process.exit(1);
  }
};

module.exports = connectDB;
