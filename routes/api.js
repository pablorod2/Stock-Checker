"use strict";
//Pregiven code for the project
const StockModel = require("../models").Stock;
const fetch = require("node-fetch");

//We create a new stock function with the stock symbol and the ip address of the user
//Optional Chaining Operator (?.): Introduced in ES2020, this operator provides a safe
//way to access properties of an object that might be null or undefined without causing an error.
//If the property before the ?. is null or undefined, the expression short-circuits
//and returns undefined instead of throwing a TypeError. This is importat!
async function createStock(stock, like, ip) {
  const newStock = new StockModel({
    symbol: stock,
    likes: like ? [ip] : [],
  });
  const savedNew = await newStock.save();
  return savedNew;
}

//We find a stock function with the stock symbol
async function findStock(stock) {
  return await StockModel.findOne({ symbol: stock }).exec();
}

//We save the stock function with the stock symbol, the like and the ip address of the user
async function saveStock(stock, like, ip) {
  let saved = {};
  const foundStock = await findStock(stock);
  if (!foundStock) {
    const createsaved = await createStock(stock, like, ip);
    saved = createsaved;
    return saved;
  } else {
    if (like && foundStock.likes.indexOf(ip) === -1) {
      foundStock.likes.push(ip);
    }
    saved = await foundStock.save();
    return saved;
  }
}

//We get the stock function with the stock symbol
async function getStock(stock) {
  const response = await fetch(
    `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`
  );
  const { symbol, latestPrice } = await response.json();
  return { symbol, latestPrice };
}

//We export the function to the api.js file
module.exports = function (app) {
  app.route("/api/stock-prices").get(async function (req, res) {
    const { stock, like } = req.query;
    //if stock is an array, we get the stock data for both stocks
    if (Array.isArray(stock)) {
      console.log("stocks", stock);
      const { symbol, latestPrice } = await getStock(stock[0]);
      const { symbol: symbol2, latestPrice: latestPrice2 } = await getStock(
        stock[1]
      );
      const firststock = await saveStock(stock[0], like, req.ip);
      const secondstock = await saveStock(stock[1], like, req.ip);
      let stockData = [];
      if (!symbol) {
        stockData.push({
          rel_likes: firststock.likes.length - secondstock.likes.length,
        });
      } else {
        stockData.push({
          stock: symbol,
          price: latestPrice,
          rel_likes: firststock.likes.length - secondstock.likes.length,
        });
      }
      if (!symbol2) {
        stockData.push({
          rel_likes: secondstock.likes.length - firststock.likes.length,
        });
      } else {
        stockData.push({
          stock: symbol2,
          price: latestPrice2,
          rel_likes: secondstock.likes.length - firststock.likes.length,
        });
      }
      // res.json the stockData
      res.json({
        stockData,
      });
      return;
    }
    //if stock is not an array, we get the stock data for one stock
    const { symbol, latestPrice } = await getStock(stock);
    if (!symbol) {
      // res.json the stockData
      res.json({ stockData: { likes: like ? 1 : 0 } });
      return;
    }
    //We save the stock data in the database
    const oneStockData = await saveStock(symbol, like, req.ip);
    console.log("One Stock Data", oneStockData);
    // res.json the stockData
    res.json({
      stockData: {
        stock: symbol,
        price: latestPrice,
        likes: oneStockData.likes.length,
      },
    });
  });
};
