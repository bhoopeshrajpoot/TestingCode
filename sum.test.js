const { sumval } = require("./sum");

describe("this is testing case start",()=>{
    test("calculate sum",()=>{
        let sums = sumval(10,20);
        expect(sums).toBe(30);
    })
})