# ₿itTracker

Bitcoin Price Tracker - A program where I play with my own trading algorithms.

This program is for educational purpose only, not for finance or anything else. I am not responsible for your financial consequences :)

![Output](public/images/Screenshot-31-aug.png)

<br>

---

## To-dos:
- Write buy/sell logic 
    - Set order when RSI escaped overbought/oversold (threshold) zone. RSI can be calculated from available libraries.
    - Set TP/SL: half if move x amount (if touch TP, set SL to entry), half if touch the opposite threshold.
- Back-test, forward-test with different lengths
- Plot chart for further insights

- To execute real order, use official API from Exchange
- Alarm for signals
- While loop to update price constantly (or just daily)
- Price API: https://messari.io/
- Finding a backtest method

## Buy/Sell indicators to check out
- RSI excapes <25 / >75 region
- Supertrend indicator / algorithm https://www.elearnmarkets.com/blog/supertrend-indicator-strategy-trading/
- Buy the dip algorithm in text file (Bin) 