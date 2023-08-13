const model = require("../models/model")
const mymodel = new model() 

describe("test the save function", async()=>{
 await  it("test the save function", async()=>{
        const spy = sinon.spy(mymodel,"save")
        const arg1 = "test", arg2 = "test";
        mymodel.save(arg1,arg2);
        await sinon.assert.calledOnce(spy)
        await expect(spy.calledOnce).to.be.true;
    })

    it("test the fetch function in the model", async()=>{
        const spy = sinon.spy(mymodel,"fetch")
        const arg1 = "test", arg2 = "test";
        mymodel.fetch(arg1,arg2);
        await sinon.assert.calledOnce(spy)
        await expect(spy.calledOnce).to.be.true;
    })
})