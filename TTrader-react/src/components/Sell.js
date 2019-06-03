import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import '../Style.css';
import CurrencyFormat from 'react-currency-format';

class Sell extends Component {
    state = {
        ticker: null,
        shares: null,
        soldShares: null,
        positionValue: null,
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
                    positionValue: json.positionValue,
                    price: json.currentPrice,
                    investCost: json.investCost,
                    change: json.change,
                    changePercentage: json.changePercentage,
                    error: json.error,
                    statusCode: json.statuscode,
                    error2:""
                })
              })
    }
    getSell(inptticker, inptamount) { 
        const endpoint = `/api/${window.sessionStorage.getItem('apikey')}/sell`
        const promise = apiCall(endpoint, 'post', {
            'ticker': inptticker,
            'amount': inptamount})
        promise.then(blob=>blob.json()).then(json => {
            this.setState({
                shares: null,
                totalshares: json.shares,
                balance: json.balance,
                soldShares: inptamount,
                error2: json.error,
                statusCode2: json.statuscode,
                positionValue: json.positionValue,
            })
        })
    }                
    render() {
        const tickerToSell  = this.props.match.params.ticker
        const roundTo = require('round-to')
        let displayResult = (<div></div>)
        let positionInfoBefore = (<div></div>)
        let positionInfoAfter = (<div></div>)
        let startmessage = (<div></div>)

        if (tickerToSell === undefined) {
            startmessage = (
                <div>
                    <div className="top">
                        SELL STOCKS
                    </div>
                    <div className="request">                        
                        <input className="input" id="ticker" placeholder="tickername"/>
                        <button className="myButton" style={{width:"110px", margin:"5px"}} onClick={(event)=>{
                        this.getPositionFor(document.getElementById('ticker').value)
                    }}
                    >get price</button>
                    </div>
                </div>      
            )
        }
        if (this.state.error === undefined) {
            if(this.state.shares !== null) {
            positionInfoBefore = (
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
                            <td><CurrencyFormat value={roundTo(this.state.positionValue,2)}displayType={'text'}
                                thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                        <tr>
                            <th>POSITION CHANGE</th>
                            <td><CurrencyFormat value={roundTo(this.state.change,2)}displayType={'text'}
                                thousandSeparator={true} prefix={'%'}/></td>
                        </tr>
                    </table>
                </div>
            )} 
        } else {
            if(this.state.error.length > 0) {
                positionInfoBefore = (
                <div>
                    <div>Status code: {this.state.statusCode}: {this.state.error}</div>
                </div>
                )}
        }
        if(this.state.error2 === undefined) {
            positionInfoAfter = (
            <table>
                <tr>
                    <th>TICKER</th>
                    <td>{this.state.ticker}</td>
                </tr>
                <tr>
                    <th>SOLD SHARES</th>
                    <td>{this.state.soldShares}</td>
                </tr>
                <tr>
                    <th>PRICE</th>
                    <td><CurrencyFormat value={this.state.price}displayType={'text'}
                        thousandSeparator={true} prefix={'$'}/></td>
                </tr>
                <tr>
                    <th>TRANSACTION AMOUNT</th>
                    <td><CurrencyFormat value={roundTo(this.state.price* this.state.soldShares,2)} displayType={'text'}
                        thousandSeparator={true} prefix={'$'}/></td>
                </tr>
                <tr>
                    <th>TOTAL SHARES</th>
                    <td>{this.state.totalshares}</td>
                </tr>
                <tr>
                    <th>NEW POSITION VALUE</th>
                    <td><CurrencyFormat value={roundTo(this.state.positionValue,2)} displayType={'text'}
                        thousandSeparator={true} prefix={'$'}/></td>
                </tr>
            </table>
            )} else {
                if (this.state.error2.length > 0) {
                    positionInfoAfter = (
                        <div>Status code: {this.state.statusCode2}: {this.state.error2}</div>
                    )
                }
            }
        if (tickerToSell === undefined) {
            if (this.state.error === undefined) {
                displayResult = (
                    <div>
                        {positionInfoBefore}
                        <div className="top">
                            STOCK '{this.state.ticker}' TO SELL
                        </div>
                        <div className="request">                        
                            <input className="input" id="shares" placeholder="shares"/>
                            <button className="myButton" onClick={(event)=>{
                            this.getSell(document.getElementById('ticker').value, document.getElementById('shares').value)
                            }}
                            >shares to sell</button>
                        </div>
                        {positionInfoAfter}
                    </div>
                )} else {
                    if(this.state.error.length > 0) {
                        displayResult = (
                            <div>Status code: {this.state.statusCode}: {this.state.error}</div>
                        )
                    }
                }
                } else {  
                    displayResult = (
                        <div>
                            <div className="top">
                                STOCK '{tickerToSell}' IN YOUR PORTFOLIO
                            </div>
                            {positionInfoBefore}
                            <div className="top">
                                STOCK '{tickerToSell}' TO SELL
                            </div>
                            <div className="request">                        
                                <input className="input" id="shares" placeholder="shares"/>
                                <button className="myButton" onClick={(event)=>{
                                this.getSell(tickerToSell, document.getElementById('shares').value)
                                }}
                                >shares to sell</button>
                            </div>
                            {positionInfoAfter}
                        </div>
                    )
                }
            return (
                <div className="block">
                    <div className="infobox">
                        {startmessage}
                        {displayResult}
                    </div>
                </div>
            )
        }
        componentDidMount() {
            if(this.props.match.params.ticker !== undefined){
                this.getPositionFor(this.props.match.params.ticker)
            }
        }    
    }   
export default Sell