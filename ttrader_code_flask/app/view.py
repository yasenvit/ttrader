from app.util import get_price

def placeholder():
    print("\nHello!")

def menu():
    answer = input("\nPlease select from the following options:\n\n1. Create an Account\n2. Login\n3. Quit\n\nYou selected: ")
    return answer

def inpt_username():
    inpt = input("\nCreate username or 'q' to exit: ")
    return inpt

def pass_pass():
    inpt = input("Create 6 or more digits password or 'q' to exit: ")
    return inpt

def log_username():
    inpt = input("\nEnter username: ")
    return inpt

def log_pass():
    inpt = input("Enter password: ")
    return inpt

def inpt_deposit():
    inpt = input("\nEnter amount you would like to deposit: ")
    return float(inpt)

def inpt_ticker():
    inpt = input("\nEnter ticker: ")
    return inpt

def inpt_qty():
    inpt = input("Enter quantity: ")
    return int(inpt)

def inpt_criteria():
    inpt = input("\nSelect option:\n1. Top-10 - Most active\n2. Top-10 - Gainers\n3. Top-10 - Losers\n4.\
 Top-10 - IEX volume\n5. Top-10 - IEX percent\n6. Top-10 - Infocus\n7. Look up given stock\n8. Get stock price\n9.Quit\nYou selected: ")
    return inpt

def operational_menu_inpt():
    inpt = input("\nPlease select from the following options:\n1. View Balance\
        \n2. Look up stocks\n3. Buy\n4. Sell\n5. Deposit \n6. Trade History\n7. Look up api_key\n8. Quit\nYou selected: ")
    return inpt

def inpt_breakdown():
    inpt = input("\nWould you like to see your Stock Portfolio by positions? (y/n): ")
    return inpt
            
def history_title(user, buy, sell):
    print("\nUSERNAME: {username}, ACCOUNT # {account}, CURRENT CASH BALANCE $ {balance:.2f}, ALL STOCKS CURRENT COST: $ {cost:.2f}"\
            .format(username=user.username.title(), account=user.pk, balance=user.balance, cost = buy + sell))
    print("{:<22}: $ {:>10,.2f}".format("TOTAL SHARES PURCHASED", buy))
    print("{:<22}: $ {:>10,.2f}\n".format("TOTAL SHARES SOLD", abs(sell)))
    
def transaction_print(trans):
    print("Transaction ID: {event:^3} / Ticker: {ticker:^5} / Price: $ {price:>6,.2f} / Quantity: {qty:>6} / Total: $ {total:>10,.2f}\
 / Transaction Time: {time:>15}".format(event=trans.pk, ticker=trans.ticker, price=trans.price, qty=trans.volume,\
                         total=-trans.price * trans.volume, time=trans.time))

def breakdown_stock(stock, tradessum):
    price = get_price(stock.ticker)
    positioncost = stock.shares * price
    print("Stock ID: {id:^3} / Ticker: {ticker:^6} / Shares: {qty:^4} / Current price per share: $ {price:>7,.2f}\
 / Position cost: $ {poscost:>9,.2f} / Position profit: {diff:+.2%}".format(id=stock.pk, ticker=stock.ticker, qty=stock.shares, price=price,\
                         poscost=positioncost, diff = (positioncost - tradessum) / tradessum))

def balance_display(user, _sum):
    print("\nACCOUNT INFO: USERNAME: {username}, ACCOUNT # {account}:"\
            .format(username=user.username.title(), account=user.pk))        
    print("{:<25}$ {:>10,.2f}".format("Stocks Portfolio cost:", _sum))
    print("{:<25}$ {:>10,.2f}".format("Current cash balance:", user.balance))
    print("{:<25}$ {:>10,.2f}".format("Account Cost Total:", _sum + user.balance))

def print_dict_row(indict):
    print()
    for key, value in indict.items():
        print(" {}: {} /".format(key.title(), value), end="")

def print_dict_col(indict):
    print()
    for key, value in indict.items():
        print(" {:_<17}{:_>10} ".format(key.title(), value))
    
def display_price(ticker, price):
    print("The price of {} is ${} per share".format(ticker, price))

def buy_stat(user, ticker, qty):
    print("\nTransaction completed: Ticker {} in {} shares has been added to your Portfolio. Price: ${:.2f} per share.\
 You account has been charged for ${:.2f}".format(ticker,qty, get_price(ticker), get_price(ticker) * qty))

def sell_stat(user, ticker, qty):
    print("\nTransaction completed: You just sold Ticker {} in {} shares for ${:.2f} per share. Total amount ${:.2f} will be add to you cash Balance"\
        .format(ticker, qty, get_price(ticker), get_price(ticker) * qty))

def deposit_stat(user, amount):
    print("\nTransaction completed:: Deposit in the amount of ${:.2f} has been sucesfully added. New Cash Balance is ${:.2f}"\
        .format(amount, user.balance))

def invalid_passlen():
    print("\nPassword should be 6 or more symbols. Try again")

def not_enough_shares(symbol):
    print("\nTransaction failed - You don't have enough {} shares to make this transaction".format(symbol))

def no_funds():
    print("\nTransaction failed - Insufficient Funds.")

def ticker_del(symbol):
    print("\nYou just sold all {} stocks, this position will be removed from your portfolio".format(symbol))

def negative_value():
    print("\nCannot make negative value or value with quantity '0'")

def invalid_opt():
    print("\nYou entered invalid option. Please try again")

def invalid_stock(name):
    print("\nSorry, ticker {} doesn't exist".format(name))

def invalid_cred():
    print("\nYou entered invalid credentials")

def another_username():
    print("\nThis username is already existed. Please create another username\n")

def no_report():
    print("Sorry, currently there is no report for this criterion")

def not_have(tickername):
    print("\nSorry, you don't have Ticker {} in your Portfolio.".format(tickername))

def program_end():
    print("\nThank You for hanging with us! Come back soon!\n")

def trans_failed():
    print("\nTransaction failed. Please try again")

def lookup_apikey(key):
        print("\nYour api_key is: {}".format(key))
