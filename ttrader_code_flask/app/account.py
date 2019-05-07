import time
from app.orm import ORM
from app.util import hash_pass, get_price
from app.position import Position
from app.trade import Trade
import random
import string

SALT = "nobody will ever guess this"

class Account(ORM):
    fields = ["username", "password_hash", "balance", "api_key"]
    table = "accounts"

    def __init__(self):
        self.pk = None
        self.username = None
        self.password_hash = None
        self.balance = None
        self.api_key = None

    def set_password(self, password):
        self.password_hash = hash_pass(password)

    @classmethod
    def login(cls, username, password):
        account = cls.select_one("WHERE password_hash = ? AND username = ?", (hash_pass(password), username))  #?
        if not account:
            return None
        else:
            return account

    
    def signUp(self,username, password):
        self.username = username
        self.password = self.set_password(password)
        self.balance = 0
        self.random_generator()
        self.save()


    def deposit(self, amount):
        self.balance += amount
        self.save()

    def get_positions(self):
        """ return a list of each Position object for this user """
        where = "WHERE account_pk = ?"
        values = (self.pk, )
        return Position.select_many(where, values)

    def get_position_for(self, ticker):
        where = "WHERE account_pk = ? AND ticker = ?"
        values = (self.pk, ticker.upper())
        result = Position.select_one(where, values)

        if result:
            return result

        position = Position()
        position.account_pk = self.pk
        position.ticker = ticker.upper()
        position.shares = 0
        return position

    def buy(self, ticker, amount):
        price = get_price(ticker.upper())
        if self.balance < price * amount:
            raise ValueError
        self.balance -= price * amount

        trade = Trade()
        trade.account_pk = self.pk
        trade.ticker = ticker.upper()
        trade.price = price
        trade.volume = amount
        trade.cost = round(price * - amount)
        trade.time = time.time()

        position = self.get_position_for(ticker.upper())
        position.shares += amount

        position.save()
        self.save()
        trade.save()
            
    def check_position(self, ticker):
        where = "WHERE account_pk = ? AND ticker = ?"
        values = (self.pk, ticker.upper())
        result = Position.select_one(where, values)
        if result:
            return result
        return None

    def sell(self, ticker, amount):
        row = self.get_position_for(ticker.upper())
        result = row.shares
        if result < amount:
            raise ValueError
        price = get_price(ticker.upper())
        self.balance += price * amount

        trade = Trade()
        trade.account_pk = self.pk
        trade.ticker = ticker.upper()
        trade.price = price
        trade.volume = -amount
        trade.cost = price * amount
        trade.time = time.time()

        trade.save()
        self.save()
        
        position = self.get_position_for(ticker.upper())   #deleting position if it's volume = 0
        if position.shares == amount:
            position.delete()
        else:
            position.shares -= amount
            position.save()

    def get_trades(self):
        """ return a list of all Trades for this user """
        where = "WHERE account_pk = ?"
        values = (self.pk, )
        return Trade.select_many(where, values)

    def get_trades_for(self, ticker):
        """ return a list of all Trades for a given symbol for this user """
        where = "WHERE account_pk = ? AND ticker = ?"
        values = (self.pk, ticker.upper())
        return Trade.select_many(where, values)
    
    @classmethod
    def get_name(cls, newname):
        where = "WHERE username=?"
        values = (newname,)
        return cls.select_many(where, values)

    def get_trade_sum(self,ticker):
        tradelist = self.get_trades_for(ticker.upper())
        _sum = 0
        for trade in tradelist:
            _sum = _sum + trade.volume * trade.price
        return _sum
    
    def get_api_key(self):
        where = "WHERE pk=?"
        values = (self.pk,)
        return self.select_one(where, values)

    def random_generator(self,size=15, chars=string.ascii_uppercase + string.digits):
        key = ''.join(random.choice(chars) for x in range(size))
        self.api_key = key
            
    @classmethod    
    def api_authenticate(cls, api_key):
        account = cls.select_one("WHERE api_key = ?",(api_key,))
        if not account:
            return None
        else:
            return account
        
    def get_positionsCurrCost(self):
        positionsList = self.get_positions()
        _sum = 0
        for position in positionsList:
            positionPrice = get_price(position.ticker.upper())
            _sum = _sum + round(position.shares * positionPrice,2)
        return _sum

    def summary(self):
        positionslist = self.get_positions()
        dictList = []
        for position in positionslist:
            currentCost = get_price(position.ticker) * position.shares
            investCost = 0
            shares = 0
            for trade in self.get_trades_for(position.ticker):
                investCost += trade.cost
                shares += trade.volume
            margin = currentCost - abs(investCost)
            marginPercentage = margin/abs(investCost)*100
            dictList.append({
                'ticker': position.ticker,
                'shares': shares,
                'investCost': abs(investCost),
                'currentCost': round(currentCost,4),
                'margin': margin,
                'marginPercentage': round(marginPercentage,4)
            })
        return dictList