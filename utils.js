


async function getBalance(account) {
    const balance = await account.fetchBalance();
    return balance;
}

async function getApiStatus(account) {
    const status = await account.fetchStatus();
    return status;
}

module.exports = { getApiStatus, getBalance };