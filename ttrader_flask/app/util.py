import requests
import hashlib
"""Key, List, OHLC"""

ENDPOINT = "https://api.iextrading.com/1.0"
CALL = "/stock/{symbol}/price"

salt = "its a secret to everyone"

def hash_pass(password):
    # salted 128 character hash of a string
    hasher = hashlib.sha512()
    value = password.encode() + salt.encode()
    hasher.update(value)
    return hasher.hexdigest()

def get_price(symbol):
    response = requests.get(ENDPOINT + CALL.format(symbol=symbol))
    if response.status_code == 200:
        return response.json()
    else:
        return None

def get_ten_stocks(criteria):
    criterialist = ["/stock/market/list/mostactive","/stock/market/list/gainers","/stock/market/list/losers","/stock/market/list/iexvolume","/stock/market/list/iexpercent","/stock/market/list/infocus"]
    response = requests.get("{}{}".format(ENDPOINT,criterialist[int(criteria)-1]))
    if response.status_code == 200:
        print(response)
        return response.json()
    else:
        raise requests.ConnectionError('http status: ' + format(response.status_code))

def stock_info(symbol):
    response = requests.get(ENDPOINT + "/stock/{}/previous".format(symbol))
    if response.status_code == 200:
        return response.json()
    else:
        return None

def stock_news(symbol):
    response = requests.get(ENDPOINT + "/stock/{}/news/last/5".format(symbol))
    if response.status_code == 200:
        return response.json()
    else:
        return None

def company_info(symbol):
    response = requests.get(ENDPOINT + "/stock/{}/company".format(symbol))
    if response.status_code == 200:
        return response.json()
    else:
        return None