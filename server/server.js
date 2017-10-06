//------- Define Variables----
const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname,'../public');
const port = 3000;
let app = express();
//Server Static files like css,image,browser js
app.use(express.static(publicPath));




//Start Server Listen On Port 3000

app.listen(port,()=>{
    console.log('Server Start Listen On Port 3000');
})