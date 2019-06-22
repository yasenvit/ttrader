from app import util
from app.orm import ORM

class Trade(ORM):
    fields = ['account_pk', 'ticker', 'volume', 'price', 'cost', 'time'] 
    table = 'trades'

    def __init__(self):
        self.pk = None
        self.account_pk = None
        self.ticker = None
        self.volume = None
        self.price = None
        self.cost = None
        self.time = None
  