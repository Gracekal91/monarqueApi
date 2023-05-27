const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callBack) =>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callBack(null, true)
        }else{
            callBack(new Error('not Allowed by CORS'))
        }
    },
    //handles the head ers for you
    credentials: true,
    //204 for other devices
    optionsSuccessStatus: 200
}

module.exports = corsOptions;