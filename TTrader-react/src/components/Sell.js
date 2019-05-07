import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import '../Nav.css';
import CurrencyFormat from 'react-currency-format';

class Sell extends Component {
        state = {
            ticker: null,
            shares: null,            
            totalshares: null,
            positionCost: null            
        }        
        getSell(inptticker, inptamount) {
            const endpoint = `/api/${window.sessionStorage.getItem('apikey')}/sell`
            const promise = apiCall(endpoint, 'post', {
                'ticker': inptticker,
                'amount': inptamount})            
                promise.then(blob=>blob.json()).then(json => {
                    this.setState({
                        ticker: inptticker,
                        shares: inptamount,
                        totalshares: json.shares,
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
                            You have sold {this.state.shares} shares of '{this.state.ticker}' and
                             now have {this.state.totalshares} shares left for <CurrencyFormat 
                             value={roundTo(this.state.positionCost,2)} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
                        </div>
                    </div>
                )
            }       
        return (
            <div>
                <div>
                    <p><h5>Enter ticker</h5></p>
                    <input className="input" id="ticker" placeholder="tickername"/>
                    <input className="input" id="shares" placeholder="shares"/>
                    <button className="myButton" onClick={(event)=>{
                        this.getSell(document.getElementById('ticker').value, document.getElementById('shares').value,)
                    }}
                >sell</button>
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
export default Sell