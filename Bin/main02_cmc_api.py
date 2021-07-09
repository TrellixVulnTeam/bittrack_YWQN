
from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json

url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
parameters = {
  'start':'1',
  'limit':'2',
  'convert':'USD'
}
headers = {
  'Accepts': 'application/json',
  'X-CMC_PRO_API_KEY': '2e0aaf49-5175-407e-b029-272786481c35',
}

session = Session()
session.headers.update(headers)

try:
    response = session.get(url, params=parameters)
    data = json.loads(response.text)
    print(data['data'][0]['quote']['USD']['price'])
except (ConnectionError, Timeout, TooManyRedirects) as e:
    print(e)

#             ===  Further development  ===
# Use for loop to get previous 50 same-timeframe price value
# Calculate EMA50
# Alert if cross EMA50 ...

