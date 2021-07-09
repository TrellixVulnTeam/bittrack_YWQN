import requests
import csv
import json

import time
import pandas as pd
import matplotlib.pyplot as plt

month = 2629743
hour = 3600
now = int(time.time())

now = now - hour*10
start_time = now - 3*month

# url = "http://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=1610000000000&end=1613753794000"
# url = f"http://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start={start_time}000&end={now}000"
url = f"http://api.coincap.io/v2/assets/bitcoin/history?interval=h1"
print(url)

payload = {}
headers= {}
response = requests.request("GET", url, headers=headers, data=payload)
json_data = json.loads(response.text.encode('utf8'))
# print(json_data)
bitcoin_data = json_data["data"]

df = pd.DataFrame(bitcoin_data)
df.to_csv('bitcoin-usd.csv', index=False)
# print(df.sample)
# df.dtypes

df = pd.DataFrame(bitcoin_data, columns=['time', 'priceUsd'])
# print(df.sample)

# Convert datatype of priceUsd
df['priceUsd'] = pd.to_numeric(df['priceUsd'], errors='coerce').fillna(0, downcast='infer')
df.dtypes
df.info()

## Plot the data
# df.plot(x ='time', y='priceUsd', kind = 'line')
# plt.show()


prices = df['priceUsd'][:-60:-1]
count = 0

def ema(prices, count, length = 50, smoothing = 2):
    multiplier = smoothing/(1+length)
    if count < length:
        print(prices.iloc[count])
        price = (prices.iloc[count] * multiplier) 
        count += 1
        return price + ema(prices, count ) * (1 - multiplier)
    return prices.iloc[count] 


print("EMA50:", ema(prices, count))

