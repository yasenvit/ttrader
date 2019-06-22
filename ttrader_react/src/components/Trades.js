import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import TradeItem from '../util/TradeItem';
import '../Style.css';

class Trades extends Component {
    state={
        trades: [],
        error: "ERROR"
    }
    getTrades () {
        const endpoint = "/api/" + window.sessionStorage.getItem("apikey") + "/trades"
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then (json=> {
                this.setState({
                trades: json.trades
            })
        })
    } 
        render() {
        let tradesList = (<div></div>)  
        if (this.state.trades.length !== 0) {
            tradesList = (
                <div className="block">
                    <div className="infobox">
                        <div className="top">
                            TRADES HISTORY
                        </div>
                        <table>
                            <tr style={{backgroundColor:"#cac1c1"}}>
                                <th width="15%">Date and time</th>
                                <th width="20%">Ticker</th>
                                <th width="20%">Shares</th>
                                <th width="20%">Price</th>
                                <th width="20%">Transaction cost</th>
                            </tr>
                            <TradeItem trades={this.state.trades}/>
                        </table>
                    </div>
                </div>
                
            )
        }  
        return (
            <div>
                {tradesList}
            </div>
        )
    }
    componentDidMount() {        
        if(this.state.trades.length === 0){
            this.getTrades()
        }
    }
}
export default Trades