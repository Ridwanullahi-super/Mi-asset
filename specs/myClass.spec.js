 var Myclass = require("../src/myClass")
 const chai = require("chai")
const chaiasPromise = require("chai-as-promised")
 const sinon = require("sinon")
 const expect = chai.expect;
 var myObj = new Myclass()


 describe("Test suite", async()=>{
    await it("test method for add", async()=>{
      await  expect(myObj.add(1,3)).to.be.equal(4)
    })

    await it("test method for add", async()=>{
      const spy = sinon.spy(myObj,"add")
      const arg1 = 23, arg2 = 25;
      myObj.CallAnothFn(arg1,arg2);
     await sinon.assert.calledOnce(spy)
     await expect(spy.calledOnce).to.be.true;
    })
 })
 describe("test the promise", function (){
    it("promise test case", function (done){
        this.timeout(0)
        myObj.testPromise().then(function(result){
            expect(result).to.be.equal(5)
            expect(false).to.be.true;
            done();
        })
    return expect(myObj).testPromise().to.eventually.equal(6 )
    })
 })


 module.export = {myObj}