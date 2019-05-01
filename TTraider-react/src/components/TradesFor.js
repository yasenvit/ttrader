import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import apiCall from '../util/apiCall';
import TradeItem from '../util/TradeItem';
import '../Nav.css'

class TradesFor extends Component {
    state={
        trades: null,
        inptticker:null
    }
    getTradesFor (inptticker) {
        const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/trades_for/${inptticker}`
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then (json=> {
            
            this.setState({
                trades: json.trades,
                inptticker:inptticker
            })
        } )
    } 
        render() {
            let tradesList = (<div></div>)
            if (this.state.trades !==null) {
                tradesList = (
                    <div>
                        <TradeItem trades={this.state.trades}/>
                    </div>
                )
            }
        return (            
            <div>
                <h3>Trades for: </h3>
                <input className="pad" id="ticker" placeholder="ticker"/>
                <button onClick = { (event) => {
                    this.getTradesFor(document.getElementById('ticker').value)
                }}
                >show</button>
                <div>
                    {tradesList} 
                </div>                               
            </div>
        )
    }
}

export default TradesFor