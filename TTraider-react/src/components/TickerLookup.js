import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import TickerLookupItem from '../util/TickerLookupItem';


class TickerLookup extends Component {
    state = {
        price: null,
        ticker: null,
        change: null
    }
    getPrice(ticker) {
        const endpoint = `/api/price/${ticker}`
        const promise = apiCall(endpoint)
        promise.then(blob=>blob.json()).then (json=> {
            this.setState ({
                price: json.price,
                ticker: json.ticker
            })
        })
    }
    getRecent(ticker) {
        const endpoint = `/api/stock/${ticker}`
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                        change: json.change,
                        stock:json
                  })
              })
    }
    
    render() {
        let showPrice = (<div></div>)
        let recentActivity = (<div></div>)
        
        if (this.state.price !== null) {
            showPrice = (
                <div className="pad">
                    Current price for ticker '{this.state.ticker}' is ${this.state.price} per share
                </div>
            )
            recentActivity = (
                <div>
                    <div>
                        <button className="pad" onClick = {(event)=> {
                            this.getRecent(document.getElementById('ticker').value)
                        }}
                        > show latest activity</button>
                    </div>
                    <div>
                        <TickerLookupItem item={this.state.stock}/>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div>
                    <h3>Current price </h3>
                    <input className="pad" id="ticker" placeholder="ticker"/>
                    <button onClick = {(event)=> {
                        this.getPrice(document.getElementById('ticker').value)
                    }}
                    > show </button>
                </div>
                <div>
                    {showPrice}
                </div>
                <div>
                    {recentActivity}
                </div>                    
            </div>
        )
    }
}

export default TickerLookup