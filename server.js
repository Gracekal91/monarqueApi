const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const path = require('path');
const {logger} = require('./middleware/logger');
const {errorHandler} = require('./middleware/errorHandler');

// register Middleware
app.use(logger);
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/root'));



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

app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`)
});
