let generateMessage = (from,text) =>{
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}
let generateLocationMessage = (from,latitude,longtuide)=>{
    return {
        from,
        url:`https://www.google.com/maps?q=${latitude},${longtuide}`,
        createdAt: new Date().getTime()
    }
}
module.exports = {generateMessage,generateLocationMessage}