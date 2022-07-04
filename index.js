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
    var old_prices = require('./pricex_2006_3006.json');

}

async function supertrendBot() {
    var prices = require('./pricex_2006_3006.json').slice(0,50);
    var length = 10;
    var multiplier = 3;

    // Calculate 'trueRange' of the first 'length' items
    for (let i = 0; i <= length; i++) {
        prices[i]['trueRange'] = Math.max(prices[i].high-prices[i].low, 
                                            prices[i].high-prices[i].close, 
                                            prices[i].low-prices[i].close);
    }

    // Calculate 'trueRange' and 'atr' of the remaining items
    for (let current = length; current < prices.length; current++) {
        // id
        prices[current]['id'] = current;

        // trueRange
        prices[current]['trueRange'] = Math.max(prices[current].high-prices[current].low, 
                                            prices[current].high-prices[current].close, 
                                            prices[current].low-prices[current].close);

        // atr
        var sum = 0;
        for (let j = current-9; j <= current; j++) 
            sum += prices[j]['trueRange'];
        prices[current]['atr'] = sum / length;

        // hl2
        prices[current]['hl2'] = (prices[current].high + prices[current].low) / 2;

        // final upper/lower band
        prices[current]['final_upperband'] = prices[current]['hl2'] + (multiplier * prices[current]['atr']);
        prices[current]['final_lowerband'] = prices[current]['hl2'] - (multiplier * prices[current]['atr']);

        // isUpTrend
        console.log('set isUpTrend true', current);
        prices[current]['isUpTrend'] = true;
    }

    // 
    for (let current = length+1; current < prices.length; current++) {
        prev = current-1;
        // if current close price crosses above upperband
        if (prices[current]['close'] > prices[prev]['final_upperband'])
            prices[current]['isUpTrend'] = true;

        // if current close price crosses below lowerband
        else if (prices[current]['close'] < prices[prev]['final_lowerband'])
            prices[current]['isUpTrend'] = false;

        else {// previous trend continues 
            console.log('tag', current, prices[current]['final_upperband'], prices[prev]['final_upperband']);
            prices[current]['isUpTrend'] =  prices[prev]['isUpTrend'];
            if (prices[current]['isUpTrend'] === true && prices[current]['final_lowerband'] < prices[prev]['final_lowerband'])
                prices[current]['final_lowerband'] =  prices[prev]['final_lowerband'];
            if (prices[current]['isUpTrend'] === false && prices[current]['final_upperband'] > prices[prev]['final_upperband']){
                console.log('tag_c', prices[current]['final_upperband'], prices[prev]['final_upperband']);
                prices[current]['final_upperband'] = prices[prev]['final_upperband'];
            }
        }
    }


    console.log(prices.slice(11,30));


    // const start = 150;
    // const temp = {supertrend: 0, 
    //         finalUpperband: 0, 
    //         finalLowerband: 0};
    // var s = utils.calculateSupertrend(old_prices.slice(start,start+10), 10, 3, temp);
    // // console.log(s);


    // for (let i=start+11; i < start+30; i++) {
        
    //     s = utils.calculateSupertrend(old_prices.slice(i-10,i), 10, 3, s);
    //     console.log(i, Number((old_prices[i].close).toFixed(2)), '\t', Number((s.supertrend).toFixed(2)));
    //     // console.log(s);
    // }

    // const s1 = utils.calculateSupertrend(old_prices.slice(0,10), 10, 3);
    // console.log(s1.supertrend);

    // const s2 = utils.calculateSupertrend(old_prices.slice(1,11), 10, 3, s1.finalUpperband1, s1.finalLowerband1);
    // console.log(s2.supertrend);

    // check price at 10, 11 see if it's going down
}



supertrendBot();
// main()

