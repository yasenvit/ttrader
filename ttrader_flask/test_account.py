import unittest
from schema import create_db
from seed import seed
import os
from app import Account, Position, trade
from app.orm import ORM

ORM.database = '_test.db'

class TestAccount(unittest.TestCase)
    def setUp(self):
        create_db('_test.db')
        seed('_test.db')

    def tearDown(self)
        os.remove('_test.db')

    def testApiAuthenticate(self):
        carter = Account.api_authenticate('123456789098765')
        self.assertIsInstance(carter, Account, 'api key loads account')