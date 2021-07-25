#!/usr/bin/env python
# coding: utf-8

# # BitTrack Project
# ## Send request and Get data

# In[1]:


import requests
import csv
import json

import datetime
import time
import pandas as pd
import matplotlib.pyplot as plot
import numpy as np

# Time in UNIX format
month = 2629743
now = int(time.time())
start_time = now - 3*month
DATALENGTH = 500
ema_length = 50

url = f"http://api.coincap.io/v2/assets/bitcoin/history?interval=h1"
print(url)

# Request data from the API
response = requests.request("GET", url, headers={}, data={})
json_data = json.loads(response.text.encode('utf8'))
# print(json_data)
bitcoin_data = json_data["data"]

df = pd.DataFrame(bitcoin_data)
## Export data as a csv file
# df.to_csv('BTCUSD.csv', index=False)
print(df.sample)
# df.dtypes

# Filter only the columns we need
df = pd.DataFrame(bitcoin_data, columns=['time', 'priceUsd'])
# Get last 200 rows and REVERSE, newest price on top (index 0)
df = df[:-DATALENGTH-1:-1]
print(df.sample)

# Convert 'priceUsd' datatype to something numeric
df['priceUsd'] = pd.to_numeric(df['priceUsd'], errors='coerce', downcast='integer').fillna(0, downcast='infer')
df.dtypes
df.info()


# In[2]:


# Check data 
prices = df['priceUsd']
print(prices)


# In[3]:


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


# In[4]:


print("EMA50 H1:", ema(df['priceUsd'], count))


# In[5]:


# Process UNIX time to readable form
timeStamp =  df['time'].values.tolist()
timeStamp = [x / 1000 for x in timeStamp]


# In[6]:


# Insert readable timeStamp column to 'df'
df['timeStamp'] = pd.to_datetime(timeStamp, unit='s')


# In[7]:


# Check
df.sample


# In[8]:


# Plot the data
df.plot(x ='timeStamp', y='priceUsd', kind = 'line')
plot.show()


# ## Calculate the possible EMA for each timeStamp
# 'possible' means timeStamp that have at lease 50 values before it. After that, we add EMA value along with the above figure.

# In[9]:


short_df = df.head(DATALENGTH-ema_length)
short_df.reset_index()


# In[10]:


short_df['EMA'] = np.zeros(( DATALENGTH-ema_length, 1))


# In[11]:


# short_df['N'] = np.arange(len(short_df))
short_df.insert(loc=0, column='N', value=np.arange(len(short_df)))


# In[12]:


# Try modifying a value in EMA column
short_df.loc[713,'EMA'] = 999999
# Try accessing short_df
print(short_df['EMA'].iloc[-1])


# In[13]:


# Finalize 'ema' function to run in for loop
def ema(prices, count, length = ema_length, smoothing = 2):
    multiplier = smoothing/(1+length)
    if count < length:
        # print(prices.iloc[count])
        price = (prices.iloc[count] * multiplier) 
        count += 1
        return price + ema(prices, count ) * (1 - multiplier)
    return prices.iloc[count]

# Calculate ema values and replace them into the dataframe
for i in range(0, DATALENGTH-ema_length):
    count = 0
    # short_df.iloc[ ?,4 ] => 'EMA' column
    short_df.iloc[ i,4 ] = ema( df['priceUsd'].iloc[ i: ], count )


# In[14]:


# Reference article https://queirozf.com/entries/pandas-dataframe-plot-examples-with-matplotlib-pyplot
ax = plot.gca()
short_df.plot(kind='line',x='timeStamp',y='priceUsd', ax=ax)
short_df.plot(kind='line',x='timeStamp',y='EMA', color='red', ax=ax)
plot.show()


# ## Create a while loop to update price constantly

# In[ ]:





# In[ ]:





# ## Alarm when PRICE cross EMA

# ## Analyze profit/loss if trade base on EMA 
# using data in the past 1 year  
# with R:R=1:1, TP = SL = 5%  
# TP 80% when reach target, move SL to entry
# 
# 

# In[ ]:




