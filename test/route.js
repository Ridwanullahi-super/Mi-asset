let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
// let adminRoute = require('../routes/adminRoute');
// let should = chai.should();
let expect = chai.expect;
// let assert = chai.assert;    
// assertion style 
chai.use(chaiHttp);
chai.should();

describe('Books API', () => {

    describe("GET /add-admin", () => {
        it("It should add new admin to the server", (done) => {
            chai.request(server)
            .get('/add-admin')
            .end((err, response) => {
            response.should.have.status(200);
            // response.body.should.be.a('array');
            // response.body.lenght.should.be.a(0);

            });
    }); 


})});