const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite("5 functional get request tests", function(){
        test("Viewing one stock: GET request to /api/stock-prices/", function (done){
            chai
                .request(server)
                .get("/api/stock-prices/")
                .set("content-type", "application/json")
                .query({stock:"BA"})
                .end(function (err,res){
                    assert.equal(res.status,200);
                    assert.equal(res.body.stockData.stock, "BA");
                    assert.exists(res.body.stockData.price, "BA has a price");
                    done();
                });
        });
        test("Viewing one stock and liking it: GET request to /api/stock-prices/", function (done){
            chai
                .request(server)
                .get("/api/stock-prices/")
                .set("content-type", "application/json")
                .query({stock:"HPQ", like:true})
                .end(function (err,res){
                    assert.equal(res.status,200);
                    assert.equal(res.body.stockData.stock, "HPQ");
                    assert.equal(res.body.stockData.likes, 1);
                    assert.exists(res.body.stockData.price, "HPQ has a price");
                    done();
                });
        });
        test("Viewing the same stock and like it again: GET request to /api/stock-prices/", function (done){
            chai
                .request(server)
                .get("/api/stock-prices/")
                .set("content-type", "application/json")
                .query({stock:"HPQ", like:true})
                .end(function (err,res){
                    assert.equal(res.status,200);
                    assert.equal(res.body.stockData.stock, "HPQ");
                    assert.equal(res.body.stockData.likes, 1);
                    assert.exists(res.body.stockData.price, "HPQ has a price");
                    done();
                });
        });
        test("Viewing two stocks: GET request to /api/stock-prices/", function (done){
            chai
                .request(server)
                .get("/api/stock-prices/")
                .set("content-type", "application/json")
                .query({stock:["INTC","AMD"]})
                .end(function (err,res){
                    assert.equal(res.status,200);
                    assert.equal(res.body.stockData[0].stock, "INTC");
                    assert.equal(res.body.stockData[1].stock, "AMD");
                    assert.exists(res.body.stockData[0].price, "INTC has a price");
                    assert.exists(res.body.stockData[1].price, "AMD has a price");
                    done();
                });
        });
        test("Viewing two stocks and like them: GET request to /api/stock-prices/", function (done){
            chai
                .request(server)
                .get("/api/stock-prices/")
                .set("content-type", "application/json")
                .query({stock:["INTC","AMD"], like: true})
                .end(function (err,res){
                    assert.equal(res.status,200);
                    assert.equal(res.body.stockData[0].stock, "INTC");
                    assert.equal(res.body.stockData[1].stock, "AMD");
                    assert.exists(res.body.stockData[0].price, "INTC has a price");
                    assert.exists(res.body.stockData[1].price, "AMD has a price");
                    assert.exists(res.body.stockData[0].rel_likes, "has rel_likes");
                    assert.exists(res.body.stockData[1].rel_likes, "has rel_likes");
                    done();
                });
        });
    })

});
