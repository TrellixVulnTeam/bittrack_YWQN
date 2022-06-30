import ccxt
from decouple import config


API_KEY = config('API_KEY_binance_read', default='')
SECRET_KEY = config('SECRET_KEY_binance_read', default='')

binance = ccxt.binance({
    'id': 'binance',
    'apiKey': API_KEY,
    'secret': SECRET_KEY
})

print(binance.apiKey)


# get-pip
# curl -sSL https://bootstrap.pypa.io/get-pip.py -o get-pip.py
# get-pip.py
