import ccxt
from decouple import config

API_KEY = config('API_KEY_binance_read', default='')
SECRET_KEY = config('SECRET_KEY_binance_read', default='')
print(API_KEY, SECRET_KEY)


binance = ccxt.binance({
    'id': 'binance',
    'apiKey': API_KEY,
    'secret': SECRET_KEY
})
