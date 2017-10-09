const expect = require('expect');
const {isRealString} = require('./validator');
describe('validator Test /',()=>{
    it('Should reject non-stirng value',()=>{
        
        let res = isRealString(98);
        expect(res).toBe(false);
    });
    it('Should reject spaceing  value',()=>{
        
        let res = isRealString('      ');
        expect(res).toBe(false);
    });
    it('Should accept stirng value',()=>{
        
        let res = isRealString('  ahmed   ');
        expect(res).toBe(true);
    })
})