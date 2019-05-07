import React, {Component} from 'react';
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
                <h3 className="title">Trades for: </h3>
                <input className="input" id="ticker" placeholder="ticker"/>
                <button className="myButton" onClick = { (event) => {
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