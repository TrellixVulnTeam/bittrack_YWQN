
function handleInputLength(prices, length) {
    if (prices.length < length) {
        throw `closedPrice array does not have enough items, closedPrice.length=${prices.length} < ${length}`;    
    }
    else if (prices.length >length) {
        console.log("closedPrice is longer than needed. Slice is implemented but this may bring undesirable result.");
        prices = prices.slice(0,length);
    } 
    return prices;
}

async function getBalance(account) {
    const balance = await account.fetchBalance();
    return balance;
}

async function getApiStatus(account) {
    const status = await account.fetchStatus();
    return status;
}

/**
 * @param
 *      closedPrices: an array of closed prices, desirably of length 'length'. If its length longer than 'length', the array will be trimmed off.
 *      length: the length of RSI calculated  
 */
function calculateRsi(closedPrices, length=14) {
    var prices = handleInputLength(closedPrices, length);

    // Calculating RSI
    // var tolerance = 10e-10;
    var sumGain = 0;
    var sumLoss = 0;

    for (let i = 1; i < length; i++) {
        let difference = prices[i] - prices[i - 1];
        if (difference >= 0)
            sumGain += difference;
        else
            sumLoss -= difference;
    }

    if (sumGain === 0) return 0;
    // if (sumLoss.reduce((a, b) => a + b, 0) < tolerance) return 100;
    if (sumLoss === 0) return 100;
    return 100.0 - (100.0 / (1 + (sumGain / sumLoss)));
}

function calculateSupertrend(prices, 
                            length=10, multiplier=3, 
                            previousSupertrend) {
                                
     


    // var prices = handleInputLength(prices, length);
    // const currentPrice = prices[length-1]
    // const previousClose = prices[length-2].close;
    // var sum = 0;
    // for (const price of prices) {
    //     sum += Math.max(price.high-price.low, 
    //                     price.high-price.close, 
    //                     price.low-price.close);
    // }
    
    // const ATR = sum / length
    // const basicUpperband = (currentPrice.high+currentPrice.low)/2 + multiplier * ATR
    // const basicLowerband = (currentPrice.high+currentPrice.low)/2 - multiplier * ATR
    // var finalUpperband = basicUpperband;
    // var finalLowerband = basicLowerband;
    // var supertrend = 0;


    // if (currentPrice.close > finalUpperband) 
    //     supertrend = finalLowerband;
    // else if (currentPrice.close < finalUpperband) 
    //     supertrend = finalUpperband;
    // else  // previous trend continues
    //     supertrend = previousSupertrend.supertrend;
    //     // Adjust bands
    //     finalLowerband = previousSupertrend.finalLowerband;
    //     finalUpperband = previousSupertrend.finalUpperband;

    // return {supertrend: supertrend, 
    //         finalUpperband: finalUpperband, 
    //         finalLowerband: finalLowerband};

    //////////  v1
    // if ((basicUpperband < previousFinalUpperband) || previousClose > previousFinalUpperband)
    //     finalUpperband = basicUpperband;
    // else 
    //     finalUpperband = previousFinalUpperband;

    // if ((basicLowerband < previousFinalLowerband) || previousClose > previousFinalLowerband)
    //     finalLowerband = basicLowerband;
    // else 
    //     finalLowerband = previousFinalLowerband;
    // const supertrend = currentPrice.close <= finalUpperband? finalUpperband : finalLowerband; 

}




module.exports = { getApiStatus, getBalance, calculateRsi, calculateSupertrend};