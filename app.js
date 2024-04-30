require("express-async-errors");
require("dotenv").config();

// extra security packages
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require('express-rate-limit');

const cors = require("cors");
const express = require("express");

const jobRouter = require("./routes/jobs");

const authRouter = require("./routes/auth");

const authenticateUser = require("./middleware/auth");

const app = express();
// const cors = require('cors');


const path = require("path");

const notFound = require("./middleware/NotFound");

const errorHandlerMiddleWare = require("./middleware/ErrorHandler");

const connectDB = require('./db/connect');


const port = process.env.PORT || 3000;

const connectionString = process.env.MONGO_URL;

// utilities



app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine" , "ejs");
app.set('views', path.join(__dirname, 'views'));


// for parse body

app.set("trust proxy" , 1);

app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );
app.use(express.json())
app.use(helmet());
app.use(xss());


app.use(cors());


app.get("/" , (req,res) => {
    res.send("hello world");
})

app.use("/api/v1/auth" , authRouter);



app.use("/api/v1/jobs", authenticateUser,jobRouter);

app.all("*" , notFound);

app.use(errorHandlerMiddleWare);

const start = async (connectionString) => {
    try {
        await connectDB(connectionString);
        app.listen(port , () => console.log(`server is listening on port ${port}`));
    }catch(err){
        console.log(err);
    }
};


start(connectionString);


// todo the front end 