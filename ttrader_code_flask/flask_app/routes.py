from flask import jsonify, request
from flask_app import app
from app import util, Account
from requests.exceptions import ConnectionError
import json

UNATHORIZED = {'error':'unathorized', 'status code':'401'}
NOT_FOUND = {'error':'not found', 'status code':'404'}
APP_ERROR = {'error':'application error', 'status code':'500'}
BAD_REQUEST = {'error':'bad request', 'status code':'400'}

@app.errorhandler(404)
def error404(e):
    return jsonify(NOT_FOUND), 404

@app.errorhandler(500)
def error500(e):
    return jsonify(APP_ERROR), 500

@app.route('/')
def root():
    return jsonify({'name':'API Trader'})

@app.route('/api/price/<ticker>')
def privce(ticker):
    try:
        price  = util.get_price(ticker)
    except ConnectionError:
        return  jsonify(NOT_FOUND), 404
    return jsonify({'ticker': ticker, 'price':price})

@app.route('/api/<api_key>/balance')
def balance(api_key):
    account = Account.api_authenticate(api_key)
    if not account:
        return jsonify(UNATHORIZED), 401
    return jsonify({'username':account.username, 'balance':round(account.balance,2)})

@app.route('/api/<api_key>/positions')
def positions(api_key):
    account = Account.api_authenticate(api_key)
    if not account:
        return jsonify(UNATHORIZED), 401
    positions =account.get_positions()
    json_list = [position.json() for position in positions]
    return jsonify({'username':account.username, 'positions':json_list})

@app.route('/api/<api_key>/deposit', methods=['PUT'])
def deposit(api_key):
    if not request.json or 'amount' not in request.json:
        return jsonify(BAD_REQUEST), 400
    account = Account.api_authenticate(api_key)
    if not account:
        return jsonify(UNATHORIZED), 401
    amount = request.json["amount"]
    if not isinstance(amount, float) or amount < 0:
        return jsonify(BAD_REQUEST), 400
    account.deposit(amount)
    account.save()
    return jsonify({'username':account.username, 'balance':round(account.balance,2)})

#####

@app.route('/api/<api_key>/position_for/<symbol>')
def position_for(api_key,symbol):
    acc = Account.api_authenticate(api_key)
    if not acc:
        return jsonify(UNATHORIZED), 401
    position = acc.get_position_for(symbol.upper())
    acc.save()
    return jsonify({'username': acc.username, 'position' : position.json() })

@app.route('/api/<api_key>/trades')
def trades(api_key):
    acc = Account.api_authenticate(api_key)
    if not acc:
        return jsonify(UNATHORIZED), 401
    trades = acc.get_trades()
    json_list = [{"ticker":trade.ticker, "shares": trade.volume, "price":trade.price, "time":trade.time} for trade in trades]
    return jsonify({"username":acc.username, 'trades': json_list})

@app.route('/api/<api_key>/trades_for/<symbol>')
def trades_for(api_key, symbol):
    acc = Account.api_authenticate(api_key)
    if not acc:
        return jsonify(UNATHORIZED), 401
    trades = acc.get_trades_for(symbol.upper())
    json_list = [{"ticker":trade.ticker, "shares": trade.volume, "price":trade.price, "time":trade.time} for trade in trades]
    return jsonify({"username":acc.username, 'trades': json_list})

@app.route('/api/<api_key>/buy', methods = ['POST'])
def buy(api_key):
    if not request.json or 'ticker' not in request.json or "amount" not in request.json:
       return jsonify(BAD_REQUEST), 400
    acc = Account.api_authenticate(api_key)
    if not acc:
        return jsonify(UNATHORIZED), 401
    ticker = request.json["ticker"]
    amount = request.json["amount"]
    if not isinstance(amount, int) or amount < 0:
        return jsonify(BAD_REQUEST), 400
    try:
        acc.buy(ticker, amount)
    except ValueError:
        return  jsonify(BAD_REQUEST), 404
    position = acc.get_position_for(ticker)
    return jsonify({"username" : acc.username, "balance" : round(acc.balance,2), "position" : position.json(),\
         "position cost": round(position.shares*util.get_price(ticker),2)})


@app.route('/api/<api_key>/sell', methods = ['POST'])
def sell(api_key):
    if not request.json or 'ticker' not in request.json or "amount" not in request.json:
        return jsonify(BAD_REQUEST), 400
    acc = Account.api_authenticate(api_key)
    if not acc:
        return jsonify(UNATHORIZED), 401
    ticker = request.json["ticker"]
    amount = request.json["amount"]
    position = acc.get_position_for(ticker)
    if not isinstance(amount, int) or amount < 0 or amount > position.shares:
        return jsonify(BAD_REQUEST), 400
    acc.sell(ticker, amount)
    position = acc.get_position_for(ticker)
    return jsonify({"username" : acc.username, "balance" : round(acc.balance,2),"position" : position.json(),\
         "position cost" : round(position.shares*util.get_price(ticker),2)})
    
@app.route('/api/get_ten/<criteria>')
def get_ten(criteria):
    criterialist = ["mostactive","gainers","losers","iexvolume","iexpercent","infocus"]
    for i in criterialist:
        if i == criteria:
            listten = util.get_ten_stocks(criterialist.index(i)+1)
            if not listten:
                return jsonify(APP_ERROR), 500
            return jsonify({i:listten})
    return jsonify(BAD_REQUEST), 400

