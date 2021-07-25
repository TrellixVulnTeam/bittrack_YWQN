#!/usr/bin/env python
# coding: utf-8

# # BitTrack Project
# ## Send request and Get data

import requests
import csv
import json

import datetime
import time
import pandas as pd
import matplotlib.pyplot as plot
import numpy as np

month = 2629743
# hour = 3600
now = int(time.time())
start_time = now - 3*month
DATALENGTH = 200
ema_length = 50

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
print(df.sample)
# df.dtypes

df = pd.DataFrame(bitcoin_data, columns=['time', 'priceUsd'])
# Get last 200 rows and REVERSE, newest price on top (index 0)
df = df[:-DATALENGTH-1:-1]
print(df.sample)

# Convert datatype of priceUsd
df['priceUsd'] = pd.to_numeric(df['priceUsd'], errors='coerce', downcast='integer').fillna(0, downcast='infer')
df.dtypes
df.info()


# In[121]:


# Check data 
prices = df['priceUsd']
print(prices)


# In[122]:


# Calculate and check last ema value 
count = 0
def ema(prices, count, length = ema_length, smoothing = 2):
    multiplier = smoothing/(1+length)
    if count < length:
        # print(prices.iloc[count])
        price = (prices.iloc[count] * multiplier) 
        count += 1
        return price + ema(prices, count ) * (1 - multiplier)
    return prices.iloc[count]


# In[123]:


print("EMA50 H1:", ema(df['priceUsd'], count))


# In[124]:


# Process UNIX time to readable form
timeStamp =  df['time'].values.tolist()
timeStamp = [x / 1000 for x in timeStamp]


# In[125]:


# Insert readable timeStamp column to 'df'
df['timeStamp'] = pd.to_datetime(timeStamp, unit='s')


# In[126]:


# Check
df.sample


# In[127]:


## Plot the data
# df.plot(x ='timeStamp', y='priceUsd', kind = 'line')
# plot.show()


# ## Calculate the possible EMA for each timeStamp
# 'possible' means timeStamp that have at lease 50 values before it. After that, we add EMA value along with the above figure.

# In[194]:


short_df = df.head(DATALENGTH-ema_length)
short_df.reset_index()


# In[195]:


short_df['EMA'] = np.zeros((DATALENGTH-ema_length, 1))


# In[196]:


# short_df['N'] = np.arange(len(short_df))
short_df.insert(loc=0, column='N', value=np.arange(len(short_df)))


# In[197]:


# Access the last value of row EMA
short_df.loc[713,'EMA'] = 999999

# short_df.isetter
print(short_df['EMA'].iloc[-1])


# In[198]:


def ema(prices, count, length = ema_length, smoothing = 2):
    multiplier = smoothing/(1+length)
    if count < length:
        # print(prices.iloc[count])
        price = (prices.iloc[count] * multiplier) 
        count += 1
        return price + ema(prices, count ) * (1 - multiplier)
    return prices.iloc[count]

for i in range(0, DATALENGTH-ema_length):
    count = 0
    short_df.iloc[i,4] = ema(df['priceUsd'].iloc[i:], count)


# In[216]:


# https://queirozf.com/entries/pandas-dataframe-plot-examples-with-matplotlib-pyplot
ax = plot.gca()
short_df.plot(kind='line',x='timeStamp',y='priceUsd', ax=ax)
short_df.plot(kind='line',x='timeStamp',y='EMA', color='red', ax=ax)
plot.show()

