
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
 *      closedPrices: an array of prices, desirably of length 'length'. If its length longer than 'length', the array will be trimmed off.
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

function calculateSupertrend(closedPrices, length=10, multiplier=3) {
    // https://tradingtuitions.com/supertrend-indicator-excel-sheet-with-realtime-buy-sell-signals/
    var prices = handleInputLength(closedPrices, length);
    
    for (let i = 1; i < length; i++) {
        
    }


}




module.exports = { getApiStatus, getBalance, calculateRsi};