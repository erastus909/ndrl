const mongoose = require("mongoose");
const dbpass = process.env.mongoDB;
const dbName = "DocumentRecords";
const conn = `mongodb+srv://erastusiilonga:${dbpass}@cluster0.4arxz.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const connectDb = async () => {
  await mongoose.connect(
    conn,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.log("error in connection");
      } else {
        console.log("mongodb is connected");
      }
    }
  );
};

module.exports = connectDb;
