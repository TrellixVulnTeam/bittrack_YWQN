


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
 *      closedPrices: an array of prices desirably of length 'length'  
 *      length: the length of RSI calculated  
 */
function calculateRsi(closedPrices, length=14) {
    var prices = closedPrices;
    
    if (closedPrices.length < length) {
        console.log(`closedPrice array does not have enough items, closedPrice.length=${closedPrices.length} < ${length}`);
        return;
    }
    else if (closedPrices.length >length) {
        console.log("closedPrice is longer than needed. Slice is implemented but this may bring undesirable result.");
        prices = closedPrices.slice(0,length);
    } 

    // var tolerance = 10e-10;
    var sumGain = 0;
    var sumLoss = 0;

    for (let i = 1; i < prices.length; i++) {
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

module.exports = { getApiStatus, getBalance, calculateRsi};