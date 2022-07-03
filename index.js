const ccxt = require("ccxt");
const moment = require("moment");
require("dotenv").config();
const utils = require("./utils");
const fs = require('fs');

// import * as utils from './utils.js';
//  {getApiStatus, getBalance} from './utils.js';


const binance = new ccxt.binance({
        apiKey: process.env.API_KEY_binance_read,
        secret: process.env.SECRET_KEY_binance_read
    })

async function main() {
    const prices = await binance.fetchOHLCV("BTC/USDT", "15m", undefined, 2000);
    const pricex = prices.map((price) => {
        return {
            timestamp: moment(price[0]).format(),
            open: price[1],
            high: price[2],
            low: price[3],
            close: price[4],
        };
    });

    let data = JSON.stringify(pricex);
    fs.writeFileSync('pricex.json', data);
    console.log(pricex);
}

async function rsiBot() {

}

async function supertrendBot() {

}



rsiBot();
// main()

