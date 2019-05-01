import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import apiCall from '../util/apiCall';
import '../Nav.css'

class Buy extends Component {
    
        state = {
            ticker: null,
            totalshares: null            
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
                        shares: inptamount
                    })
                })
            }
                
        render() {
            let priceElement = (<div></div>)
            if (this.state.totalshares !== null) {
                priceElement = (
                    <div>
                        <div style={itemStyle}>
                            You just bought {this.state.shares} shares of {this.state.ticker} and now have {this.state.totalshares} left
                        </div>
                    </div>
                )
            }
            
        return (
            <div>
                <div>
                    <h3>Enter ticker</h3>
                    <input id="ticker" placeholder="tickername"/>
                    <input className="pad" id="shares" placeholder="shares"/>
                    <button onClick={(event)=>{
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