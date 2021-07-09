from bs4 import BeautifulSoup
import requests
import time
from datetime import datetime

url = 'https://www.google.com/search?q=bitcoin+price+usd'
HTML = requests.get(url)
soup = BeautifulSoup(HTML.text, 'html.parser')
# print(soup.prettify())

# <div class="BNeawe iBp4i AP7Wnd">
# Define a function to get price of a crypto
def get_price(coin):
    url = 'https://www.google.com/search?q=' + coin + '+price+usd'
    HTML = requests.get(url)
    soup = BeautifulSoup(HTML.text, 'html.parser')
    text = soup.find('div', attrs={'class': 'BNeawe iBp4i AP7Wnd'}).find('div', attrs={'class':'BNeawe iBp4i AP7Wnd'}).text
    return text

# Function to consistently show the price of the crypto
def main():
    last_price = -1
    while (1):
        crypto = 'Bitcoin'
        price = get_price(crypto)
        if price != last_price:
            now = datetime.now()
            current_time = now.strftime("%H:%M:%S")
            print(current_time + '\n' + crypto + ': ' + price)
            last_price = price
        time.sleep(1)

main()