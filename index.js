const ccxt = require("ccxt");
const moment = require("moment");
require("dotenv").config();
const utils = require("./utils");
// import * as utils from './utils.js';
//  {getApiStatus, getBalance} from './utils.js';


const binance = new ccxt.binance({
        apiKey: process.env.API_KEY_binance_read,
        secret: process.env.SECRET_KEY_binance_read
    })
    
async function main() {
    const price = await binance.fetchOHLCV("BTC/USDT", "15m", undefined, 1000);
    const pricex = price.map((price) => {
        return {
            timestamp: moment(price[0]).format(),
            open: price[1],
            high: price[2],
            low: price[3],
            close: price[4],
        };
    });
    console.log(pricex);
}

async function playing() {
    const status = await utils.getApiStatus(binance);
    const balance = await utils.getBalance(binance);

    console.log('Playing function');
    console.log(status);
    console.log('USDC: ' + balance.total.USDC);
}
playing();


// main()

