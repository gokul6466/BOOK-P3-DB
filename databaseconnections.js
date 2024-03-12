const mongoose = require("mongoose");

function dbconnection() {
    const DB_URL = process.env.MONGO_URL;

    mongoose.connect(DB_URL,{
        useNewUrlParser:true,
        UseUnifiedTopology:true,
    });
}

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));

db.once("open",function(){
    console.log("DB connected !!");
});

module.exports = dbconnection;