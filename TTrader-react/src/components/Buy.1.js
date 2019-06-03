import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import '../Style.css';
import CurrencyFormat from 'react-currency-format';

class Buy extends Component {    
    state = {
        ticker: null,
        shares: null,
        positionCurrentCost: null,
        currentPrice: null,
        investCost: null,
        change: null,
        changePercentage : null,
        balance: null,
        error: "",
        error2: "",
        statusCode: null          
    }
    getPositionFor(inptticker) {
        const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/position_for/${inptticker}`
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                    ticker: json.ticker,
                    shares: json.shares,
                    positionCurrentCost: json.positionCurrentCost,
                    price: json.currentPrice,
                    investCost: json.investCost,
                    error: json.error,
                    statusCode: json.statuscode,
                    change: json.change,
                    changePercentage: json.changePercentage
                })
              })
    }
    getBuy(inptticker, inptamount) { 
        const endpoint = `/api/${window.sessionStorage.getItem('apikey')}/buy`
        const promise = apiCall(endpoint, 'post', {
            'ticker': inptticker,
            'amount': inptamount})
        promise.then(blob=>blob.json()).then(json => {
            this.setState({
                shares: json.shares,
                balance: json.balance,
                boughtShares: inptamount,
                error2: json.error,
                statusCode2: json.statuscode,
                positionCurrentCost: json.positionCurrentCost,
            })
        })
    }                
    render() {
        const tickerToBuy  = this.props.match.params.ticker
        const roundTo = require('round-to')
        let displayResult = (<div></div>)
        let positionInfo = (<div></div>)

        if (this.state.error === undefined) {
            
            positionInfo =(
                <div>
                <table>
                    <tr>
                        <th>TICKER</th>
                        <td>{this.state.ticker}</td>
                    </tr>
                    <tr>
                        <th>CURRENT PRICE</th>
                        <td><CurrencyFormat value={this.state.price}displayType={'text'}
                              thousandSeparator={true} prefix={'$'}/></td>
                    </tr>
                    <tr>
                        <th>SHARES</th>
                        <td>{this.state.shares}</td>
                    </tr>
                    <tr>
                        <th>POSITION VALUE</th>
                        <td><CurrencyFormat value={roundTo(this.state.positionCurrentCost,2)}displayType={'text'}
                              thousandSeparator={true} prefix={'$'}/></td>
                    </tr>
                    <tr>
                        <th>POSITION CHANGE</th>
                        <td><CurrencyFormat value={roundTo(this.state.change,2)}displayType={'text'}
                              thousandSeparator={true} prefix={'%'}/></td>
                    </tr>
                </table>
                <div className="top">
                SHARES TO BUY
            </div>
            <div className="request">
                <input className="input" id="shares" placeholder="shares"/>
                <button className="myButton" style={{width:"110px", margin:"5px"}} onClick={(event)=>{
                    this.getBuy(document.getElementById('ticker').value, document.getElementById('shares').value)
                }}
                >buy</button>
            </div>
            
            {displayResult}
            </div>
            )
        } else {
            if(this.state.error.length > 0) {
            positionInfo = (
                <div>Status code: {this.state.statusCode}: {this.state.error}</div>
            )}
        }


        if (tickerToBuy === undefined) {
            if (this.state.error2 === undefined ) {
                displayResult = (
                    <table>
                        <tr>
                            <th>TICKER</th>
                            <td>{this.state.ticker}</td>
                        </tr>
                        <tr>
                            <th>PURCHASED SHARES</th>
                            <td>{this.state.boughtShares}</td>
                        </tr>
                        <tr>
                            <th>CURRENT PRICE</th>
                            <td><CurrencyFormat value={this.state.price}displayType={'text'}
                                thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                        <tr>
                            <th>TRANSACTION AMOUNT</th>
                            <td><CurrencyFormat value={roundTo(this.state.price* this.state.boughtShares,2)} displayType={'text'}
                                thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                        <tr>
                            <th>TOTAL SHARES</th>
                            <td>{this.state.shares}</td>
                        </tr>
                        <tr>
                            <th>NEW POSITION VALUE</th>
                            <td><CurrencyFormat value={roundTo(this.state.positionCurrentCost,2)} displayType={'text'}
                                thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                    </table>
                )}  else {
                        if (this.state.error2.length > 0) {
                        displayResult = (
                            <div>Status code: {this.state.statusCode2}: {this.state.error2}</div>
                        )
                    }
                }            
            return (
                <div className="block">
                    <div className="infobox">
                        <div className="top">
                            BUY STOCKS
                        </div>
                        <div className="request">                        
                            <input className="input" id="ticker" placeholder="tickername"/>
                            <button className="myButton" style={{width:"110px", margin:"5px"}} onClick={(event)=>{
                                this.getPositionFor(document.getElementById('ticker').value)
                            }}
                            >get price</button>
                        </div>
                        {positionInfo}
                        {displayResult}
                        
                    </div>
                </div>                
            )                
        } else {
            if (this.state.error2 === undefined ) {
                displayResult = (
                    <table>
                        <tr>
                            <th>TICKER</th>
                            <td>{this.state.ticker}</td>
                        </tr>
                        <tr>
                            <th>PURCHASED SHARES</th>
                            <td>{this.state.boughtShares}</td>
                        </tr>
                        <tr>
                            <th>CURRENT PRICE</th>
                            <td><CurrencyFormat value={this.state.price}displayType={'text'}
                                thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                        <tr>
                            <th>TRANSACTION AMOUNT</th>
                            <td><CurrencyFormat value={roundTo(this.state.price* this.state.boughtShares,2)} displayType={'text'}
                                thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                        <tr>
                            <th>TOTAL SHARES</th>
                            <td>{this.state.shares}</td>
                        </tr>
                        <tr>
                            <th>NEW POSITION VALUE</th>
                            <td><CurrencyFormat value={roundTo(this.state.positionCurrentCost,2)} displayType={'text'}
                                thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                    </table>
                )
            } else {
                if (this.state.error2.length > 0) {
                    displayResult = (
                        <div>Status code: {this.state.statusCode}: {this.state.error}</div>
                    )
                }
            }           
            return (
                <div className="block">
                    <div className="infobox">
                        <div className="top">
                        STOCK '{tickerToBuy}' TO BUY
                        </div>
                        <div className="request">                        
                            <input className="input" id="shares" placeholder="shares"/>
                            <button className="myButton" onClick={(event)=>{
                                this.getBuy(tickerToBuy, document.getElementById('shares').value)
                                this.getPositionFor(tickerToBuy)
                            }}
                            >shares to buy</button>
                        </div>
                        
                        {displayResult}
                        
                    </div>
                </div>                
                )                
            }
        }
        
    }
    export default Buy

