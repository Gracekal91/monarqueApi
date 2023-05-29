require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const path = require('path');
const {logger} = require('./middleware/logger');
const {errorHandler} = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const{logEvents} = require('./middleware/logger');
const bodyParser = require('body-parser');
console.log(process.env.NODE_ENV);

//Connect to the db
connectDB();

app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Middleware - routers
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/root'));
app.use('/services', require('./routes/serviceRoutes'));

// register Middleware
app.use(express.json());
app.use(cookieParser);
app.use(cors(corsOptions));



// Catch non existing routes

app.all('*', (req, res) =>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if(req.accepts('json')){
        res.json({message: '404 Not Found'})
    }else{
        res.type('txt').send('404 Not Found')
    }
});

app.use(errorHandler);

mongoose.connection.once('open', ()=>{
console.log('Connected to Mongodb')
    app.listen(PORT, ()=>{
        console.log(`app is running on port ${PORT}`)
    })
});

mongoose.connection.on('error', err=>{
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.hostname}`, 'mongoError.log');
});


