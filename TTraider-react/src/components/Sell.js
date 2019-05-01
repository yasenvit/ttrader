import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import apiCall from '../util/apiCall';
import '../Nav.css';



class Sell extends Component {
    
        state = {
            
            totalshares: null            
        }
        
        getSell(inptticker, inptamount) {                       
            /*const endpoint = '/api/' + window.sessionStorage.getItem('apikey') + '/sell'
            const promise = apiCall(endpoint, 'post', {
                'ticker': inptticker,
                'amount': inptamount})*/
            let newPost= {'ticker': inptticker, 'amount': inptamount}
            const promise = fetch('http://127.0.0.1:5000/api/A3EKSKI9ZCQMRBP/sell', {
                method: 'post',
                mode: "cors",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newPost)
                })
                promise.then(blob=>blob.json()).then(json => {
                    console.log("hello",json)
                    this.setState({
                        ticker: inptticker,
                        shares: inptamount,
                        totalshares: json.shares
                        
                    })
                })
            }
                
        render() {
            let priceElement = (<div></div>)
            if (this.state.totalshares !== null) {
                priceElement = (
                    <div>
                        <div style={itemStyle}>
                            You have sold {this.state.shares} shares of {this.state.ticker} and now have {this.state.totalshares} left
                            
                        </div>
                    </div>
                )
            }       
        return (
            <div>
                <div>
                    <p><h5>Enter ticker</h5></p>
                    <input id="ticker" placeholder="tickername"/>
                    <input className="pad" id="shares" placeholder="shares"/>
                    <button onClick={(event)=>{
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