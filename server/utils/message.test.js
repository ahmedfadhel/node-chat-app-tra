let expect = require('expect');
let {generateMessage,generateLocationMessage} = require('./message.js');

describe('generateMessage Function Test',()=>{
    it('Should return the right object when pass from and text',()=>{
        let from = 'Admin';
        let text = 'Hello From Admin';
        let msg = generateMessage(from,text);
        expect(msg.from).toBe(from);
        expect(msg.text).toBe(text);
    })
});

describe('generateLocationMessage',()=>{
    it('Should generate correct Location',()=>{
       let from = 'Admin';
       let lat = 10;
       let long = 12;
       let url = `https://www.google.com/maps?q=${lat},${long}`;
       let message = generateLocationMessage(from,lat,long);
       
       expect(message.createdAt).toBeA('number');
       expect(message).toInclude({from,url});

    })
})