require('dotenv').config()
var express = require('express');
var app = express();

const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(require('cookie-parser')());
app.use(cookieParser('shhh'))

const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts));

const metaRouter = require('./meta-routes/metacrud');   
app.use('/metacrud', metaRouter);

app.on('error', function(e){
    console.log(e);
})
app.listen(8088)