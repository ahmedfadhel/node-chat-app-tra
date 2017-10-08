const moment = require('moment');
let generateMessage = (from,text) =>{
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
}
let generateLocationMessage = (from,latitude,longtuide)=>{
    return {
        from,
        url:`https://www.google.com/maps?q=${latitude},${longtuide}`,
        createdAt: moment().valueOf()
    }
}
module.exports = {generateMessage,generateLocationMessage}