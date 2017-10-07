let expect = require('expect');
let {generateMessage} = require('./message.js');

describe('generateMessage Function Test',()=>{
    it('Should return the right object when pass from and text',()=>{
        let from = 'Admin';
        let text = 'Hello From Admin';
        let msg = generateMessage(from,text);
        expect(msg.from).toBe(from);
        expect(msg.text).toBe(text);
    })
});