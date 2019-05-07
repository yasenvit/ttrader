import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import '../Nav.css';
import CurrencyFormat from 'react-currency-format';

class Buy extends Component {    
        state = {
            ticker: null,
            totalshares: null  ,
            shares: null,
            positionCost: null          
        }
        getBuy(inptticker, inptamount) {                                  
            const endpoint = `/api/${window.sessionStorage.getItem('apikey')}/buy`
            const promise = apiCall(endpoint, 'post', {
                'ticker': inptticker,
                'amount': inptamount})
            
                promise.then(blob=>blob.json()).then(json => {
                    this.setState({
                        ticker: json.ticker,
                        totalshares: json.shares,
                        shares: inptamount,
                        positionCost: json.positionCost
                    })
                })
            }                
        render() {
            const roundTo = require('round-to') 
            let priceElement = (<div></div>)
            if (this.state.totalshares !== null) {
                priceElement = (
                    <div>
                        <div style={itemStyle}>
                            You just bought {this.state.shares} shares of '{this.state.ticker}' and
                             now have total {this.state.totalshares} shares 
                             for <CurrencyFormat value={roundTo(this.state.positionCost,2)} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
                        </div>
                    </div>
                )
            }            
        return (
            <div>
                <div>
                    <h3>Enter ticker</h3>
                    <input className="input" id="ticker" placeholder="tickername"/>
                    <input className="input" id="shares" placeholder="shares"/>
                    <button className="myButton" onClick={(event)=>{
                        this.getBuy(document.getElementById('ticker').value, document.getElementById('shares').value)
                    }}
                >buy</button>
                {priceElement}
                </div>                
            </div>
            )
        }
    }
    const itemStyle = {
        backgroundColor: '#f4f4f4',
        padding: '10px',
        borderBottom: '1px #ccc dotted'
        }
export default Buy