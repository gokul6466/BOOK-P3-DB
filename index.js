const express = require("express");
const dotenv = require("dotenv");

const dbconnection = require("./databaseconnections.js")

const userRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");

dotenv.config();

const app = express();

dbconnection();

const PORT = 8081;

app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"server is up and running:-)",
    });
});
app.use("/users",userRouter);
app.use("/books",booksRouter);




app.get("*",(req,res)=>{
    res.status(404).json({
        message:"this route doesnt exist",
    });
});

app.listen(PORT,()=>{
    console.log("server is running at port ${PORT}");
});