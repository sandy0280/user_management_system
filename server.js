var express = require('express');
const dotenv = require('dotenv')
const morgen = require('morgan');
const bodyParser = require('body-parser')
const path =require('path')
const connectDB = require('./server/database/connection')

var app = express()

dotenv.config({path: "config.env"});
var port = process.env.PORT || 4000;

//log request
app.use(morgen('tiny'));


// Mongoose Connection
connectDB()

//parse request to bodyParser
app.use(bodyParser.urlencoded({extended : true}))

//set view engine
app.set('view engine','ejs');
// app.set('views',path.resolve(__dirname,"./views/ejs")
// )

//Load my assets
app.use('/css',express.static(path.resolve(__dirname,"./asset/css")))
app.use('/img',express.static(path.resolve(__dirname,"./asset/img")))
app.use('/js',express.static(path.resolve(__dirname,"./asset/js")))

app.use('/',require('./server/routes/router'))

app.listen(port, () =>{
    console.log(`server is listening at http://localhost:${port}`);
})